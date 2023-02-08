import express from "express";
import dbKu from "./config/dbKu.js";

const app = express();

app.use(express.json());

try {
  await dbKu.authenticate();
  console.log("database terkoneksi");
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT, () => console.log("app running at port 5000"));
