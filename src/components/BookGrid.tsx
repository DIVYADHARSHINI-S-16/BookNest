import type { Book } from '../types/book'
import { BookCard } from './BookCard'

export function BookGrid({ books }: { books: Book[] }) {
  if (books.length === 0) return <p className="empty-state">No books found.</p>
  return <div className="book-grid">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>
}
