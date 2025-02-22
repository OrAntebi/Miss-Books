const { useEffect, useState } = React
const { useSearchParams, Link } = ReactRouterDOM

import { bookService } from '../services/books.service.js'
import { Loader } from '../cmps/Util-Cmps/Loader.jsx'
import { BookFilter } from '../cmps/BookIndex/BookFilter.jsx';
import { BookList } from '../cmps/BookIndex/BookList.jsx';
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setSearchParams(filterBy)
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
            .then(() => showSuccessMsg('Book has successfully deleted!'))
            .catch(() => showErrorMsg(`Couldn't delete book`))
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    if (!books) return <Loader />
    return (
        <section className="book-index-page full">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <div className="book-add-container">
                <button className="btn book-edit-btn fa-solid hidden" onClick={toggleMenu}></button>
                <button className="btn book-edit-btn" onClick={toggleMenu}>Add Book</button>

                {isMenuOpen && (
                    <div className="add-book-menu">
                        <Link to="/books/add">Add manually</Link>
                        <Link to="/books/add-from-google">Add from Google</Link>
                    </div>
                )}
            </div>

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