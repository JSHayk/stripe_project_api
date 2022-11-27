import express from "express";
// Routes
import productsRouter from "./products.router.js";

const router = express(); // The Main router
// Switching all routes
router.use(productsRouter);

export default router;
