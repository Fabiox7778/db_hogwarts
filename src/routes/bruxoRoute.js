import { Router } from "express";
import * as bruxoController from "../controllers/bruxoController.js";

const router = Router();

router.get("/", bruxoController.listarTodos);
router.get("/:id", bruxoController.listarUm);
router.get("/", bruxoController.criar);
router.get("/:id", bruxoController.deletar);

export default router;