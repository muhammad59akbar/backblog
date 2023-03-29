import express from "express";
import {
  createUserBlog,
  DeleteUserBlog,
  getUserBlog,
  getUserBlogById,
  UpdateUserBlog,
} from "../controllers/UsersController.js";
import { AdminBlog, verifUserLogin } from "../midleware/AuthUserBlog.js";

const router = express.Router();

router.get("/userBlogku", verifUserLogin, AdminBlog, getUserBlog);
router.get("/userBlogku/:id", verifUserLogin, AdminBlog, getUserBlogById);
router.post("/userBlogku", verifUserLogin, AdminBlog, createUserBlog);
router.patch("/userBlogku/:id", verifUserLogin, UpdateUserBlog);
router.delete("/userBlogku/:id", verifUserLogin, AdminBlog, DeleteUserBlog);

export default router;
