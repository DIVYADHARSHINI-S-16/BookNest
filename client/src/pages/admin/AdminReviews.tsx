import React, { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  book: { id: string; title: string };
  reviewer: { name: string; email: string };
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await api.get<{ reviews: Review[] }>("/admin/reviews");
    setReviews(res.reviews);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function handleDelete(reviewId: string) {
    if (!confirm("Remove this review?")) return;
    try {
      await api.delete(`/admin/reviews/${reviewId}`);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="admin-page-title">Reviews</h1>
      {error && <p className="admin-error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Reviewer</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.book.title}</td>
              <td>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</td>
              <td>{review.comment || <em>No comment</em>}</td>
              <td>
                {review.reviewer.name}
                <br />
                <small>{review.reviewer.email}</small>
              </td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="admin-btn danger" onClick={() => handleDelete(review.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
