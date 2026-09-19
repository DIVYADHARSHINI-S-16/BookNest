import React, { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Book {
  id: string;
  title: string;
  author: string;
  isSecondHand: boolean;
}

interface Condition {
  conditionGrade: string;
  conditionNotes: string | null;
  coverCondition: string | null;
  pageCondition: string | null;
  visibleWear: string | null;
  additionalNotes: string | null;
  priceOverride: number | null;
}

const GRADES = ["LIKE_NEW", "VERY_GOOD", "GOOD", "ACCEPTABLE"];

const emptyForm: Condition = {
  conditionGrade: "GOOD",
  conditionNotes: "",
  coverCondition: "",
  pageCondition: "",
  visibleWear: "",
  additionalNotes: "",
  priceOverride: null,
};

export default function AdminSecondHand() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [form, setForm] = useState<Condition>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ books: Book[] }>("/books?limit=50")
      .then((res) => setBooks(res.books))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selectedBookId) return;
    setError(null);
    setNotice(null);
    api
      .get<{ condition: Condition }>(`/books/${selectedBookId}/second-hand`)
      .then((res) => setForm(res.condition))
      .catch(() => setForm(emptyForm)); // no condition set yet — start fresh
  }, [selectedBookId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    try {
      await api.put(`/books/${selectedBookId}/second-hand`, {
        ...form,
        priceOverride: form.priceOverride || null,
      });
      setNotice("Condition details saved.");
      const res = await api.get<{ books: Book[] }>("/books?limit=50");
      setBooks(res.books);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleRemove() {
    if (!confirm("Remove second-hand condition and un-mark this book as second-hand?")) return;
    try {
      await api.delete(`/books/${selectedBookId}/second-hand`);
      setForm(emptyForm);
      setSelectedBookId("");
      const res = await api.get<{ books: Book[] }>("/books?limit=50");
      setBooks(res.books);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="admin-page-title">Second-Hand Conditions</h1>
      {error && <p className="admin-error">{error}</p>}
      {notice && <p style={{ color: "green", fontSize: "0.85rem" }}>{notice}</p>}

      <label style={{ display: "block", marginBottom: "1rem", maxWidth: 320 }}>
        Book
        <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} {b.isSecondHand ? "(second-hand)" : ""}
            </option>
          ))}
        </select>
      </label>

      {selectedBookId && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Condition Grade
            <select
              value={form.conditionGrade}
              onChange={(e) => setForm({ ...form, conditionGrade: e.target.value })}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g.replace("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cover Condition
            <input
              value={form.coverCondition || ""}
              onChange={(e) => setForm({ ...form, coverCondition: e.target.value })}
              placeholder="e.g. minor corner wear"
            />
          </label>
          <label>
            Page Condition
            <input
              value={form.pageCondition || ""}
              onChange={(e) => setForm({ ...form, pageCondition: e.target.value })}
              placeholder="e.g. clean, no markings"
            />
          </label>
          <label>
            Visible Wear
            <input
              value={form.visibleWear || ""}
              onChange={(e) => setForm({ ...form, visibleWear: e.target.value })}
              placeholder="e.g. light shelf wear on spine"
            />
          </label>
          <label>
            Condition Notes
            <textarea
              value={form.conditionNotes || ""}
              onChange={(e) => setForm({ ...form, conditionNotes: e.target.value })}
            />
          </label>
          <label>
            Additional Notes
            <textarea
              value={form.additionalNotes || ""}
              onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
            />
          </label>
          <label>
            Price Override (optional)
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.priceOverride ?? ""}
              onChange={(e) =>
                setForm({ ...form, priceOverride: e.target.value ? Number(e.target.value) : null })
              }
            />
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="admin-btn" type="submit">
              Save Condition
            </button>
            <button className="admin-btn danger" type="button" onClick={handleRemove}>
              Remove Second-Hand Status
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
