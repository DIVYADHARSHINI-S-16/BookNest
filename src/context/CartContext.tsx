import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Book, CartItem } from '../types/book'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addToCart: (book: Book) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (book: Book) => {
    if (!book.available) return
    setItems((current) => {
      const existing = current.find((item) => item.id === book.id)
      if (existing) {
        return current.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, book.stock) }
            : item,
        )
      }
      return [...current, { ...book, quantity: 1 }]
    })
  }

  const increaseQuantity = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item,
      ),
    )
  }

  const decreaseQuantity = (id: string) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
