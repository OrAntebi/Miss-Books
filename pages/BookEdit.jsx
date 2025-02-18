
const { Link, useNavigate } = ReactRouterDOM

export function BookEdit() {

    const navigate = useNavigate()

    function onToggleBookAdd() {
        navigate('/books/add')
    }

    return (
        <section className="book-edit-container">
            <span
                className="btn book-edit-btn fa-solid hidden"
                onClick={onToggleBookAdd}>
            </span>
            <Link to="/books/add" className="btn book-edit-btn">Add Book</Link>
        </section>
    )
}