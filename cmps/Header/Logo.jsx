export function Logo({ onSetPage }) {
    return (
        <article className="logo" onClick={() => onSetPage('home')}>
            Miss Books
        </article>
    )
}