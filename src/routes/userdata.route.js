import express from "express";
import { createSnapshot, getMySnapshots } from "../controllers/userdata.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/userdata/snapshots - create a timestamped snapshot (protected)
router.post("/snapshots", protectRoute, createSnapshot);

// GET /api/userdata/snapshots - list recent snapshots for the authenticated user
router.get("/snapshots", protectRoute, getMySnapshots);

export default router;
