import express from "express";
import cartsController from "../controllers/cartsController.js";
import ticketsController from "../controllers/ticketsController.js";
import auth from "../middlewares/auth.js";
import isUser from "../middlewares/isUser.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();
router.use(express.json());

//Create
router.post("/api/carts", auth, cartsController.addCart);
//cambiar a post
router.get("/api/carts/:cid/purchase", auth, isUser, ticketsController.addTicket);

//Read
router.get("/api/carts/:cid", auth, isUser, cartsController.cartById);

//Update
router.put("/api/carts/:cid/product/:id", auth, isUser, cartsController.updateCart);
router.put("/api/carts/:cid", isUser, cartsController.addToCart);

//Delete
router.delete("/api/carts/:cid/product/:pid", auth, isUser, cartsController.deleteProduct);
router.delete("/api/carts/:cid", auth, isUser, cartsController.emptyCart);

export default router;
