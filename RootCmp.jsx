import { AppHeader } from "./cmps/Header/AppHeader.jsx"

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
        <section className="app main-layout">

            <section className="header-container main-layout full">
                <AppHeader onSetPage={onSetPage} />
            </section>

            <main className="main-content">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUsPage />}
                {page === 'books' && <BookIndex />}
            </main>

        </section>
    )
}