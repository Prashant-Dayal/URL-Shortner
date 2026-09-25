import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import {
  getAdminStats,
  getAllSystemUrls,
  deleteSystemUrl,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controller/admin.controller.js";

const router = express.Router();

// All admin routes require authentication AND admin privileges
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", getAdminStats);
router.get("/urls", getAllSystemUrls);
router.delete("/urls/:id", deleteSystemUrl);
router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
