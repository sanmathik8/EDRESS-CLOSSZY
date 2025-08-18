const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array,
  totalAmount: Number,
  paymentStatus: { type: String, default: "pending" },
  shippingAddress: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
