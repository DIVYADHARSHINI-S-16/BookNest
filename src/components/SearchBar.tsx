import { Icon } from './Icon'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <Icon name="search" size={20} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search books by title or author..."
        aria-label="Search books by title or author"
      />
    </label>
  )
}
