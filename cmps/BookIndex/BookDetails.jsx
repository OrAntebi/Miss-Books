const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React
import { bookService } from "../../services/books.service.js"
import { Loader } from '../Util-Cmps/Loader.jsx'
import { LongText } from "../Util-Cmps/LongText.jsx"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        getBookData()
    }, [bookId])

    function getBookData() {
        bookService.getById(bookId)
            .then(book => setBook(book))
    }

    if (!book) return <Loader />

    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice,
        prevBookId,
        nextBookId
    } = book

    const { formattedPrice, priceClass } = getPriceDetails(book)

    function getBookLng(lng) {
        const languageMap = {
            'he': 'Hebrew',
            'sp': 'Spanish',
        }

        return languageMap[lng] || 'English'
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage'
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
        })

        let priceClass = ''
        if (book.listPrice.amount > 150) priceClass = 'red'
        else if (book.listPrice.amount < 20) priceClass = 'green'

        return { formattedPrice, priceClass }
    }

    return (
        <section className="book-details-container flex">

            <div className={'book-thumbnil-container ' + (listPrice.isOnSale ? 'on-sale' : '')}>
                <img src={thumbnail} alt="book thumbnail" />
            </div>


            <div className="flex flex-column justify-between">
                <section className="book-info flex flex-column justify-between">
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>

                    <p><strong>Authors:</strong> {authors.join(', ')}</p>
                    <p><strong>Language:</strong> {getBookLng(language)}</p>
                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                    <p><strong>Published:</strong> {getPublishDate()}</p>
                    <p><strong>Page Count:</strong> {getPageCount()}</p>

                    <h3>Description</h3>
                    <LongText text={description} />

                    <h3>Price: <span className={priceClass}>{formattedPrice}</span></h3>
                </section>

                <section className="book-actions-container flex justify-between">
                    <Link to={`/books/${prevBookId}`} className="btn prev-btn">Previous Book</Link>
                    <Link to='/books' className="btn back-btn">Go Back</Link>
                    <Link to={`/books/${nextBookId}`} className="btn next-btn">Next Book</Link>
                </section>
            </div>
        </section>
    )
}
