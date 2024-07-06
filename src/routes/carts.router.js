import express from "express";
import cartsController from "../controllers/cartsController.js";
import ticketsController from "../controllers/ticketsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.use(express.json());

//Create
router.post("/api/carts", auth.isAdmin, cartsController.addCart);
router.post("/api/carts/:cid/purchase", auth.isUserOrPremium, ticketsController.addTicket);

//Read
router.get("/api/carts/:cid", auth.isUserOrPremium, cartsController.cartById);

//Update
router.put("/api/carts/:cid/product/:id", auth.isUserOrPremium, cartsController.updateCart);
router.put("/api/carts/:cid", auth.isUserOrPremium, cartsController.addToCart);

//Delete
router.delete("/api/carts/:cid/product/:pid", auth.isUserOrPremium, cartsController.deleteProduct);
router.delete("/api/carts/:cid", auth.isUserOrPremium, cartsController.emptyCart);

export default router;
