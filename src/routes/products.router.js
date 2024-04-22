import express from "express";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import productsController from "../controllers/productsController.js";

const router = express.Router();
router.use(express.json());

router.post("/api/products", auth, isAdmin, productsController.addProduct);

router.get("/api/products", auth, isAdmin, productsController.getProducts);
router.get("/api/products/:id", auth, isAdmin, productsController.getProductById);

router.put("/api/products/:id", auth, isAdmin, productsController.updateProduct);

router.delete("/api/products/:id", auth, isAdmin, productsController.deleteProduct);

export default router;
