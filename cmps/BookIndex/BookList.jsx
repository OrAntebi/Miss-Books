
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {


    function onSelectBook(bookId) {

    }

    function onRemoveBook(bookId) {

    }

    return (
        <React.Fragment>
            {books.map(book => {
                return (
                    <article className='book-container flex flex-column align-center justify-center' key={book.id}>
                        <BookPreview book={book} />
                        <section className="book-actions flex justify-between">
                            <button onClick={() => onSelectBook(book.id)}>Select</button>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </article>
                )
            })}
        </React.Fragment>
    )
}