
export function BookPreview({ book }) {
    return (
        <section className="book-preview">
            <h2>{book.title}</h2>
            <img src={book.thumbnail} alt="book thumbnail" />
        </section>
    )
}