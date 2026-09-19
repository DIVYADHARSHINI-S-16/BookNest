import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation() as { state?: { orderId?: string } };
  const orderId = location.state?.orderId;

  return (
    <div className="state-block" style={{ maxWidth: 480, margin: "2rem auto" }}>
      <div className="success-check">✓</div>
      <h1 className="page-title" style={{ marginTop: "1rem" }}>
        Order placed!
      </h1>
      <p>
        Thanks for your order{orderId ? ` (#${orderId.slice(0, 8)})` : ""}. Payment was processed
        via mock payment for this demo.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
        {orderId && (
          <Link className="btn" to={`/orders/${orderId}`}>
            View order
          </Link>
        )}
        <Link className="btn btn-outline" to="/books">
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
