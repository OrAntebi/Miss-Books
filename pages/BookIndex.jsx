const { useEffect, useState } = React

import { bookService } from '../services/books.service.js'
import { Loader } from '../cmps/Util-Cmps/Loader.jsx'
import { BookFilter } from '../cmps/BookIndex/BookFilter.jsx';
import { BookList } from '../cmps/BookIndex/BookList.jsx';
import { BookEdit } from '../cmps/BookIndex/BookEdit.jsx';


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }


    function onDeleteBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks =>
                prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!books) return <Loader />
    return (
        <section className="book-index-page full">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <BookEdit />
            <section className="book-list flex justify-center">
                {books.length ? (
                    <BookList books={books} onDeleteBook={onDeleteBook} />
                ) : (
                    <h2 className="no-books-found">No books found..</h2>
                )}
            </section>
        </section>

    )
}