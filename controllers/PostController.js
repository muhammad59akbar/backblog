import Blogku from "../models/BlogModels.js";
import fs from "fs";
import Userku from "../models/UsersModels.js";
import { Op } from "sequelize";

export const getPostBlog = async (req, res) => {
  try {
    const response = await Blogku.findAll({
      attributes: ["uuid", "img", "url", "title", "description"],
      include: [
        {
          model: Userku,
          attributes: ["first_name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPostBlogById = async (req, res) => {
  try {
    const response = await Blogku.findOne({
      attributes: ["uuid", "img", "url", "title", "description"],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Userku,
          attributes: ["first_name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPostBlogAdmin = async (req, res) => {
  try {
    let response;
    if (req.role_blog === "Admin" || req.role_blog === "admin") {
      response = await Blogku.findAll({
        attributes: ["uuid", "img", "url", "title", "description"],
        include: [
          {
            model: Userku,
            attributes: ["first_name", "email"],
          },
        ],
      });
    } else {
      response = await Blogku.findAll({
        attributes: ["uuid", "img", "url", "title", "description"],
        where: {
          userBlogId: req.userBlogId,
        },
        include: [
          {
            model: Userku,
            attributes: ["first_name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPostBlogAdminById = async (req, res) => {
  try {
    const dataBlog = await Blogku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dataBlog) return res.status(404).json({ msg: "Your Post No Found" });
    let response;
    if (req.role_blog === "Admin" && req.role_blog === "admin") {
      response = await Blogku.findOne({
        attributes: ["uuid", "img", "url", "title", "description"],
        where: {
          id: dataBlog.id,
        },
        include: [
          {
            model: Userku,
            attributes: ["fist_name", "email"],
          },
        ],
      });
    } else {
      response = await Blogku.findOne({
        attributes: ["uuid", "img", "url", "title", "description"],
        where: {
          [Op.and]: [{ id: dataBlog.id }, { userBlogId: req.userBlogId }],
        },
        include: [
          {
            model: Userku,
            attributes: ["fist_name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPostBlog = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "You Must Upload Photos" });
  const { title, description } = req.body;
  const img = req.file.filename;
  if (!title || !description) {
    const deleteimg = req.file.path;
    fs.unlinkSync(deleteimg);
    return res.status(400).json({ msg: "please fill out fields" });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${img}`;
  try {
    await Blogku.create({
      img: img,
      url: url,
      title: title,
      description: description,
      userBlogId: req.userBlogId,
    });
    res.status(201).json({ msg: "Your post has been successfully uploaded" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const UpdatePostBlog = async (req, res) => {
  try {
    const dataBlog = await Blogku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dataBlog) return res.status(404).json({ msg: "Your Post No Found" });

    const { title, description } = req.body;

    let img = "";
    if (!req.file) {
      img = dataBlog.img;
    } else {
      img = req.file.filename;
      const delimage = `./public/images/${dataBlog.img}`;
      fs.unlinkSync(delimage);
    }

    if (!title || !description) {
      const deleteimg = req.file.path;
      fs.unlinkSync(deleteimg);
      return res.status(400).json({ msg: "please fill out fields" });
    }
    const url = `${req.protocol}://${req.get("host")}/images/${img}`;

    if (req.role_blog === "Admin" || req.role_blog === "admin") {
      await Blogku.update(
        {
          img: img,
          url: url,
          title: title,
          description: description,
        },
        {
          where: {
            id: dataBlog.id,
          },
        }
      );
    } else {
      if (req.userBlogId !== dataBlog.userBlogId)
        return res.status(403).json({ msg: "Forbiden Access" });
      await Blogku.update(
        {
          img: img,
          url: url,
          title: title,
          description: description,
        },
        {
          where: {
            [Op.and]: [{ id: dataBlog.id }, { userBlogId: req.userBlogId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Your Post Successfully Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const DeletePostBlog = async (req, res) => {
  try {
    const dataBlog = await Blogku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dataBlog) return res.status(404).json({ msg: "Your Post No Found" });
    if (req.role_blog === "Admin" || req.role_blog === "admin") {
      const delimage = `./public/images/${dataBlog.img}`;
      fs.unlinkSync(delimage);
      await Blogku.destroy({
        where: {
          id: dataBlog.id,
        },
      });
    } else {
      if (req.userBlogId !== dataBlog.userBlogId)
        return res.status(403).json({ msg: "Forbiden Access" });
      await Blogku.destroy({
        where: {
          [Op.and]: [{ id: dataBlog.id }, { userBlogId: req.userBlogId }],
        },
      });
    }
    res.status(200).json({ msg: "Your Post Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
