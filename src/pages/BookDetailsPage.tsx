import { Link, useParams } from 'react-router-dom'
import { books } from '../data/books'
import { useCart } from '../context/CartContext'
import { Icon } from '../components/Icon'

export function BookDetailsPage() {
  const { id } = useParams()
  const book = books.find((item) => item.id === id)
  const { addToCart } = useCart()

  if (!book) return <main className="message-page"><h1>Book not found</h1><Link className="text-link" to="/">Back to the catalog</Link></main>

  return <main className="detail-page"><Link className="back-link" to="/"><Icon name="back" size={18} /> Back to books</Link><div className="detail-layout"><div className="detail-cover book-cover"><img src={book.image} alt={`${book.title} cover`} /></div><div className="detail-copy"><span className="eyebrow">{book.category}</span><h1>{book.title}</h1><p className="detail-author">by {book.author}</p><p className="detail-description">{book.description}</p><div className="detail-purchase"><div><strong>${book.price.toFixed(2)}</strong><span className={book.available ? 'availability' : 'availability unavailable'}>{book.available ? `${book.stock} in stock` : 'Out of stock'}</span></div><button className="button" type="button" onClick={() => addToCart(book)} disabled={!book.available}>{book.available ? 'Add to cart' : 'Unavailable'}</button></div></div></div></main>
}
