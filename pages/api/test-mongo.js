import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables!");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }); // 5s timeout
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("fashion_store");
    const blouseCollection = db.collection("blouse");

    const count = await blouseCollection.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (err) {
    console.error("MongoDB connection error:", err); // Logs in Vercel dashboard
    res.status(500).json({ success: false, error: err.message });
  }
}
