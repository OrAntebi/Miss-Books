
const { Link, useNavigate } = ReactRouterDOM

export function BookEdit() {

    const navigate = useNavigate()

    function onToggleBookAdd() {
        navigate('/books/book-edit')
    }

    return (
        <section className="book-edit-container">
            <span
                className="btn book-edit-btn fa-solid hidden"
                onClick={onToggleBookAdd}>
            </span>
            <Link to="/books/book-edit" className="btn book-edit-btn">Add Book</Link>
        </section>
    )
}