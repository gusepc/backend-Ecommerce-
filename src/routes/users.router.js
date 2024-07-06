import express from "express";
import usersController from "../controllers/users.Controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
router.use(express.json());

router.get("/api/users", auth.isAdmin, usersController.getUsers);

router.post("/api/user/premium/:uid", auth.isAdmin, usersController.upadteUser);

router.delete("/api/users", auth.isAdmin, usersController.deleteOldUSers);
router.delete("/api/user/:uid", auth.isAdmin, usersController.deleteUser);

router.get("/api/admin", auth.isAdmin, usersController.admin);

export default router;
