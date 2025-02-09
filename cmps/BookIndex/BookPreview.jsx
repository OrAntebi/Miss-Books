
export function BookPreview({ book, imgNumber }) {
    return (
        <section className="book-preview flex flex-column align-center justify-center">
            <h2>{book.title}</h2>
            <img src={`./assets/img/${imgNumber}.jpg`} alt="book thumbnail" />
        </section>
    )
}