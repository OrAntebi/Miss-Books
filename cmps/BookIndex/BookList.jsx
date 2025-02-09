
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onDeleteBook }) {

    let imgNumber = 1

    function onSelectBook(bookId) {

    }

    return (
        <React.Fragment>
            {books.map(book => {
                return (
                    <article className='book-container flex flex-column align-center justify-center' key={book.id}>
                        <BookPreview book={book} imgNumber={imgNumber++} />
                        <section className="book-actions flex justify-between">
                            <button className="btn select-btn" onClick={() => onSelectBook(book.id)}>Select</button>
                            <button className="btn delete-btn" onClick={() => onDeleteBook(book.id)}>Delete</button>
                        </section>
                    </article>
                )
            })}
        </React.Fragment>
    )
}