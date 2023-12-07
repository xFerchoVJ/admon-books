import { Router } from "express";
import {
  allCategories,
  createCategory,
  deleteCategory,
  findCategory,
  updateCategory,
} from "../controllers/categoriesController.js";
const router = Router();

router.get("/", allCategories);
router.get("/:id", findCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
