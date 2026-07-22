import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    //getEmptyBook,
    getDefaultFilter//,
    // getPriceStats,
    // getTitleStats
}
// For Debug (easy access from console):
window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            // if (filterBy.minPrice) {
            //     books = books.filter(book => book.listPrice >= filterBy.minPrice)
            // }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// function getEmptyBook(title = '', l = '') {
//     return { title, listPrice }
// }

function getDefaultFilter(filterBy = { txt: '', minPrice: 0 }) {
    return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}

// function getPriceStats() {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             const bookCountByPriceMap = _getBookCountByPriceMap(books)
//             const data = Object.keys(bookCountByPriceMap).map(priceName => ({ title: priceName, value: bookCountByPriceMap[priceName] }))
//             return data
//         })
// }

// function getTitleStats() {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             const bookCountByTitleMap = _getBookCountByTitleMap(books)
//             const data = Object.keys(bookCountByTitleMap)
//                 .map(title =>
//                 ({
//                     title: title,
//                     value: Math.round((bookCountByTitleMap[title] / books.length) * 100)
//                 }))
//             return data
//         })
// }

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    let books = []

    books = utilService.loadFromStorage(BOOK_KEY) || []

    if (!books || !books.length) {
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    console.log('books', books)
}

// function _createCars() {
//     let cars = utilService.loadFromStorage(CAR_KEY)
//     if (!cars || !cars.length) {
//         cars = []
//         const vendors = ['audu', 'fiak', 'subali', 'mitsu']
//         for (let i = 0; i < 6; i++) {
//             const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
//             cars.push(_createCar(vendor, utilService.getRandomIntInclusive(80, 300)))
//         }
//         utilService.saveToStorage(CAR_KEY, cars)
//     }
// }



function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce((map, book) => {
        if (book.listPrice < 120) map.slow++
        else if (book.listPrice < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return bookCountByPriceMap
}

function _getBookCountByTitleMap(books) {
    const bookCountByTitleMap = books.reduce((map, book) => {
        if (!map[book.title]) map[book.title] = 0
        map[book.title]++
        return map
    }, {})
    return bookCountByTitleMap
}