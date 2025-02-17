const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onDeleteBook }) {
    let imgNumber = 1

    return (
        <React.Fragment>
            {books.map(book => {
                return (
                    <article className='book-container flex flex-column align-center justify-center' key={book.id}>
                        <BookPreview book={book} imgNumber={imgNumber++} />
                        <section className="book-actions flex justify-between">
                            <Link to={`/books/${book.id}`} className="btn select-btn" book={book}>Details</Link>
                            <Link to={`/books/edit/${book.id}`} className="btn edit-btn" book={book}>Edit</Link>
                            <button className="btn delete-btn" onClick={() => onDeleteBook(book.id)}>Delete</button>
                        </section>
                    </article>
                )
            })}
        </React.Fragment>
    )
}