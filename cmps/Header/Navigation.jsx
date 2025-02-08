export function Navigation({ onSetPage }) {
    return (
        <nav className="navigation">
            <ul className="flex clean-list">
                <li className="flex"><a className="flex align-center justify-center" href="#" onClick={() => onSetPage('home')}>Home</a></li>
                <li className="flex"><a className="flex align-center justify-center" href="#" onClick={() => onSetPage('about')}>About</a></li>
                <li className="flex"><a className="flex align-center justify-center" href="#" onClick={() => onSetPage('books')}>Books</a></li>
            </ul>
        </nav>
    )
}