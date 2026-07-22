export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <p><img src={`${book.thumbnail}`} alt="" /></p>
    </article>
}