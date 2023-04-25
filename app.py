from flask import Flask, make_response, render_template, request
from messages import fetch_message
import random

app = Flask(__name__, template_folder='templates')
app.secret_key = b'\xcdG\x8dI\xe1\xbdG\x9dMON\fK\xa3EY~/'

# randomly choose what stickers to use
def choose_stickers():
    stickers = { "puppy": './static/images/puppy.png', 
            "pizza": './static/images/pizza.png',
            "bulldog" : './static/images/bulldog.png',
            "harvard" : './static/images/harvard.png',
            "cowboy" : './static/images/cowboy.png',
            "golf" : './static/images/golf.png',
            "dachi" : './static/images/dachi.png'
            }

    chosen_stickers = random.sample(list(stickers.values()), 3)
    print(chosen_stickers)
    return chosen_stickers

STICKERS = ""

@app.route('/', methods=['GET'])
@app.route('/landing', methods=['GET'])
def landing():
    """Generates landing page"""

    html = render_template('landing.html')
    response = make_response(html)
    return response

@app.route('/selection', methods=['GET'])
def selection():
    global STICKERS
    STICKERS = choose_stickers()
    """Generates selection page"""
    arg = request.args.get('arg')

    arg_to_image = {
        '1': STICKERS[0],
        '2': STICKERS[1],
        '3': STICKERS[2],
    }

    html = render_template('selection.html',
                           sticker1=arg_to_image['1'],
                           sticker2=arg_to_image['2'],
                           sticker3=arg_to_image['3'])
    response = make_response(html)
    return response

@app.route('/message', methods=['GET'])
def message():
    """Generates message page"""
    arg = request.args.get('arg')

    arg_to_image = {
        '1': STICKERS[0],
        '2': STICKERS[1],
        '3': STICKERS[2],
    }

    html = render_template('message.html',
                           msg=fetch_message(),
                           sticker=arg_to_image[arg]
                           )
    response = make_response(html)
    return response

@app.route('/create', methods=['GET'])
def create():
    """Generates create page"""

    html = render_template('create.html')
    response = make_response(html)
    return response