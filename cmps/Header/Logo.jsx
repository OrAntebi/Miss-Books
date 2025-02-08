export function Logo({ onSetPage }) {
    return (
        <section className="logo">
            <h1 onClick={() =>  onSetPage('home')}>Miss Books</h1>
        </section>
    )
}