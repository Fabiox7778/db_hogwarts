import { Router } from "express";
import * as bruxoController from "../controllers/bruxoController.js";

const router = Router();

router.get("/", bruxoController.listarTodos);

export default router;