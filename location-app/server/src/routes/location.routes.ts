import {Router, type Request, Response} from "express";
import { LocationController } from "../controllers/locationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/", authMiddleware,LocationController.createLocation);
router.get("/", authMiddleware, LocationController.getLocations);
router.post("/upload", authMiddleware, upload.single('file'),LocationController.uploadLocation);

export default router;