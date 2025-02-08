import { Logo } from './cmps/Header/Logo.jsx'
import { Navigation } from './cmps/Header/Navigation.jsx'

import { HomePage } from "./pages/HomePage.jsx"
import { AboutUsPage } from "./pages/AboutUsPage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const { useState } = React

export function App() {

    const [page, setPage] = useState('home')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app">

            <header className="app-header main-layout">
                <Logo onSetPage={onSetPage} />
                <Navigation onSetPage={onSetPage} />
            </header>

            <main className="main-layout">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUsPage />}
                {page === 'books' && <BookIndex />}
            </main>

        </section>
    )
}