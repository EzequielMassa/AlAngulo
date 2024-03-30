import { Router } from "express";
import { getAllCategories, createCategory, deleteCategory, updateCategory } from "../controllers/category.controllers.js";

const router = Router();

router.get("/categories", getAllCategories);
router.post("/category", createCategory);
router.delete("/category/delete/:id", deleteCategory);
router.put("/category/update/:id", updateCategory);

export default router;