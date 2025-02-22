const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

import { bookService } from "../services/books.service.js"
import { Loader } from "../cmps/Util-Cmps/Loader.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [loading, setLoading] = useState(true)

    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!bookId) return setLoading(false)

        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(book => {
                setBookToEdit(book)
                setLoading(false)
            })
            .catch(() => {
                showErrorMsg("Couldn't load the book")
                setLoading(false)
            })
    }

    function onSave(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`Couldn't save book`))
            .finally(() => navigate('/books'))
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                if (target.selectedOptions) {
                    value = target.value
                }
                break
        }

        setBookToEdit(prevBook => ({ ...prevBook, [prop]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [prop]: value },
        }))
    }

    const { title, authors, listPrice, description, pageCount, language, categories } = bookToEdit

    if (loading) return <Loader />
    return (
        <section className="book-edit-container flex flex-column">
            <h2>{bookId ? 'Edit Book' : 'Add Book'}</h2>

            <form className="book-edit-form flex flex-column" onSubmit={onSave}>
                <label className="label" htmlFor="title">Title: </label>
                <input onChange={handleChange} value={title} id="title" type="text" name="title" className="input" required />

                <label className="label" htmlFor="authors">Authors: </label>
                <input onChange={handleChange} value={authors} id="authors" type="text" name="authors" className="input" required />

                <label className="label" htmlFor="description">Description: </label>
                <textarea onChange={handleChange} value={description} id="description" type="text" name="description" className="input" required />

                <label className="label" htmlFor="categories">Categories: </label>
                <input onChange={handleChange} value={categories} id="categories" type="text" name="categories" className="input" />

                <label className="label" htmlFor="language">Language: </label>
                <select onChange={handleChange} value={language} id="language" name="language" className="input" required >
                    <option value="en">English</option>
                    <option value="he">Hebrew</option>
                    <option value="sp">Spanish</option>
                </select>

                <label className="label" htmlFor="pages">Number of pages: </label>
                <input onChange={handleChange} value={pageCount} id="pages" type="number" name="pageCount" className="input" required />

                <label className="label" htmlFor="price">Price: </label>
                <input onChange={handleChangeListPrice} value={listPrice.amount} id="price" type="number" name="amount" className="input" required />

                <label className="label" htmlFor="currencyCode">Currency: </label>
                <select onChange={handleChangeListPrice} value={listPrice.currencyCode} id="currencyCode" name="currencyCode" className="input">
                    <option value="USD">USD</option>
                    <option value="ILS">ILS</option>
                    <option value="EUR">EUR</option>
                </select>

                <label className="label flex align-center justify-between" htmlFor="isOnSale">
                    On Sale:
                    <input onChange={handleChangeListPrice} checked={listPrice.isOnSale} id="isOnSale" type="checkbox" name="isOnSale" className="input" />
                </label>

                <section className="book-actions-container flex align-center">
                    <Link to="/books" className="btn back-btn">Go Back</Link>
                    <button className="btn" type="submit">{bookId ? 'Save Book' : 'Add Book'}</button>
                </section>
            </form>
        </section>
    )
}
