from personalSite import app
from flask import render_template

@app.route('/')
def index():
    #JLC since we are using template inheritance we must render the child template
    return render_template('index.html')

@app.route('/path1')
def path1():
    return render_template('path1.html')

@app.route('/path2')
def path2():
    return render_template('path2.html')

@app.route('/post', methods=['POST'])
def post():
    sample = request.form['sample']
    open('sample.wav', 'w').write(sample)
