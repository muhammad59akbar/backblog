import Userku from "../models/UsersModels.js";

export const verifUserLogin = async (req, res, next) => {
  if (!req.session.userBlogId) {
    return res.status(401).json({ msg: "please login to your account !!!" });
  }
  const myuser = await Userku.findOne({
    where: {
      uuid: req.session.userBlogId,
    },
  });
  if (!myuser) return res.status(404).json({ msg: "User Not Found" });

  req.userBlogId = myuser.id;
  req.role_blog = myuser.role_blog;

  next();
};

export const AdminBlog = async (req, res, next) => {
  const myuser = await Userku.findOne({
    where: {
      uuid: req.session.userBlogId,
    },
  });
  if (!myuser) return res.status(404).json({ msg: "User Not Found" });
  if (myuser.role_blog !== "Admin" && myuser.role_blog !== "admin")
    return res.status(403).json({ msg: "Forbiden Access" });
  next();
};
