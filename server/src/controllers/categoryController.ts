import { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool";
import { AppError } from "../middleware/errorHandler";

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      "SELECT id, name, slug, description FROM categories ORDER BY name ASC"
    );
    res.json({ categories: result.rows });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description } = req.body;
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new AppError("Category name is required.", 422);
    }
    const slug = slugify(name);
    const result = await pool.query(
      `INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3)
       RETURNING id, name, slug, description`,
      [name.trim(), slug, description || null]
    );
    res.status(201).json({ category: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new AppError("Category name is required.", 422);
    }
    const slug = slugify(name);
    const result = await pool.query(
      `UPDATE categories SET name = $1, slug = $2, description = $3 WHERE id = $4
       RETURNING id, name, slug, description`,
      [name.trim(), slug, description || null, id]
    );
    if (result.rows.length === 0) throw new AppError("Category not found.", 404);
    res.json({ category: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const inUse = await pool.query("SELECT id FROM books WHERE category_id = $1 LIMIT 1", [id]);
    if (inUse.rows.length > 0) {
      throw new AppError("Cannot delete a category that still has books.", 409);
    }
    const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING id", [id]);
    if (result.rows.length === 0) throw new AppError("Category not found.", 404);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
