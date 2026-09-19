import { Router } from "express";
import {
  getSecondHandCondition,
  upsertSecondHandCondition,
  deleteSecondHandCondition,
} from "../controllers/secondHandController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.get("/", getSecondHandCondition);
router.put("/", requireAuth, requireRole("admin"), upsertSecondHandCondition);
router.delete("/", requireAuth, requireRole("admin"), deleteSecondHandCondition);

export default router;
