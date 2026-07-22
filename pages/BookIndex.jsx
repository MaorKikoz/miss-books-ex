const { useState, useEffect } = React

import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.Service.js'

export function BookIndex() {

    const [ books, setBooks ] = useState([])
    const [ filterBy, setFilterBy ] = useState({}) //improve later
    const [ selectedBook, setSelectedBook ] = useState(null) //implement later

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(books => setBooks(books))
    }


    return <section className="BookIndex">
        <BookList books={books}/>
    </section>
}