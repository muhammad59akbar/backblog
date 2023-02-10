import express from "express";
import {
  createPostBlog,
  DeletePostBlog,
  getPostBlog,
  getPostBlogById,
  UpdatePostBlog,
} from "../controllers/PostController.js";

const router = express.Router();

router.get("/proBlog", getPostBlog);
router.get("/proBlog/:id", getPostBlogById);
router.post("/proBlog", createPostBlog);
router.patch("/proBlog/:id", UpdatePostBlog);
router.delete("/proBlog/:id", DeletePostBlog);

export default router;
