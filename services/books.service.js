import { storageService } from './async-storage.service.js'
import { utilService } from './util-service.js'
import gBooks from '../assets/json/books.json'

export const booksService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter
}

const KEY = 'booksDB'


function query() {
    return storageService.query(KEY)
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

function _createBook() {
    return {
        id: utilService.makeId(),
        title: "metus hendrerit",
        subtitle: utilService.makeLorem(15),
        authors: ["Oren Yaniv"],
        publishedDate: utilService.getRandomInt(1700, 2022),
        description: utilService.makeLorem(50),
        pageCount: utilService.getRandomInt(1, 700),
        categories: [
            "Computers",
            "Hack"
        ],
        thumbnail: "http://coding-academy.org/books-photos/20.jpg",
        language: "en",
        listPrice: {
            amount: utilService.getRandomInt(10, 30),
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

function _saveBooksToStorage() {
    storageService.save(KEY, gBooks)
}

