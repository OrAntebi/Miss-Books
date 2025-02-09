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


    function getBookLng(lng) {
        const languageMap = {
            'he': 'Hebrew',
            'sp': 'Spanish',
        };
    
        return languageMap[lng] || 'English';
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage';
        else if (diff < 3) publishedYear += ' - NEW!'
        return publishedYear
    }

    function getPageCount() {
        let pageCount = book.pageCount
        
        if (book.pageCount > 500) pageCount += ' - Long reading'
        else if (book.pageCount > 200) pageCount += ' - Decent reading'
        else if (book.pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPriceDetails(book) {
        const formattedPrice = book.listPrice.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: book.listPrice.currencyCode,
        });
    
        let priceClass = '';
        if (book.listPrice.amount > 150) priceClass = 'red';
        else if (book.listPrice.amount < 20) priceClass = 'green';
    
        return { formattedPrice, priceClass };
    }
    
    const { formattedPrice, priceClass } = getPriceDetails(book)

    return (
        <section className="book-details-container flex">
                <img src={thumbnail} alt="book thumbnail" />

                <section className="book-info flex flex-column justify-between">
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                    <p><strong>Authors:</strong> {authors.join(', ')}</p>
                    <p><strong>Language:</strong> {getBookLng(language)}</p>
                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                    <p><strong>Published:</strong> {getPublishDate()}</p>
                    <p><strong>Page Count:</strong> {getPageCount()}</p>
                    <h3>Description</h3>
                    <p>{description}</p>
                    <h3>Price: <span className={priceClass}>{formattedPrice}</span></h3>
                    {listPrice.isOnSale && <p className="sale">On Sale!</p>}
                    <button onClick={onGoBack} className="btn back-btn">Go Back</button>
                </section>
        </section>
    );
}
