
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
                    <article className='book-container' key={book.id}>
                        <BookPreview book={book} />

                        <button onClick={() => onSelectBook(book.id)}>Select</button>
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                    </article>
                )
            })}
        </React.Fragment>
    )
}