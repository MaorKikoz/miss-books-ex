const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function RootCmp() {
    const [page, setPage] = useState('Home')

    return <section className="app main-layout">
        <AppHeader page={page} onSetPage={setPage} />
        
        <main>
            {page === 'Home' && <Home />}
            {page === 'About' && <About />}
            {page === 'Books' && <BookIndex />}
        </main>
    </section>
}