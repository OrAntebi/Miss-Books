
export function BookPreview({ book, imgNumber }) {
    const { title, listPrice: { amount, currencyCode } } = book

    return (
        <section className="book-preview flex flex-column align-center justify-center">
            <h2>{title}</h2>
            <img src={`./assets/img/${imgNumber}.jpg`} alt="book thumbnail" />
            <p>{amount.toLocaleString("en-US", { style: "currency", currency: `${currencyCode}` })}</p>
        </section>
    )
}