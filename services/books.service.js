import { storageService } from './async-storage.service.js'
import { booksData } from './data/books.js'

export const bookService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter
}

const KEY = 'booksDB'


function query(filterBy) {
    return storageService.query(KEY, 1000)
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
    return storageService.get(KEY, bookId)
        .then(_setPrevNextBookId)
}

function remove(bookId) {
    return storageService.remove(KEY, bookId)
}

function save(book) {
    return book.id ? _updateBook(book) : _addBook(book)
}

function getDefaultFilter() {
    return { title: '', price: 0 }
}

function _updateBook(book) {
    return storageService.put(KEY, book)
}

function _addBook(book) {
    return storageService.post(KEY, book)
}

function _saveBooksToStorage() {
    storageService.save(KEY, booksData)
}

function _setPrevNextBookId(book) {
    return storageService.query(KEY, 0)
        .then(books => {
            const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
            const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
            const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
            book.prevBookId = prevBook.id
            book.nextBookId = nextBook.id
            return book
        })
}

