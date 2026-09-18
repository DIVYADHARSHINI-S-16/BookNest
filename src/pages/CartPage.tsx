import { Link } from 'react-router-dom'
import { CartItem } from '../components/CartItem'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { items, itemCount, subtotal } = useCart()
  return <main className="cart-page"><div className="page-heading"><span className="section-kicker">Your reading list</span><h1>Your cart</h1><p>{itemCount === 0 ? 'Your cart is ready for its first story.' : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} selected for your next read.`}</p></div>{items.length === 0 ? <div className="empty-cart"><p>Your cart is empty.</p><Link className="button" to="/">Continue shopping</Link></div> : <div className="cart-layout"><div className="cart-list">{items.map((item) => <CartItem key={item.id} item={item} />)}<Link className="continue-link" to="/">Continue shopping</Link></div><aside className="cart-summary"><h2>Order summary</h2><div><span>Total items</span><span>{itemCount}</span></div><div className="summary-total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><button className="button checkout-button" type="button" onClick={() => window.alert('Checkout will be available in a future phase.')}>Proceed to Checkout</button><p>Taxes and shipping calculated at checkout.</p></aside></div>}</main>
}
