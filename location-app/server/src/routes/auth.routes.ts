import {Router, type Request, Response} from "express";
import { AuthController } from "../controllers/authController.js";

const router = Router();

router.post("/register", AuthController.register);

export default router;