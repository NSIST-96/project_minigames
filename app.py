from flask import Flask, render_template, request, flash, session, redirect, url_for, abort #Импортируем фласк и рендер шаблонов

app = Flask(__name__)
app.config['SECRET_KEY'] = 'пф'

menu = [{"name": "Домашняя страница", "url": "home.html"},
        {"name": "CowClicker",        "url": "cowclicker.html"}]

