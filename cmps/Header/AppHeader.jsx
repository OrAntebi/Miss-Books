const { Link } = ReactRouterDOM

import { Logo } from './Logo.jsx'
import { Navigation } from './Navigation.jsx'

export function AppHeader() {
    return (
        <header className="app-header flex justify-between align-center">
            <Link to='/'>
                <Logo />
            </Link>

            <Navigation />
        </header>
    )
}