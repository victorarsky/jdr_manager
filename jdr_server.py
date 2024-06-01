from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Hubert')
def Hubert():
    return render_template('Hubert.html')

@app.route('/Giras')
def Giras():
    return render_template('Giras.html')

@app.route('/page3')
def page3():
    return render_template('page3.html')

@app.route('/page4')
def page4():
    return render_template('page4.html')

@app.route('/page5')
def page5():
    return render_template('page5.html')

@app.route('/page6')
def page6():
    return render_template('page6.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
