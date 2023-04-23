from flask import Flask, make_response, render_template, request
from messages import fetch_message

app = Flask(__name__, template_folder='templates')
app.secret_key = b'\xcdG\x8dI\xe1\xbdG\x9dMON\fK\xa3EY~/'

@app.route('/', methods=['GET'])
@app.route('/landing', methods=['GET'])
def landing():
    """Generates landing page"""

    html = render_template('landing.html')
    response = make_response(html)
    return response

@app.route('/selection', methods=['GET'])
def selection():
    """Generates selection page"""

    html = render_template('selection.html')
    response = make_response(html)
    return response

@app.route('/message', methods=['GET'])
def message():
    """Generates message page"""

    arg = request.args.get('arg')

    arg_to_image = {
        '1': './static/images/harvard.png',
        '2': './static/images/pizza.png',
        '3': './static/images/bulldog.png',
    }

    html = render_template('message.html',
                           msg="fetch_message()",
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
