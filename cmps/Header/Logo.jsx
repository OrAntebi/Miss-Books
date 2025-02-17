export function Logo({ onToggleMenu, isMenuOpen }) {
    return (
        <article className="logo" onClick={isMenuOpen ? onToggleMenu : undefined}>
            Miss Books
        </article>
    )
}