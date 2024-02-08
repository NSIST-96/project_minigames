from flask import Flask, render_template, request, flash, session, redirect, url_for, abort #Импортируем фласк и рендер шаблонов
from flask_socketio import SocketIO, send
import database.database

app = Flask(__name__)
app.config['SECRET_KEY'] = 'пф'
socketio = SocketIO(app, cors_allowed_origins="*")

menu = [{"name": "Домашняя страница", "url": "home"},
        {"name": "Игры",              "url": "games"},
        {"name": "О нас",             "url": "about"},
        {"name": "Отзыв",             "url": "feedback"},
        {"name": "Чат",               "url": "chat"},
        {"name": "Профиль",           "url": "profile"}]


### - TopMenu - ###
@app.route("/")
@app.route("/home")
def home():
        return render_template('/menu/home.html', menu=menu) #все шаблоны по умолчанию берутся из templates/..

@app.route("/games")
def games():
       return render_template('/menu/games.html', menu=menu)


@app.route("/about")
def about():
        return render_template('/menu/about.html', menu=menu)

@app.route("/feedback", methods=["POST", "GET"])
def feedback():
        if request.method == "POST":
                if len(request.form['username']) > 2:
                        flash('Сообщение отправено', category='success')
                else:
                        flash('Ошибка отправки', category='error')
        return render_template('/menu/feedback.html',Title = "Обратная связь", menu=menu)
### - End TopMenu - ###

### - Games - ###
@app.route("/snake")
def snake():
        return render_template('/games/snake.html', menu=menu)

@app.route("/tetris")
def tetris():
        return render_template('/games/tetris.html', menu=menu)

@app.route("/clicker")
def clicker():
        return render_template('/games/clicker.html', menu=menu)

@app.route("/labirint")
def labirint():
        return render_template('/games/labirint.html', menu=menu)
### - End Games - ###

@app.route("/profile")
def profile():
        if (True):
                return render_template('login.html', menu=menu)
        else:
                return render_template('/menu/profile.html', menu=menu)

@app.route('/login',methods=["POST", "GET"])
def login():
    if 'userLogged' in session:
        return redirect(url_for('profile', username=session['userLogged']))
    elif request.method == "POST" and request.form['username'] == "selfedu" and request.form['psw'] == "123":
        session['userLogged'] = request.form['username']
        return redirect(url_for('profile', username=session['userLogged']))
    return render_template('login.html', title="Авторизация", menu=menu)

@app.errorhandler(404)
def pageNotFount(error):
        return render_template('page404.html', title = "Старинца не найдена", menu=menu)

@socketio.on('message')
def handle_message(message):
       print("Received message: " + message)
       if message != "User connected!":
              send(message, broadcast = True)

@app.route('/chat')
def chat():
       return render_template('/menu/chat.html', menu=menu)

if __name__ == "__main__":
        app.run(debug=True)