import dbKu from "../config/dbKu.js";
import { Sequelize } from "sequelize";
import Userku from "./UsersModels.js";

const { DataTypes } = Sequelize;

const Blogku = dbKu.define(
  "post_blog",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userBlogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Userku.hasMany(Blogku);
Blogku.belongsTo(Userku, { foreignKey: "userBlogId" });

export default Blogku;
