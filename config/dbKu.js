import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const dbKu = new Sequelize(
  "b8v3wjmisnumx1mfwfnk",
  "uk7sb6yuq373qlv5",
  "uk7sb6yuq373qlv5",
  {
    host: "b8v3wjmisnumx1mfwfnk-mysql.services.clever-cloud.com",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default dbKu;
