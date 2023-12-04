from flask import Flask, render_template, request, flash, session, redirect, url_for, abort #Импортируем фласк и рендер шаблонов

app = Flask(__name__)
app.config['SECRET_KEY'] = 'пф'

menu = [{"name": "Домашняя страница", "url": "home.html"},
        {"name": "CowClicker",        "url": "cowclicker.html"},
        {"name": "Отзыв",             "url": "feedback.html"}]

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html', menu=menu) #все шаблоны по умолчанию берутся из templates/..

@app.route("/cowclicker")
def cowclicker():
    return render_template('cowclicker.html', menu=menu)

@app.route("/feedback")
def feedback():
    return render_template('feedback.html', menu=menu)

if __name__ == "__main__":
    app.run(debug=True)