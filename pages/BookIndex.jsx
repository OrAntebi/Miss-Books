const { useEffect, useState } = React

import { bookService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookIndex/BookFilter.jsx';
import { BookList } from '../cmps/BookIndex/BookList.jsx';


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

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index-page">
            <section className="books-filters-container">
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            </section>

            <section className="book-list flex justify-between">
                {books.length && <BookList books={books} onDeleteBook={onDeleteBook} />}
            </section>
        </section>
    )
}