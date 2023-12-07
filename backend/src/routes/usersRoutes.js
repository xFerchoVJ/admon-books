import { Router } from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/usersController.js";
const router = Router();

router.get("/", allUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
