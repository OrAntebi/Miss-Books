export function Navigation({ onSetPage }) {
    return (
        <nav className="main-nav">
            <ul>
                <li><a href="#" onClick={() => onSetPage('home')}>Home</a></li>
                <li><a href="#" onClick={() => onSetPage('about')}>About</a></li>
                <li><a href="#" onClick={() => onSetPage('books')}>Books</a></li>
            </ul>
        </nav>
    )
}