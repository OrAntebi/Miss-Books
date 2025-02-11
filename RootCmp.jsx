const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/Header/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./cmps/BookIndex/BookDetails.jsx"


export function App() {

    return (
        <Router>
            <section className="app main-layout">

                <section className="header-container main-layout full">
                    <AppHeader />
                </section>

                <main className="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/books' element={<BookIndex />} />
                        <Route path='/books/:bookId' element={<BookDetails />} />
                    </Routes>
                </main>

            </section>
        </Router>
    )
}