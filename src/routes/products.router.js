import express from "express";
import auth from "../middlewares/auth.js";
import productsController from "../controllers/productsController.js";

const router = express.Router();
router.use(express.json());

router.post("/api/products", auth.isAdminOrPremium, productsController.addProduct);

router.get("/api/products", auth.isAdmin, productsController.getProducts);
router.get("/api/products/:id", auth.auth, productsController.getProductById);

router.put("/api/products/:id", auth.isAdminOrPremium, productsController.updateProduct);

router.delete("/api/products/:id", auth.isAdminOrPremium, productsController.deleteProduct);

// eliminar del proyecto
router.get("/crearproductos", auth.isAdminOrPremium, productsController.crear);

export default router;
