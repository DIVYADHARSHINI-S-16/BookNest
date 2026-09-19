import { Router } from "express";
import {
  checkout,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

// Admin routes (declared before the customer :id route so "admin" isn't
// swallowed as an order id).
router.get("/admin/all", requireRole("admin"), getAllOrders);
router.patch("/:id/status", requireRole("admin"), updateOrderStatus);

// Customer routes
router.post("/checkout", requireRole("customer"), checkout);
router.get("/", requireRole("customer"), getMyOrders);
router.get("/:id", getOrderById); // shared: customer (own order) or admin (any)

export default router;
