# B1 Zertifikat Deutsch Training Web Application

Memorize the words from [Goethe-Zertifikat B1 Wortliste](https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_B1_Wortliste.pdf) in the amount recommended for obtaining a [Goethe-Zertifikat B1](https://www.goethe.de/de/spr/kup/prf/prf/gb1/inf.html).

## Getting started

### Install Back End

1. Clone repository

```
git clone https://github.com/andreylarionovdev/wortliste.git && cd wortliste
```

2. Create environment

```
python3 -m venv venv
```

3. Activate environment

```
source venv/bin/activate
```

4. Install `pip` packages

```
pip install -r requirements.txt
```

5. Apply DB migrations

```
cd wortlist && python manage.py migrate
```

### Install Front End

1. Install `npm` packages

```
cd frontend && npm i
```

2. Build frontend

```
npm run build
```

### Run Server

```
cd .. && python manage.py runserver
```

## Built with

* [Django](https://www.djangoproject.com/)
* [Django REST framework](https://www.django-rest-framework.org/)
* [SQLite](https://www.sqlite.org/index.html)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)


