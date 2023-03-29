import express from "express";
import {
  createPostBlog,
  DeletePostBlog,
  getPostBlog,
  getPostBlogAdmin,
  getPostBlogById,
  UpdatePostBlog,
} from "../controllers/PostController.js";
import { verifUserLogin } from "../midleware/AuthUserBlog.js";
import uploadFile from "../midleware/UploadFiles.js";

const router = express.Router();

router.get("/proBlog", getPostBlog);
router.get("/proBlog/:id", getPostBlogById);

router.get("/proBlogAdmin", verifUserLogin, getPostBlogAdmin);
router.get("/proBlogAdmin/:id", verifUserLogin, getPostBlogById);
router.post("/proBlogAdmin", verifUserLogin, uploadFile, createPostBlog);
router.patch("/proBlogAdmin/:id", verifUserLogin, uploadFile, UpdatePostBlog);
router.delete("/proBlogAdmin/:id", verifUserLogin,DeletePostBlog);

export default router;
