import { Logo } from './Logo.jsx'
import { Navigation } from './Navigation.jsx'

export function Header({ onSetPage }) {
    return (
        <React.Fragment>
            <Logo onSetPage={onSetPage}/>
            <Navigation onSetPage={onSetPage}/>
        </React.Fragment>
    )
}