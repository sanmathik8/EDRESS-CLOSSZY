import os
import pandas as pd

# Path to your dataset
dataset_path = "E:/clothing-store/og/Fashion_Dataset.csv"

# Load dataset
df = pd.read_csv(dataset_path)

# Columns to keep
columns_to_keep = [
    "p_id", "name", "price", "colour", "brand", "img",
    "ratingCount", "avg_rating", "description", "p_attributes"
]

# Cleaned categories
final_categories = [
    "women", "printed", "solid", "dupatta", "top", "cotton", "embroidered",
    "trousers", "unstitched", "jeans", "floral", "saree", "lehenga", "jacket",
    "skirt", "kurta", "ethnic", "blouse", "jumpsuit", "motifs", "dress",
    "palazzos", "silk", "shorts", "sweatshirt", "crop"
]

# Output folder (single folder)
output_folder = "E:/clothing-store/og/items"
os.makedirs(output_folder, exist_ok=True)

# Filter and save CSVs for each category
for category in final_categories:
    filtered = df[
        df["name"].str.contains(category, case=False, na=False) |
        df["description"].str.contains(category, case=False, na=False)
    ]

    if not filtered.empty:
        filtered = filtered[columns_to_keep]
        output_path = os.path.join(output_folder, f"{category}.csv")
        filtered.to_csv(output_path, index=False)
        print(f"✔ {category}.csv saved with {len(filtered)} rows")
    else:
        print(f"✘ No data found for: {category}")
