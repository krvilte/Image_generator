import { Router } from "express";
import { getGeneratedImage } from "../controllers/dalle.controllers.js";

const router = Router();

router.route("/").get(getGeneratedImage);

export default router;
