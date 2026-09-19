import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import { EmptyState } from "../components/StateBlocks";

export default function CheckoutPage() {
  const { cart, refresh } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  if (cart.items.length === 0) {
    return <EmptyState title="Your cart is empty" hint="Add a book before checking out." />;
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPlacing(true);
    try {
      const res = await api.post<{ order: { id: string } }>("/orders/checkout", {
        shippingAddress,
      });
      await refresh();
      navigate("/order-success", { state: { orderId: res.order.id } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Checkout</h1>
      <p className="page-subtitle">Review your order and confirm shipping details.</p>

      <div className="cart-layout">
        <form className="card checkout-form" onSubmit={handlePlaceOrder}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-field">
            <label htmlFor="address">Shipping address</label>
            <textarea
              id="address"
              rows={4}
              required
              minLength={5}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Street, city, state, PIN code"
            />
          </div>

          <div className="mock-payment-box">
            <strong>Payment</strong>
            <p>
              MOCK PAYMENT — no real payment gateway is connected. Placing this order will
              mark it as paid instantly for demonstration purposes only.
            </p>
          </div>

          <button className="btn btn-block" type="submit" disabled={placing}>
            {placing ? "Placing order…" : `Place order — ₹${cart.total.toFixed(2)}`}
          </button>
        </form>

        <div className="card cart-summary">
          <h3>Order Summary</h3>
          {cart.items.map((item) => (
            <div className="cart-summary-row" key={item.cartItemId}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>₹{cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
