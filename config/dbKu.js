import { Sequelize } from "sequelize";

const dbKu = new Sequelize(
  process.env.DB_NAME || "b8v3wjmisnumx1mfwfnk",
  process.env.DB_USERNAME || "uk7sb6yuq373qlv5",
  process.env.DB_PASSWORD || "An4peiZdtZid0VQ8fsV8",
  {
    host:
      process.env.DB_HOST ||
      "b8v3wjmisnumx1mfwfnk-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export default dbKu;
