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
    return storageService.query(KEY)
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

