import Userku from "../models/UsersModels.js";
// import * as argon2 from "argon2";
import bcrypt from "bcryptjs";

export const LoginBlogKu = async (req, res) => {
  const myuser = await Userku.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!myuser) return res.status(404).json({ msg: "User Not Found" });
  // const verifyPass = await argon2.verify(myuser.password, req.body.password);
  const verifyPass = await bcrypt.compare(req.body.password, myuser.password);
  if (!verifyPass)
    return res.status(400).json({ msg: "your password is Wrong !!!" });
  req.session.userBlogId = myuser.uuid;
  const uuid = myuser.uuid;
  const firstName = myuser.first_name;
  const email = myuser.email;
  const role = myuser.role_blog;
  res.status(200).json({ uuid, firstName, email, role });
};

export const myAccBlogKu = async (req, res) => {
  if (!req.session.userBlogId) {
    return res.status(401).json({ msg: "please login to your account !!!" });
  }
  const myuser = await Userku.findOne({
    attributes: ["uuid", "first_name", "last_name", "email", "role_blog"],
    where: {
      uuid: req.session.userBlogId,
    },
  });
  if (!myuser) return res.status(404).json({ msg: "User Not Found" });
  res.status(200).json(myuser);
};

export const LogoutBlogKu = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "cannot logout" });
    res.status(200).json({ msg: "you have been logged out" });
  });
};
