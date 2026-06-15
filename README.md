# Task Manager Application

A full-stack task management application built with Django, React, and SQLite.

## Tech Stack

- **Frontend**: React (TypeScript), Vite, React Router, React Toastify
- **Backend**: Django & Django REST Framework
- **Database**: SQLite
- **Runtime**: Node.js & Python

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:8000/api` for the backend.

## Features

- User registration and authentication
- Create, edit, delete tasks and lists
- Task deadlines and completion tracking
- Responsive design for mobile and desktop
- Toast notifications
- Theme customization (Light/Dark)
- 30-day auto-deletion for completed tasks
