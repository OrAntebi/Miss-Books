import { bookService } from "../services/books.service.js"
import { BookAddList } from "../cmps/BookAdd/BookAddList.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util-service.js"

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouter

export function BookAdd() {
    const [search, setSearch] = useState('')
    const [googleBookList, setGoogleBooksList] = useState([])
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const searchBooksDebounce = useRef(utilService.debounce(searchBooks, 1500))

    useEffect(() => {
        if (search) {
            setLoader(true)
            searchBooksDebounce.current(search)
        } else {
            setGoogleBooksList([])
        }
    }, [search])

    function handleSearch({ target }) {
        setSearch(target.value)
    }

    function searchBooks(search) {
        bookService.getGoogleBooks(search)
            .then(books => setGoogleBooksList(books))
            .finally(() => setLoader(false))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()

        searchBooks(search)
    }

    function onSave(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/books'))
    }

    return (
        <div className='book-search flex flex-column'>
            <h1>Add Book from Google</h1>
            <div className='add-book-container'>
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="add-book" className='label bold-txt'>Google Search: </label>
                    <input value={search} onChange={handleSearch} type="text" name='title' placeholder='Insert book name' id="add-book" className="input"/>
                </form>
            </div>
            {googleBookList && <BookAddList booksList={googleBookList} onSave={onSave} />}
            {loader && <h3>Loading Books...</h3>}
        </div>
    )
}