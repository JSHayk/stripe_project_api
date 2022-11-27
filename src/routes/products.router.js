import express from "express";
import productsController from "../controllers/products.controller.js";

const router = express();

// Get all products
router.get("/products", productsController.getProducts);
// Get specific product
router.get("/products/:id", productsController.getProduct);
// Add product
router.post("/products", productsController.addProduct);
// Delete product
router.delete("/products/:id", productsController.removeProduct);
// Edit product
router.put("/products/:id", productsController.editProduct);

// Buy product
router.post("/products/buy", productsController.buyProduct);

export default router;
