import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

router.use(requireAuth, requireRole("customer"));

router.get("/", getCart);
router.post("/", addToCart);
router.patch("/:bookId", updateCartItemQuantity);
router.delete("/:bookId", removeFromCart);
router.delete("/", clearCart);

export default router;
