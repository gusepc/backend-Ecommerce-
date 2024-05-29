import express from "express";
import cartsController from "../controllers/cartsController.js";
import ticketsController from "../controllers/ticketsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.use(express.json());

//Create
router.post("/api/carts", auth.isAdmin, cartsController.addCart);
router.post("/api/carts/:cid/purchase", auth.isUserOrPremium, ticketsController.addTicket);

//Read ?? cambiar autorizacio a userOrPremium despues de la entrefa
router.get("/api/carts/:cid", auth.auth, cartsController.cartById);

//Update ?? cambiar autorizacio a userOrPremium despues de la entrefa
router.put("/api/carts/:cid/product/:id", auth.auth, cartsController.updateCart);
router.put("/api/carts/:cid", auth.auth, cartsController.addToCart);

//Delete ?? cambiar autorizacio a userOrPremium despues de la entrefa
router.delete("/api/carts/:cid/product/:pid", auth.auth, cartsController.deleteProduct);
router.delete("/api/carts/:cid", auth.auth, cartsController.emptyCart);

export default router;
