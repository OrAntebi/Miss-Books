const { Link } = ReactRouterDOM
const { useState } = React

import { Logo } from './Logo.jsx'
import { Navigation } from './Navigation.jsx'

export function AppHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function onToggleMenu() {
        if (window.innerWidth <= 800) {
            setIsMenuOpen(!isMenuOpen);
        }
    }

    return (
        <header className="app-header flex justify-between align-center">
            <Link to='/'>
                <Logo onToggleMenu={onToggleMenu} isMenuOpen={ isMenuOpen }/>
            </Link>

            <Navigation onToggleMenu={onToggleMenu} isMenuOpen={ isMenuOpen }/>
        </header>
    )
}