import { Router } from "express";
import { listReviews, addReview } from "../controllers/reviewController";
import { requireAuth, requireRole } from "../middleware/auth";

// mergeParams so :bookId from the parent /api/books/:bookId mount is visible
const router = Router({ mergeParams: true });

router.get("/", listReviews);
router.post("/", requireAuth, requireRole("customer"), addReview);

export default router;
