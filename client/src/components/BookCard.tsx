import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export interface BookSummary {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  isSecondHand: boolean;
  inStock: boolean;
  availableQuantity: number;
  category: { name: string };
  averageRating?: number;
  reviewCount?: number;
}

export default function BookCard({ book }: { book: BookSummary }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [adding, setAdding] = React.useState(false);

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "customer") return;
    setAdding(true);
    try {
      await addToCart(book.id, 1);
      showToast("Added to cart.", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setAdding(false);
    }
  }

  return (
    <a href={`/books/${book.id}`} onClick={(e) => { e.preventDefault(); navigate(`/books/${book.id}`); }} className="book-card">
      <div className="book-card-cover">
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={book.title} />
        ) : (
          <div className="book-card-cover-placeholder">{book.title.charAt(0)}</div>
        )}
        {book.isSecondHand && <span className="badge book-card-badge">Second-hand</span>}
      </div>
      <div className="book-card-body">
        <p className="book-card-category">{book.category.name}</p>
        <h4 className="book-card-title">{book.title}</h4>
        <p className="book-card-author">{book.author}</p>
        <p className="book-card-description">
          {book.averageRating && book.reviewCount
            ? `★ ${book.averageRating.toFixed(1)} (${book.reviewCount})`
            : "\u00A0"}
        </p>

        <div className="book-card-footer">
          <div>
            <span className="book-card-price">₹{book.price.toFixed(2)}</span>
            <span className="book-card-stock">
              {book.inStock ? `${book.availableQuantity} in stock` : "Out of stock"}
            </span>
          </div>
          {user?.role !== "admin" && (
            <button
              className="btn btn-sm"
              disabled={!book.inStock || adding}
              onClick={handleAddToCart}
            >
              {!book.inStock ? "Unavailable" : adding ? "Adding…" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </a>
  );
}