const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/Header/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEditForm } from "./cmps/BookEdit/BookEditForm.jsx"
import { UserMsg } from "./cmps/Util-Cmps/UserMsg.jsx"


export function App() {

    return (
        <Router>
            <section className="app main-layout">

                <section className="header-container main-layout full">
                    <AppHeader />
                </section>

                <main className="main-content">
                    <Routes >
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/books' element={<BookIndex />} />
                        <Route path='/books/:bookId' element={<BookDetails />} />
                        <Route path='/books/add' element={<BookEditForm />} />
                        <Route path='/books/edit/:bookId' element={<BookEditForm />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}