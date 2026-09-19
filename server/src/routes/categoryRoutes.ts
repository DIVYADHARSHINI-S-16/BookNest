import { Router } from "express";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

// Public: view categories for filter menus
router.get("/", listCategories);

// Admin only: manage categories
router.post("/", requireAuth, requireRole("admin"), createCategory);
router.put("/:id", requireAuth, requireRole("admin"), updateCategory);
router.delete("/:id", requireAuth, requireRole("admin"), deleteCategory);

export default router;
