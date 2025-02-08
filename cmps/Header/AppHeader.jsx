import { Logo } from './Logo.jsx'
import { Navigation } from './Navigation.jsx'

export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header flex justify-between align-center">
            <Logo onSetPage={onSetPage} />
            <Navigation onSetPage={onSetPage} />
        </header>
    )
}