import pandas as pd
import re
from collections import Counter
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data (only the first time)
nltk.download('punkt')
nltk.download('stopwords')

# Load your dataset
file_path = r"E:\clothing-store\og\Fashion_Dataset.csv"
df = pd.read_csv(file_path)

# Use the column that has product titles/names (adjust if needed)
if 'title' in df.columns:
    text_data = df['title'].dropna().astype(str)
elif 'name' in df.columns:
    text_data = df['name'].dropna().astype(str)
else:
    print("Could not find a 'title' or 'name' column in the CSV.")
    exit()

# Combine into one big string
text = ' '.join(text_data).lower()

# Tokenize
tokens = word_tokenize(text)

# Clean tokens: remove stopwords, punctuation, short words
stop_words = set(stopwords.words('english'))
tokens = [t for t in tokens if t.isalpha() and t not in stop_words and len(t) > 2]

# Count frequency
word_freq = Counter(tokens)

# Print top category-like words
print("\nTop 50 potential category keywords:\n")
for word, count in word_freq.most_common(50):
    print(f"{word}: {count}")
