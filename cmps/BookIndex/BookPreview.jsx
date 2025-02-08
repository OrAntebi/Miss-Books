
export function BookPreview({ book }) {
    return (
        <section className="book-preview flex flex-column align-center justify-center">
            <h2>{book.title}</h2>
            <img src={book.thumbnail} alt="book thumbnail" />
        </section>
    )
}