const express = require("express");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ General Middleware
app.use(cors());
app.use(helmet()); // Secure headers
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  // These options are deprecated and can be safely removed.
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use('/api/auth', authRoutes);

// ✅ GET: Products API
app.get("/api/category/:name", async (req, res, next) => {
  const collectionName = req.params.name;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const searchTerm = req.query.searchTerm;
  const selectedBrand = req.query.brand;
  const selectedColor = req.query.color;

  const skip = (page - 1) * limit;

  try {
    const collection = mongoose.connection.db.collection(collectionName);

    let filter = {};

    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (selectedBrand) {
      filter.brand = { $regex: selectedBrand.trim(), $options: 'i' };
    }

    if (selectedColor) {
      filter.colour = { $regex: selectedColor.trim(), $options: 'i' };
    }

    const data = await collection
      .find(filter)
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(filter);

    res.json({
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    // Pass the error to the next middleware (the global error handler)
    next(err);
  }
});

// ✅ GET: Clean Filter Options
app.get('/api/category/:categoryName/filters', async (req, res, next) => {
  const { categoryName } = req.params;

  try {
    const collection = mongoose.connection.db.collection(categoryName);

    const brandsResult = await collection.aggregate([
      { $project: { cleanedBrand: { $trim: { input: { $toLower: "$brand" } } } } },
      { $match: { cleanedBrand: { $nin: [null, "", "unknown", "n/a", "undefined"] } } },
      { $group: { _id: "$cleanedBrand" } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, brand: "$_id" } }
    ]).toArray();
    const brands = brandsResult.map(item => item.brand);

    const coloursResult = await collection.aggregate([
      { $project: { cleanedColour: { $trim: { input: { $toLower: "$colour" } } } } },
      { $match: { cleanedColour: { $nin: [null, "", "unknown", "n/a", "undefined"] } } },
      { $group: { _id: "$cleanedColour" } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, colour: "$_id" } }
    ]).toArray();
    const colours = coloursResult.map(item => item.colour);

    res.json({ brands, colours });

  } catch (error) {
    // Pass the error to the next middleware (the global error handler)
    next(error);
  }
});

// ✅ 404 handler - Must be placed AFTER all routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// ✅ Global error handler - Must be the LAST middleware
// It takes four arguments: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.stack); // Log the full stack trace for better debugging
  // If the response has already been sent, just call next
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: "Something went wrong" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});