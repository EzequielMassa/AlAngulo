import RoleModel from "../models/Role.model.js";
import { UserModel } from "../models/User.model.js";
import jwt from "jsonwebtoken"
export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) return res.status(403).json({ message: "No token provided" });
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
  
      const user = await UserModel.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "No user found" });
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };
export const isAdmin = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.userId);
      const roles = await RoleModel.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };