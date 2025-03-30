import { Router } from "express";
import { getGeneratedImage } from "../controllers/image.controllers.js";

const router = Router();

router.route("/generate-image").post(getGeneratedImage);

export default router;
