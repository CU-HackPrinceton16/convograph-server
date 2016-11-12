from personalSite import app
from flask import render_template

@app.route('/')
def index():
    #JLC since we are using template inheritance we must render the child template
    return render_template('index.html')

@app.route('/path1')
def projects():
    return render_template('path1.html')

@app.route('/path2')
def research():
    return render_template('path2.html')