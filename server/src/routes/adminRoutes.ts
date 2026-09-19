import { Router } from "express";
import { getDashboardStats } from "../controllers/adminController";
import { listAllReviewsForAdmin, deleteReviewAsAdmin } from "../controllers/reviewController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

// Every route in this file is admin-only.
router.use(requireAuth, requireRole("admin"));

router.get("/dashboard", getDashboardStats);
router.get("/reviews", listAllReviewsForAdmin);
router.delete("/reviews/:reviewId", deleteReviewAsAdmin);

export default router;
