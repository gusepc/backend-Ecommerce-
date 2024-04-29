import express from "express";
import viewsController from "../controllers/viewsController.js";
import auth from "../middlewares/auth.js";
import isUser from "../middlewares/isUser.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.use(express.json());

router.get("/", auth, isUser, viewsController.getRoot);

router.get("/products", auth, viewsController.getProducts);

router.get("/carts/:cid", auth, isUser, viewsController.getCart);

router.get("/realtimeproducts", auth, isAdmin, viewsController.getRtProducts);

router.get("/chat", auth, isUser, viewsController.getChat);

router.get("/mockingproducts", viewsController.getMockingProducts);

export default router;
