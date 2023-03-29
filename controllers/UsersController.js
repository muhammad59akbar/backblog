// import argon2 from "argon2";
import * as argon2 from "argon2";

import Userku from "../models/UsersModels.js";

export const getUserBlog = async (req, res) => {
  try {
    const response = await Userku.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserBlogById = async (req, res) => {
  try {
    const response = await Userku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUserBlog = async (req, res) => {
  const { firstName, lastName, email, password, confirmpassword, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmpassword ||
    !role
  )
    return res.status(400).json({ msg: "please fill out fields" });

  if (password !== confirmpassword)
    return res
      .status(400)
      .json({ msg: "password dan confirm password not match" });

  if (firstName.length < 3 || lastName.length < 3)
    return res
      .status(400)
      .json({ msg: "First Name or Last Name must be at least 3 characters" });

  if (password.length < 3)
    return res
      .status(400)
      .json({ msg: "Password must be at least 3 characters" });

  const hashpassword = await argon2.hash(password);

  const validation_email = await Userku.findOne({
    where: {
      email: email,
    },
  });

  if (validation_email) {
    res.status(400).json({ msg: "this email is already exist" });
  } else {
    try {
      await Userku.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashpassword,
        role_blog: role,
      });
      res.status(201).json({ msg: "add successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const UpdateUserBlog = async (req, res) => {
  const myuser = await Userku.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!myuser) return res.status(404).json({ msg: "User not Found" });

  const { firstName, lastName, email, password, confirmpassword, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmpassword ||
    !role
  )
    return res.status(400).json({ msg: "please fill out fields" });

  if (password !== confirmpassword)
    return res
      .status(400)
      .json({ msg: "password dan confirm password not match" });

  if (password.length < 3)
    return res
      .status(400)
      .json({ msg: "Password must be at least 3 characters" });
  if (firstName.length < 3 || lastName.length < 3)
    return res
      .status(400)
      .json({ msg: "First Name or Last Name must be at least 3 characters" });

  const hashpassword = await argon2.hash(password);

  try {
    await Userku.update(
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashpassword,
        role_blog: role,
      },
      {
        where: {
          id: myuser.id,
        },
      }
    );
    res.status(200).json({ msg: "User successfully updated !!!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const DeleteUserBlog = async (req, res) => {
  const myuser = await Userku.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!myuser) return res.status(404).json({ msg: "User not Found" });
  try {
    await Userku.destroy({
      where: {
        id: myuser.id,
      },
    });
    res.status(200).json({ msg: "User Has been deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
