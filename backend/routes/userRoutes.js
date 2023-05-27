import {
  authUser,
  getUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

import express from "express";
import { protect } from "../middleware/authMiddleware.js";

//  /api/users        =>  register new user / POST
// /api/users/auth    =>  login a user / POST
// /api/users/profile =>  get profile / GET
// /api/users/profile =>  update profile / PUT
// /api/users/logout =>  update profile / POST

const router = express.Router();

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/profile").get(protect, getUser).put(protect, updateUser);
router.route("/logout").post(logoutUser);

export default router;
