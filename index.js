import express from "express";
import dbKu from "./config/dbKu.js";
import SequelizeStore from "connect-session-sequelize";
import UserBlogRoute from "./routes/UserBlogRoute.js";
import PostBlogRoute from "./routes/PostBlogRoute.js";
import AuthBlogRoute from "./routes/AuthBlogRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: dbKu,
});

app.use(
  session({
    secret: process.env.SECRET_SESSI,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

try {
  await dbKu.authenticate();
  console.log("database terkoneksi");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(UserBlogRoute);
app.use(PostBlogRoute);
app.use(AuthBlogRoute);

app.listen(process.env.PORT, () => console.log("app running at port 5000"));
