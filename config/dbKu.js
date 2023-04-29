import { Sequelize } from "sequelize";

const dbKu = new Sequelize(
  "freedb_dbblogku",
  "freedb_user_blog",
  "WCcj2V5!f#jKc?X",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
  }
);

export default dbKu;
