import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import contractions
from nltk.stem import WordNetLemmatizer
import pickle
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class article(BaseModel):
    text: str

vectorizer = pickle.load(open('Training/vectorizer.pkl', 'rb'))
transformer = pickle.load(open('Training/transformer.pkl', 'rb'))
model = pickle.load(open('Training/dt.pkl', 'rb'))

@app.post("/")
async def classify(input: article):
    
    text = re.sub(r'http\S+', '', str(input.text))
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'<.*>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    words = word_tokenize(text)
    english_stopwords = set(stopwords.words('english'))
    filtered_words = []
    for word in words:
        if word.lower() not in english_stopwords:
            filtered_words.append(word)
    text = ' '.join(filtered_words)
    text = text.lower()
    text = contractions.fix(text)
    text_tokenized = []
    words = word_tokenize(text)
    lemmatizer = WordNetLemmatizer()
    for word in words:
        text_tokenized.append(lemmatizer.lemmatize(word))
    text = ' '.join(text_tokenized)
    text = [text]

    counts = vectorizer.transform(text)
    tfidf = transformer.transform(counts)

    prediction = model.predict(tfidf)

    return {"prediction": str(prediction[0])}