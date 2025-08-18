import nltk
nltk.download('punkt', download_dir='E:/nltk_data')
nltk.download('stopwords', download_dir='E:/nltk_data')

# Use E drive only
nltk.data.path.append('E:/nltk_data')

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Example usage
text = "This is a test for category extraction like sarees, lehenga, and shrug."
tokens = word_tokenize(text.lower())
filtered = [t for t in tokens if t.isalpha() and t not in stopwords.words('english')]

print(filtered)
