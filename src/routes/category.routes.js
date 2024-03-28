import { Router } from "express";
import { getAllCategories, createCategory } from "../controllers/category.controllers.js";

const router = Router();

router.get("/categories", getAllCategories);
router.post("/category", createCategory);

export default router;