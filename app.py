from flask import Flask, render_template, request, flash, session, redirect, url_for, abort #Импортируем фласк и рендер шаблонов

app = Flask(__name__)
app.config['SECRET_KEY'] = 'пф'

menu = [{"name": "Домашняя страница", "url": "home"},
        {"name": "CowClicker",        "url": "cowclicker"},
        {"name": "Отзыв",             "url": "feedback"}]

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

@app.errorhandler(404)
def pageNotFount(error):
    return render_template('page404.html', title = "Старинца не найдена", menu=menu)

if __name__ == "__main__":
    app.run(debug=True)