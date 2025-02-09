
export function BookPreview({ book }) {
    const { title, listPrice: { amount, currencyCode } } = book

    return (
        <section className="book-preview flex flex-column align-center justify-center">
            <h2>{title}</h2>
            <img src={book.thumbnail} alt="book thumbnail" />
            <p>{amount.toLocaleString("en-US", { style: "currency", currency: `${currencyCode}` })}</p>
        </section>
    )
}