import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const dbKu = new Sequelize(
  "freedb_dbblogku",
  "freedb_user_blog",
  "WCcj2V5!f#jKc?X",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

export default dbKu;
