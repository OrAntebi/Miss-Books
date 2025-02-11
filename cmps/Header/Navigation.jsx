const { NavLink } = ReactRouterDOM

export function Navigation() {
    return (
        <nav className="navigation">
            <ul className="flex clean-list">
                <li className="flex">
                    <NavLink to='/' className="flex align-center justify-center">Home</NavLink>
                </li>

                <li className="flex">
                    <NavLink to='/about' className="flex align-center justify-center">About</NavLink>
                </li>

                <li className="flex">
                    <NavLink to='/books' className="flex align-center justify-center">Books</NavLink>
                </li>
            </ul>
        </nav>
    )
}