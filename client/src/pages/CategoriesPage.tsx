import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { LoadingState, ErrorState, EmptyState } from "../components/StateBlocks";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ categories: Category[] }>("/categories")
      .then((res) => setCategories(res.categories))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1 className="page-title">Categories</h1>
      <p className="page-subtitle">Browse the catalog by genre.</p>

      {error && <ErrorState message={error} />}
      {!error && !categories && <LoadingState />}
      {categories && categories.length === 0 && <EmptyState title="No categories yet" />}

      {categories && categories.length > 0 && (
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/books?category=${cat.slug}`} className="category-card card">
              <h3>{cat.name}</h3>
              {cat.description && <p>{cat.description}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
