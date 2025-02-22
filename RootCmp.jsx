const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/Header/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/Util-Cmps/UserMsg.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"


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
                        <Route path='/books/add' element={<BookEdit />} />
                        <Route path='/books/add-from-google' element={<BookAdd />} />
                        <Route path='/books/edit/:bookId' element={<BookEdit />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}