const { useState } = React
const { NavLink } = ReactRouterDOM

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function onToggleMenu() {
        if (window.innerWidth <= 800) {
            setIsMenuOpen(!isMenuOpen);
        }
    }

    return (
        <React.Fragment>
            <span
                className="main-menu fa-solid hidden"
                onClick={onToggleMenu}>
            </span>

            {isMenuOpen && <div className="overlay" onClick={onToggleMenu}></div>}

            <nav className={`main-nav ${isMenuOpen ? 'openedMenu' : ''}`}>
                <ul className="main-menu-list flex clean-list">
                    <li className="flex" onClick={onToggleMenu}>
                        <NavLink to='/' className="item flex align-center justify-center">Home</NavLink>
                    </li>
                    <li className="flex" onClick={onToggleMenu}>
                        <NavLink to='/about' className="item flex align-center justify-center">About</NavLink>
                    </li>
                    <li className="flex" onClick={onToggleMenu}>
                        <NavLink to='/books' className="item flex align-center justify-center">Books</NavLink>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
