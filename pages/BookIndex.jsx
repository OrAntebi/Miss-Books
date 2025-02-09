const { useEffect, useState, useRef } = React

import { bookService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookIndex/BookFilter.jsx';
import { BookList } from '../cmps/BookIndex/BookList.jsx';
import { BookDetails } from '../cmps/BookIndex/BookDetails.jsx'


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }


    function onSelectBook(bookId) {
        const book = books.find(book => book.id === bookId)
        setSelectedBook(book)
    }

    function onDeleteBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks =>
                prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!books) return (
        <React.Fragment>
            <div className="book">
                <div className="book__pg-shadow"></div>
                <div className="book__pg"></div>
                <div className="book__pg book__pg--2"></div>
                <div className="book__pg book__pg--3"></div>
                <div className="book__pg book__pg--4"></div>
                <div className="book__pg book__pg--5"></div>
            </div>
            <div className="loader"></div>
        </React.Fragment>
    )

    return (
        <section className="book-index-page">

            {!selectedBook && (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    <section className="book-list flex justify-center">
                        {books.length ? (
                            <BookList books={books} onSelectBook={onSelectBook} onDeleteBook={onDeleteBook} />
                        ) : (
                            <h2 className="no-books-found">No books found..</h2>
                        )}
                    </section>
                </React.Fragment>
            )}

            {selectedBook && (
                <BookDetails book={selectedBook} onGoBack={() => setSelectedBook(null)} />
            )}

        </section>

    )
}