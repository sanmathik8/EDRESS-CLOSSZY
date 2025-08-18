const express = require("express");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Add to cart
router.post("/", verifyToken, async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;

  let cart = await Cart.findOne({ userId: req.userId });
  if (!cart) cart = await Cart.create({ userId: req.userId, items: [] });

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity, image });
  }

  await cart.save();
  res.json({ message: "Added to cart", cart });
});

// Get cart
router.get("/", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  res.json(cart || { items: [] });
});

// Remove item from cart
router.delete("/:productId", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId !== req.params.productId);
  await cart.save();
  res.json({ message: "Item removed", cart });
});

module.exports = router;
