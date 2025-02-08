import { bookService } from '../services/books.service.js'
import { BookFilter } from '../cmps/BookIndex/BookFilter.jsx';
import { BookList } from '../cmps/BookIndex/BookList.jsx';

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => {
                setBooks(books)
            })
    }
    
    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <h1>Book Index</h1>

            <section className="book-filter">
                <BookFilter />
            </section>

            <section className="book-list">
                {books.length && <BookList books={books} />}
            </section>
        </section>
    )
}