const { useRef } = React

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {

    let imgNumber = useRef(1)

    function onSelectBook(bookId) {

    }

    function onRemoveBook(bookId) {

    }
    console.log(imgNumber)
    return (
        <React.Fragment>
            {books.map(book => {
                return (
                    <article className='book-container flex flex-column align-center justify-center' key={book.id}>
                        <BookPreview book={book} imgNumber={imgNumber.current++}/>
                        <section className="book-actions flex justify-between">
                            <button className="btn select-btn" onClick={() => onSelectBook(book.id)}>Select</button>
                            <button className="btn delete-btn" onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </article>
                )
            })}
        </React.Fragment>
    )
}