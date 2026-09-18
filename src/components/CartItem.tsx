import type { CartItem as CartItemType } from '../types/book'
import { useCart } from '../context/CartContext'
import { Icon } from './Icon'

export function CartItem({ item }: { item: CartItemType }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  return (
    <article className="cart-item">
      <img src={item.image} alt={`${item.title} cover`} />
      <div className="cart-item-info"><span className="eyebrow">{item.category}</span><h2>{item.title}</h2><p>{item.author}</p></div>
      <div className="quantity-control" aria-label={`Quantity for ${item.title}`}><button type="button" onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity"><Icon name="minus" size={16} /></button><span>{item.quantity}</span><button type="button" onClick={() => increaseQuantity(item.id)} disabled={item.quantity >= item.stock} aria-label="Increase quantity"><Icon name="plus" size={16} /></button></div>
      <strong className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</strong>
      <button className="icon-button" type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}><Icon name="trash" size={18} /></button>
    </article>
  )
}
