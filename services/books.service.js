import { storageService } from './async-storage.service.js'
import { booksData } from './data/books.js'

export const bookService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    addReview,
}

const BOOK_KEY = 'booksDB'

function query(filterBy) {
    return storageService.query(BOOK_KEY, 1000)
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

            return books
        })
        .catch(error => console.log(error))
}

function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setPrevNextBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    return book.id ? _updateBook(book) : _addBook(book)
}

function getDefaultFilter() {
    return { title: '', price: 0 }
}

function addReview(bookId, review) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            if (!book) throw new Error('Book not found!')

            if (!book.reviews) book.reviews = []

            book.reviews.push(review)
            return storageService.put(BOOK_KEY, book)
        })
        .then(_setPrevNextBookId)
}

function _setPrevNextBookId(book) {
    return storageService.query(BOOK_KEY)
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
    return storageService.put(BOOK_KEY, book)
}

function _addBook(book) {
    return storageService.post(BOOK_KEY, book)
        .then(() => {
            _setPrevNextBookId
        })
}

function _saveBooksToStorage() {
    storageService.save(BOOK_KEY, booksData)
}

