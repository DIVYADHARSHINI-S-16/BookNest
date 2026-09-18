export type Category =
  | 'Fiction'
  | 'Non-Fiction'
  | 'Mystery'
  | 'Romance'
  | 'Biography'
  | 'Technology'
  | 'Children'

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  price: number
  description: string
  image: string
  available: boolean
  stock: number
}

export interface CartItem extends Book {
  quantity: number
}
