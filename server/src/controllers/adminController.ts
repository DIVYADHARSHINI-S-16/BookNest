import { Request, Response, NextFunction } from "express";
import { pool } from "../db/pool";

const LOW_STOCK_THRESHOLD = 5;

/**
 * GET /api/admin/dashboard
 * Every figure is a live query against Postgres — nothing here is mocked
 * or cached.
 */
export async function getDashboardStats(_req: Request, res: Response, next: NextFunction) {
  try {
    const [
      totalBooksResult,
      totalCustomersResult,
      totalOrdersResult,
      ordersByStatusResult,
      lowStockResult,
      totalReviewsResult,
      revenueResult,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS count FROM books"),
      pool.query("SELECT COUNT(*)::int AS count FROM users WHERE role = 'customer'"),
      pool.query("SELECT COUNT(*)::int AS count FROM orders"),
      pool.query("SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status"),
      pool.query(
        `SELECT b.id, b.title, b.author, COALESCE(i.quantity - i.reserved, 0) AS available_quantity
         FROM books b LEFT JOIN inventory i ON i.book_id = b.id
         WHERE COALESCE(i.quantity - i.reserved, 0) <= $1
         ORDER BY available_quantity ASC`,
        [LOW_STOCK_THRESHOLD]
      ),
      pool.query("SELECT COUNT(*)::int AS count FROM reviews"),
      pool.query(
        `SELECT COALESCE(SUM(total), 0) AS revenue FROM orders WHERE status != 'CANCELLED'`
      ),
    ]);

    const ordersByStatus: Record<string, number> = {};
    for (const row of ordersByStatusResult.rows) {
      ordersByStatus[row.status] = row.count;
    }

    res.json({
      totalBooks: totalBooksResult.rows[0].count,
      totalCustomers: totalCustomersResult.rows[0].count,
      totalOrders: totalOrdersResult.rows[0].count,
      totalReviews: totalReviewsResult.rows[0].count,
      totalRevenue: Number(revenueResult.rows[0].revenue),
      ordersByStatus,
      lowStockThreshold: LOW_STOCK_THRESHOLD,
      lowStockBooks: lowStockResult.rows.map((row) => ({
        id: row.id,
        title: row.title,
        author: row.author,
        availableQuantity: Number(row.available_quantity) || 0,
      })),
    });
  } catch (err) {
    next(err);
  }
}
