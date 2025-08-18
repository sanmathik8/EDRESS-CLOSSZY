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

# Output folder
output_folder = "E:/clothing-store/og/category_vocab"
os.makedirs(output_folder, exist_ok=True)

# Loop through categories
for category in final_categories:
    # Filter rows where name or description contains the category
    filtered = df[
        df["name"].str.contains(category, case=False, na=False) |
        df["description"].str.contains(category, case=False, na=False)
    ]

    if not filtered.empty:
        # Further split by brand
        grouped = filtered.groupby("brand")

        for brand, group_df in grouped:
            if pd.isna(brand) or brand.strip() == "":
                continue  # skip empty brand names

            clean_brand = brand.strip().replace(" ", "_").replace("/", "_")
            filename = f"{category}_{clean_brand}.csv"
            output_path = os.path.join(output_folder, filename)

            group_df[columns_to_keep].to_csv(output_path, index=False)
            print(f"✔ {filename} saved with {len(group_df)} rows")
    else:
        print(f"✘ No data found for: {category}")
