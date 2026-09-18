import { Link } from 'react-router-dom'
import type { Book } from '../types/book'
import { useCart } from '../context/CartContext'

export function BookCard({ book }: { book: Book }) {
  const { addToCart } = useCart()

  return (
    <article className="book-card">
      <Link className="book-cover-link" to={`/books/${book.id}`} aria-label={`View ${book.title}`}>
        <div className="book-cover"><img src={book.image} alt={`${book.title} cover`} /></div>
      </Link>
      <div className="book-card-content">
        <span className="eyebrow">{book.category}</span>
        <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <div className="book-card-footer">
          <div><strong>${book.price.toFixed(2)}</strong><span className={book.available ? 'availability' : 'availability unavailable'}>{book.available ? `${book.stock} in stock` : 'Out of stock'}</span></div>
          <button className="button button-small" type="button" onClick={() => addToCart(book)} disabled={!book.available}>{book.available ? 'Add to cart' : 'Unavailable'}</button>
        </div>
      </div>
    </article>
  )
}
