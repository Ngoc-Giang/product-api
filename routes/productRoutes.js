const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// POST - Create Product
router.post("/", async (req, res) => {
    try {
        const { pid, pname, price, quantity } = req.body;

        const product = new Product({
            pid,
            pname,
            price,
            quantity
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
});

// GET - Get all Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error getting products",
            error: error.message
        });
    }
});

// GET - Get Product by PID
router.get("/:pid", async (req, res) => {
    try {
        const product = await Product.findOne({
            pid: req.params.pid
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error getting product",
            error: error.message
        });
    }
});

// PUT - Update Product
router.put("/:pid", async (req, res) => {
    try {
        const { pname, price, quantity } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            {
                pname,
                price,
                quantity
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }
});

// DELETE - Delete Product
router.delete("/:pid", async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            pid: req.params.pid
        });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
});

module.exports = router;