import { UserModel } from "../models/User.model.js";
import {ROLES} from "../models/Role.model.js";

export const checkExistingUser = async (req, res, next) => {
    try {
     
      const email = await UserModel.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const checkExistingRole = (req, res, next) => {
    if(req.body.roles){
        for(let i =0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message:`Role ${req.body.roles[i]} does not exist`
                })
            }
        }
    }
  
    next();
  };