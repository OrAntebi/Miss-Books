const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

import { utilService } from "../../services/util-service.js"
import { bookService } from "../../services/books.service.js"

export function BookEditForm() {

    const [book, setBook] = useState({
        title: '',
        subtitle: utilService.generateRandomText(6),
        authors: utilService.makeLorem(2),
        publishedDate: utilService.getRandomYear(1980, 2025),
        description: utilService.generateRandomText(utilService.getRandomInt(50, 250)),
        pageCount: utilService.getRandomInt(80, 1000),
        categories: utilService.getRandomValue(['General', 'Hack', 'Computers']),
        language: utilService.getRandomValue(['en', 'sp']),
        amount: utilService.getRandomInt(30, 600),
        currencyCode: utilService.getRandomValue(['USD', 'ILS', 'EUR']),
        isOnSale: false,
    })
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value, type, checked } }) => {
        setBook(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const form = ev.target
        if (!form.checkValidity()) return

        let bookToSave = {
            title: book.title,
            subtitle: book.subtitle,
            authors: [book.authors],
            publishedDate: book.publishedDate,
            description: book.description,
            pageCount: book.pageCount,
            categories: [book.categories],
            thumbnail: `./assets/img/${utilService.getRandomInt(1, 20)}.jpg`,
            language: book.language,
            listPrice: {
                amount: Number(book.amount),
                currencyCode: book.currencyCode,
                isOnSale: book.isOnSale,
            }
        }
        bookService.save(bookToSave)
            .then(() => {
                navigate('/books')
            })
    }

    const formatLabel = (label) => {
        return label
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
    }

    return (
        <section className="book-edit-container flex flex-column">
            <h2>Add New Book</h2>
            <form className="book-edit-form" onSubmit={handleSubmit}>
                {['title', 'subtitle', 'authors', 'categories'].map(name => (
                    <label key={name} className="label">
                        {formatLabel(name)}
                        <input className="input" name={name} placeholder={name} value={book[name]} onChange={handleChange} required />
                    </label>
                ))}

                <label key="language" className="label">
                    Language
                    <select className="input" name="language" value={book.language} onChange={handleChange}>
                        <option value="en">English</option>
                        <option value="he">Hebrew</option>
                        <option value="sp">Spanish</option>
                    </select>
                </label>

                {['publishedDate', 'pageCount', 'amount'].map(name => (
                    <label key={name} className="label">
                        {formatLabel(name)}
                        <input className="input" name={name} type="number" value={book[name]} onChange={handleChange} required />
                    </label>
                ))}

                <label key="currencyCode" className="label">
                    Currency
                    <select className="input" name="currencyCode" value={book.currencyCode} onChange={handleChange}>
                        <option value="USD">USD</option>
                        <option value="ILS">ILS</option>
                        <option value="EUR">EUR</option>
                    </select>
                </label>

                <label className="label flex align-center justify-between">
                    On Sale?
                    <input className="input" type="checkbox" name="isOnSale" checked={book.isOnSale} onChange={handleChange} />
                </label>
                <section className="book-actions-container flex align-center">
                    <Link to='/books' className="btn back-btn">Go Back</Link>
                    <button className="btn" type="submit">Add Book</button>
                </section>
            </form>
        </section>
    )
}
