import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const dbKu = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default dbKu;
