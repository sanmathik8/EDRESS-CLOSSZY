const express = require("express");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

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

// Place order
router.post("/", verifyToken, async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  const order = await Order.create({
    userId: req.userId,
    items,
    totalAmount,
    shippingAddress,
    paymentStatus: "paid", // assume paid via frontend
  });

  res.json({ message: "Order placed", order });
});

// Get orders
router.get("/", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
