import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import contractions
from nltk.stem import WordNetLemmatizer
import pickle
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder='Webapp')
vectorizer = pickle.load(open('Training/vectorizer.pkl', 'rb'))
transformer = pickle.load(open('Training/transformer.pkl', 'rb'))
model = pickle.load(open('Training/dt.pkl', 'rb'))


@app.route('/')
def home():
    return render_template('/index.html')

@app.route('/predict',methods=['POST'])
def predict():
    
    text = request.form.values()
    text = re.sub(r'http\S+', '', str(text))
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

    article = vectorizer.transform(text)
    tfidf = transformer.transform(article)

    prediction = model.predict(tfidf)

    return render_template('index.html', prediction_text='result: {}'.format(prediction[0]))


if __name__ == "__main__":
    app.run(debug=True)