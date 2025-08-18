import os
import pandas as pd
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")  # Use your MongoDB URI if remote
db = client["fashion_store"]

# Path to folder containing CSV files
input_folder = "E:/clothing-store/og/items"

# Loop through each CSV file
for file_name in os.listdir(input_folder):
    if file_name.endswith(".csv"):
        file_path = os.path.join(input_folder, file_name)
        
        # Extract collection name from filename (e.g. "saree" from "saree.csv")
        collection_name = os.path.splitext(file_name)[0].lower()
        collection = db[collection_name]

        # Optional: Clear collection before inserting
        collection.delete_many({})

        # Read CSV file
        df = pd.read_csv(file_path)

        # Insert if data exists
        if not df.empty:
            records = df.to_dict(orient="records")
            collection.insert_many(records)
            print(f"✅ Inserted {len(records)} records into collection: {collection_name}")
        else:
            print(f"⚠️  {file_name} is empty. Skipping.")

print("🎉 All category data inserted into separate MongoDB collections!")
