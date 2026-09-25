import express from "express";
import { getAllUserUrls, deleteUserUrl } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/urls", getAllUserUrls);
router.get("/urls", getAllUserUrls);
router.delete("/urls/:id", deleteUserUrl);

export default router;