import { Sequelize } from "sequelize";

const dbKu = new Sequelize("dbblogku", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbKu;
