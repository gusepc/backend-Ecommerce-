import express from "express";
import usersController from "../controllers/users.Controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
router.use(express.json());

router.post("/api/user/premium/:uid", auth.isAdmin, usersController.upadteUser);

export default router;
