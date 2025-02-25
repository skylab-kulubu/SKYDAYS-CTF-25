from flask import Flask, render_template, request, redirect, url_for, session, flash, render_template_string
import mysql.connector
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from markupsafe import escape
import os


DB_HOST = os.getenv("DB_HOST", "db")
DB_USER = os.getenv("DB_USER", "testuser")
DB_PASSWORD = os.getenv("DB_PASSWORD", "testpassword")
DB_NAME = os.getenv("DB_NAME", "test_db")

app = Flask(__name__)
app.secret_key = 'your_secret_key'
print(os.getcwd())

def get_db_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS Notes
                      (id INT AUTO_INCREMENT PRIMARY KEY, title TEXT, content TEXT, author TEXT, date_created DATETIME)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS Users
                      (id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(255) UNIQUE,
                       email VARCHAR(255) UNIQUE,
                       password TEXT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    cursor.close()
    conn.close()

init_db()

@app.route('/')
def index():
    if 'username' in session:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT id, title, date_created FROM Notes')
        notes = cursor.fetchall()
        cursor.close()
        conn.close()
        return render_template('index.html', notes=notes)
    return redirect(url_for('login'))

@app.route('/add', methods=['POST'])
def add_note():
    if 'username' in session:
        note = request.form.get('note')
        title = note
        author = session['username']
        date_created = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if note and author:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO Notes (title, content, author, date_created) VALUES (%s, %s, %s, %s)', (title, note, author, date_created))
            conn.commit()
            cursor.close()
            conn.close()
        return redirect(url_for('index'))
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO Users (username, email, password) VALUES (%s, %s, %s)',
                           (username, email, password))
            conn.commit()
            flash('Registration successful! Please login.', 'success')
        except mysql.connector.IntegrityError:
            flash('Username or email already exists.', 'danger')
        cursor.close()
        conn.close()
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT password FROM Users WHERE username = %s', (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
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
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT title, content, author, date_created FROM Notes WHERE id = %s', (note_id,))
        note = cursor.fetchone()
        cursor.close()
        conn.close()
        title = escape(note[0])
        note_text = note[1]
        author = escape(note[2])
        date = escape(note[3])
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
                    <p>{ note_text }</p>
                    <p><small>By { author } on { date }</small></p>
                </div>
            </body>
            </html>
        ''')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)