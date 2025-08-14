import {Router, type Request, Response} from "express";
import { LocationController } from "../controllers/locationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware,LocationController.createLocation);
router.get("/", authMiddleware, LocationController.getLocations);
// router.post("/upload", authMiddleware, LocationController.uploadLocation);

export default router;