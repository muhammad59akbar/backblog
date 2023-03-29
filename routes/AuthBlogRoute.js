import express from "express";
import { LoginBlogKu, LogoutBlogKu, myAccBlogKu } from "../controllers/Auth.js";
const router = express.Router();

router.get("/mdproMyAccKu", myAccBlogKu);
router.post("/mdproLoginKu", LoginBlogKu);
router.delete("/mdproLogoutKu", LogoutBlogKu);

export default router;
