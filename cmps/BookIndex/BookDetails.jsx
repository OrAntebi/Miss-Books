export function BookDetails({ book, onGoBack }) {
    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice,
        publishedDate,
        pageCount,
    } = book;

    const formattedPrice = listPrice.amount.toLocaleString('en-US', { style: 'currency', currency: listPrice.currencyCode });

    function getBookLng(lng) {
        const languageMap = {
            'he': 'Hebrew',
            'sp': 'Spanish',
        };
    
        return languageMap[lng] || 'English';
    }
    

    return (
        <section className="book-details-container flex">
                <img src={thumbnail} alt="book thumbnail" />

                <section className="book-info flex flex-column justify-between">
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                    <p><strong>Authors:</strong> {authors.join(', ')}</p>
                    <p><strong>Language:</strong> {getBookLng(language)}</p>
                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                    <p><strong>Published:</strong> {publishedDate}</p>
                    <p><strong>Page Count:</strong> {pageCount}</p>
                    <h3>Description</h3>
                    <p>{description}</p>
                    <h3>Price: {formattedPrice}</h3>
                    {listPrice.isOnSale && <p className="sale">On Sale!</p>}
                    <button onClick={onGoBack} className="btn back-btn">Go Back</button>
                </section>
        </section>
    );
}
