import express from "express";
import {
  getUserByID,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multiUpload, singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, multiUpload, updateProfile);
router.route("/fetchuser").get(getUserByID);
export default router;
