import os
import pandas as pd
from pymongo import MongoClient

# === CONFIG ===
mongo_uri = "mongodb://localhost:27017"  # Change if using Atlas
db_name = "closet_craft"
base_folder = r"E:\Closet-Craft\ogdata\by_brand"

client = MongoClient(mongo_uri)
db = client[db_name]

# Loop through all categories
for category in os.listdir(base_folder):
    category_path = os.path.join(base_folder, category)
    if not os.path.isdir(category_path):
        continue

    print(f"\n📁 Category: {category}")

    # Loop through each brand CSV in that category
    for file in os.listdir(category_path):
        if not file.endswith(".csv"):
            continue

        file_path = os.path.join(category_path, file)
        brand = os.path.splitext(file)[0]

        # Load CSV into DataFrame
        try:
            df = pd.read_csv(file_path)
        except Exception as e:
            print(f"❌ Failed to read {file}: {e}")
            continue

        if df.empty:
            print(f"⚠️ Empty file: {file}")
            continue

        # Add category and brand fields to each row
        df['category'] = category.lower()
        df['brand'] = brand.lower()

        # Insert into MongoDB
        collection = db["products"]
        data_dict = df.to_dict(orient="records")

        if data_dict:
            result = collection.insert_many(data_dict)
            print(f"✅ Inserted {len(result.inserted_ids)} from {file}")

print("\n🎉 DONE: All CSVs imported to MongoDB!")
