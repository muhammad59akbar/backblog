import express from "express";
import {
  createUserBlog,
  DeleteUserBlog,
  getUserBlog,
  getUserBlogById,
  UpdateUserBlog,
} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/userBlogku", getUserBlog);
router.get("/userBlogku/:id", getUserBlogById);
router.post("/userBlogku", createUserBlog);
router.patch("/userBlogku/:id", UpdateUserBlog);
router.delete("/userBlogku/:id", DeleteUserBlog);

export default router;
