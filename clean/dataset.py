# import pandas as pd
# import os

# # Set file path to your new CSV
# file_path = r"E:\clothing-store\og\Fashion_Dataset.csv"

# # Output folder for category-wise data
# output_dir = r"E:\clothing_store\ogdata\categories"
# os.makedirs(output_dir, exist_ok=True)

# # Function to classify items into categories
# def detect_category(text):
#     text = str(text).lower()
#     if "shirt" in text: return "Shirts"
#     elif "t-shirt" in text: return "T-Shirts"
#     elif "jeans" in text: return "Jeans"
#     elif "saree" in text: return "Sarees"
#     elif "dress" in text: return "Dresses"
#     elif "kurti" in text: return "Kurtis"
#     elif "jacket" in text: return "Jackets"
#     elif "shorts" in text: return "Shorts"
#     elif "shoe" in text or "sneaker" in text: return "Footwear"
#     elif "watch" in text: return "Watches"
#     else: return "Others"

# # If the file is large, process in chunks
# chunk_size = 100_000
# category_data = {}

# print("🔄 Processing CSV in chunks...")

# for chunk in pd.read_csv(file_path, chunksize=chunk_size):
#     chunk['category'] = chunk['name'].apply(detect_category)

#     for category, group in chunk.groupby('category'):
#         if category not in category_data:
#             category_data[category] = []
#         category_data[category].append(group)

# # Save category-wise data
# print("💾 Saving category CSV files...")

# for category, frames in category_data.items():
#     category_df = pd.concat(frames)
#     output_path = os.path.join(output_dir, f"{category}.csv")
#     category_df.to_csv(output_path, index=False)
#     print(f"✅ Saved: {output_path}")

# print("🎉 Done! All categories exported.")

# import pandas as pd
# import os

# # Input folder containing category-wise CSV files
# category_folder = r"E:\Closet-Craft\ogdata\categories"
# output_base_folder = r"E:\Closet-Craft\ogdata\by_brand"
# os.makedirs(output_base_folder, exist_ok=True)

# # List all CSV files
# category_files = [f for f in os.listdir(category_folder) if f.endswith(".csv")]

# for file in category_files:
#     category_path = os.path.join(category_folder, file)
#     category_name = os.path.splitext(file)[0]  # 'Dresses', 'Jackets', etc.

#     print(f"\n📂 Processing category: {category_name}")

#     try:
#         df = pd.read_csv(category_path, encoding='utf-8', low_memory=False)
#     except Exception as e:
#         print(f"❌ Error reading {file}: {e}")
#         continue

#     # Check for brand column
#     if 'brand' not in df.columns:
#         print(f"⚠️ 'brand' column missing in {file} — skipping.")
#         continue

#     # Clean brand values
#     df['brand'] = df['brand'].astype(str).str.strip().str.lower()
#     df = df[df['brand'].notna() & (df['brand'] != '') & (df['brand'] != 'nan')]

#     # Create output folder for this category
#     category_output = os.path.join(output_base_folder, category_name)
#     os.makedirs(category_output, exist_ok=True)

#     # Group by brand and export each group
#     for brand, group in df.groupby('brand'):
#         if group.empty:
#             continue
#         safe_brand = brand.replace('/', '_').replace(' ', '_')
#         output_file = os.path.join(category_output, f"{safe_brand}.csv")
#         group.to_csv(output_file, index=False)
#         print(f"✅ {len(group)} items → {output_file}")

# print("\n🎉 DONE! All categories split by brand successfully.")
import pandas as pd
import os

# === CONFIG ===
category_folder = r"E:\clothing_store\ogdata\categories"     # Input: category-wise CSVs
output_base_folder = r"E:\clothing_storet\ogdata\by_brand"    # Output: brand-wise CSVs
os.makedirs(output_base_folder, exist_ok=True)

# List all CSV files in the category folder
category_files = [f for f in os.listdir(category_folder) if f.endswith(".csv")]

for file in category_files:
    category_path = os.path.join(category_folder, file)
    category_name = os.path.splitext(file)[0]  # e.g. "Dresses", "Jackets"

    print(f"\n📂 Processing category: {category_name}")

    try:
        df = pd.read_csv(category_path, encoding='utf-8', low_memory=False)
    except Exception as e:
        print(f"❌ Error reading {file}: {e}")
        continue

    # Ensure 'brand' column exists
    if 'brand' not in df.columns:
        print(f"⚠️ 'brand' column missing in {file} — skipping.")
        continue

    # Clean and normalize brand names
    df['brand'] = df['brand'].astype(str).str.strip().str.lower()
    df = df[df['brand'].notna() & (df['brand'] != '') & (df['brand'] != 'nan')]

    # Output folder per category
    category_output = os.path.join(output_base_folder, category_name)
    os.makedirs(category_output, exist_ok=True)

    # Split by brand and export
    for brand, group in df.groupby('brand'):
        if group.empty:
            continue
        safe_brand = brand.replace('/', '_').replace(' ', '_').replace('\\', '_')
        output_file = os.path.join(category_output, f"{safe_brand}.csv")
        group.to_csv(output_file, index=False)
        print(f"✅ {len(group)} items → {output_file}")

print("\n🎉 DONE! All categories split by brand successfully.")
