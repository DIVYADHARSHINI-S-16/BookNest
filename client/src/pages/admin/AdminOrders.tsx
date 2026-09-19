import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

interface Order {
  id: string;
  status: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  customer: { name: string; email: string };
}

const STATUSES = ["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const query = statusFilter ? `?status=${statusFilter}` : "";
    const res = await api.get<{ orders: Order[] }>(`/orders/admin/all${query}`);
    setOrders(res.orders);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function updateStatus(id: string, status: string) {
    setError(null);
    try {
      await api.patch(`/orders/${id}/status`, { status });
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      {error && <p className="admin-error">{error}</p>}

      <label style={{ display: "block", marginBottom: "1rem", maxWidth: 220 }}>
        Filter by status
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Placed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id.slice(0, 8)}…</td>
              <td>
                {order.customer.name}
                <br />
                <small>{order.customer.email}</small>
              </td>
              <td>₹{order.total.toFixed(2)}</td>
              <td>
                {order.paymentMethod} · {order.paymentStatus}
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Link className="admin-btn secondary" to={`/admin/orders/${order.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
