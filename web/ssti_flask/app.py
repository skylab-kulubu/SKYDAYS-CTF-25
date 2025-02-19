from flask import Flask, render_template, request, redirect, url_for, session, flash, render_template_string
import sqlite3
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from markupsafe import escape
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'
print(os.getcwd())

def init_db():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS Notes
                          (id INTEGER PRIMARY KEY, title TEXT, content TEXT, author TEXT, date_created TEXT)''')
        cursor.execute('''CREATE TABLE IF NOT EXISTS Users
                          (id INTEGER PRIMARY KEY, 
                           username TEXT UNIQUE, 
                           email TEXT UNIQUE, 
                           password TEXT, 
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        conn.commit()


init_db()



@app.route('/')
def index():
    if 'username' in session:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, title, date_created FROM Notes')
            notes = cursor.fetchall()
        return render_template('index.html', notes=notes)
    return redirect(url_for('login'))


@app.route('/add', methods=['POST'])
def add_note():
    if 'username' in session:
        note = request.form.get('note')
        # title = note[:15]  # Notun başlığı, notun içeriğinin ilk 15 karakteri olacak
        title = note
        author = session['username']
        date_created = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if note and author:
            with sqlite3.connect('database.db') as conn:
                cursor = conn.cursor()
                cursor.execute(
                    'INSERT INTO Notes (title, content, author, date_created) VALUES (?, ?, ?, ?)', (title, note, author, date_created))
                conn.commit()
        return redirect(url_for('index'))
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            try:
                cursor.execute('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
                               (username, email, password))
                conn.commit()
                flash('Registration successful! Please login.', 'success')
                return redirect(url_for('login'))
            except sqlite3.IntegrityError:
                flash('Username or email already exists.', 'danger')
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT password FROM Users WHERE username = ?', (username,))
            user = cursor.fetchone()
            if user and check_password_hash(user[0], password):
                session['username'] = username
                flash('Login successful!', 'success')
                return redirect(url_for('index'))
            flash('Invalid username or password.', 'danger')
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))


@app.route('/note/<int:note_id>')
def view_note(note_id):
    if 'username' in session:
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT title, content, author, date_created FROM Notes WHERE id = ?', (note_id,))
            note = cursor.fetchone()
        
        # SSTI açığı ekleniyor
        # user_input = request.args.get('user_input', '')
        title=escape(note[0])
        note_text=note[1]
        author=escape(note[2])
        date=escape(note[3])
        return render_template_string(f'''
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>{ title }</title>
                <link rel="stylesheet" href="{ url_for('static', filename='css/bootstrap.min.css') }">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="mb-4">{ title }</h1>
                    <p style="word-wrap: break-word; overflow-wrap: break-word;">{ note_text }</p>
                    <small class="text-muted">Author: { author } | Date: { date }</small>
                    <br>
                    <p>User Input: {note_text}</p>
                    <a href="{ url_for('index') }" class="btn btn-secondary mt-3">Back to Notes</a>
                </div>
                <script src="{ url_for('static', filename='js/bootstrap.bundle.js') }}}"></script>
            </body>
            </html>
        ''')
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5000)