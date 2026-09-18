import type { Category } from '../types/book'

export const categories: Array<'All' | Category> = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Biography', 'Technology', 'Children']

interface CategoryFilterProps {
  activeCategory: 'All' | Category
  onChange: (category: 'All' | Category) => void
}

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter" id="categories" aria-label="Filter books by category">
      {categories.map((category) => (
        <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => onChange(category)} type="button">
          {category}
        </button>
      ))}
    </div>
  )
}
