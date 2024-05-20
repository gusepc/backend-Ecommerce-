import express from "express";
import viewsController from "../controllers/viewsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.use(express.json());

router.get("/", auth.isAdmin, viewsController.getRoot);

router.get("/products", auth.auth, viewsController.getProducts);

router.get("/carts/:cid", auth.isUserOrPremium, viewsController.getCart);

router.get("/realtimeproducts", auth.isAdmin, viewsController.getRtProducts);

router.get("/chat", auth.isUserOrPremium, viewsController.getChat);

router.get("/mockingproducts", auth.isAdmin, viewsController.getMockingProducts);

router.get("/loggerTest", auth.isAdmin, viewsController.getLogger);

export default router;
