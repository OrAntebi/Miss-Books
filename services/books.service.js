import { asyncService } from './async-storage.service.js'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
import { booksData } from './data/books.js'

const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = storageService.loadFromStorage(CACHE_STORAGE_KEY) || {}

export const bookService = {
    query,
    getById,
    remove,
    save,
    addReview,
    getEmptyBook,
    getFilterFromSearchParams,
    getGoogleBooks,
    addGoogleBook,
}

const BOOK_KEY = 'booksDB'

function query(filterBy) {
    return asyncService.query(BOOK_KEY)
        .then(books => {
            if (!books || !books.length) {
                books = booksData
                _saveBooksToStorage()
            }
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(b => regExp.test(b.title))
            }
            if (filterBy.price) {
                books = books.filter(b => b.listPrice.amount <= filterBy.price)
            }
            if (filterBy.pageCount) {
                books = books.filter(b => b.pageCount <= filterBy.pageCount)
            }
            if (filterBy.published) {
                books = books.filter(b => b.publishedDate >= filterBy.published)
            }

            return books
        })
        .catch(error => console.error(error))
}

function getById(bookId) {
    return asyncService.get(BOOK_KEY, bookId)
        .then(_setPrevNextBookId)
}

function remove(bookId) {
    return asyncService.remove(BOOK_KEY, bookId)
}

function save(book) {
    return book.id ? _updateBook(book) : _addBook(book)
}

function getFilterFromSearchParams(searchParams) {
    const title = searchParams.get('title') || ''
    const price = searchParams.get('price') || ''
    const pageCount = searchParams.get('pageCount') || ''
    const published = searchParams.get('published') || ''

    return { title, price, pageCount, published }
}

function getEmptyBook(title = '', amount = '', description = '', pageCount = '', language = 'en', authors = '', categories = '', publishedDate = '', isOnSale = false) {
    return {
        title,
        subtitle: utilService.generateRandomText(6),
        authors: authors ? [authors] : [utilService.makeLorem(2)],
        publishedDate: publishedDate || utilService.getRandomYear(1980, 2025),
        description: description || utilService.generateRandomText(utilService.getRandomInt(50, 250)),
        pageCount: pageCount || utilService.getRandomInt(80, 1000),
        categories: categories || [utilService.getRandomValue(['General', 'Hack', 'Computers'])],
        thumbnail: './assets/img/' + utilService.getRandomInt(1, 20) + '.jpg',
        language: language || 'en',
        listPrice: {
            amount,
            currencyCode: utilService.getRandomValue(['USD', 'ILS', 'EUR']),
            isOnSale: isOnSale
        }
    }
}

function addReview(bookId, review) {
    return asyncService.get(BOOK_KEY, bookId)
        .then(book => {
            if (!book) throw new Error('Book not found!')

            if (!book.reviews) book.reviews = []

            book.reviews.push(review)
            return asyncService.put(BOOK_KEY, book)
        })
        .then(_setPrevNextBookId)
}

function addGoogleBook(book) {
    return asyncService.post(BOOK_KEY, book, false)
}


function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
        .then(res => {
            const data = res.data.items
            console.log('data from network...', data)
            const books = _formatGoogleBooks(data)
            gCache[bookName] = books
            storageService.saveToStorage(CACHE_STORAGE_KEY, gCache)
            return books
        })
}

function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description || utilService.generateRandomText(),
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories || [utilService.getRandomValue(['General', 'Hack', 'Computers'])],
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomInt(80, 700),
                currencyCode: utilService.getRandomValue(['USD', 'ILS', 'EUR']),
                isOnSale: Math.random() > 0.7
            }
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}

function _setPrevNextBookId(book) {
    return asyncService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
            const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
            const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
            book.prevBookId = prevBook.id
            book.nextBookId = nextBook.id
            return book
        })
}

function _updateBook(book) {
    return asyncService.put(BOOK_KEY, book)
}

function _addBook(book) {
    return asyncService.post(BOOK_KEY, book)
        .then((savedBook) => {
            return _setPrevNextBookId(savedBook)
        })
}


function _saveBooksToStorage() {
    asyncService.save(BOOK_KEY, booksData)
}

