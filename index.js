import express from "express";
import dbKu from "./config/dbKu.js";
import UserBlogRoute from "./routes/UserBlogRoute.js";
import PostBlogRoute from "./routes/PostBlogRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

try {
  await dbKu.authenticate();
  console.log("database terkoneksi");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(UserBlogRoute);
app.use(PostBlogRoute);

app.listen(process.env.PORT, () => console.log("app running at port 5000"));
