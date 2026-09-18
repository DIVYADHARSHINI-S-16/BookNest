import { useMemo, useState } from 'react'
import { books } from '../data/books'
import type { Category } from '../types/book'
import { BookGrid } from '../components/BookGrid'
import { CategoryFilter } from '../components/CategoryFilter'
import { SearchBar } from '../components/SearchBar'

export function CatalogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | Category>('All')
  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return books.filter((book) => {
      const matchesCategory = category === 'All' || book.category === category
      const matchesSearch = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  return (
    <main>
      <section className="catalog-intro"><span className="section-kicker">Independent books, thoughtfully chosen</span><h1>Discover your next book</h1><p>Explore books from independent bookstores.</p></section>
      <section className="catalog-controls" id="catalog"><SearchBar value={search} onChange={setSearch} /><CategoryFilter activeCategory={category} onChange={setCategory} /></section>
      <section className="catalog-results"><div className="results-heading"><h2>Our books</h2><span>{filteredBooks.length} {filteredBooks.length === 1 ? 'title' : 'titles'}</span></div><BookGrid books={filteredBooks} /></section>
    </main>
  )
}
