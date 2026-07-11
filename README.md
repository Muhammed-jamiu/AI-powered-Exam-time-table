# 🎓 AI Exam Timetable Generation System

An AI-Powered web-based examination timetable generation system developed to automate the scheduling of examinations while minimizing conflicts in venues, invigilators, and examination periods.

The system enables examination officers to manage courses, venues, invigilators, generate examination timetables automatically, maintain timetable history, and export generated timetables as PDF and Excel documents.

---

## 📌 Project Overview

Preparing examination timetables manually is often time-consuming, error-prone, and difficult to manage, especially when dealing with multiple departments, courses, examination venues, and invigilators.

This project provides an intelligent scheduling solution that automatically allocates:

- Courses
- Examination venues
- Invigilators
- Examination dates
- Examination time slots

using predefined scheduling rules that simulate AI-powered timetable optimization.

---

# ✨ Features

### Authentication

- Exam Officer Registration
- Secure Login
- Logout Confirmation Modal

### Dashboard

- Dashboard Analytics
- Statistics Cards
- Navigation Sidebar
- Responsive Layout

### Course Management

- Add Course
- View Courses
- Search Courses
- Delete Course

### Venue Management

- Add Venue
- View Venues
- Search Venues
- Delete Venue

### Invigilator Management

- Add Invigilators
- Search Invigilators
- Delete Invigilators

### Automatic Timetable Generation

Automatically assigns:

- Courses
- Venues
- Invigilators
- Exam Days
- Time Slots

while considering venue capacity and invigilator allocation.

### Timetable History

Stores every generated timetable with:

- Department
- Semester
- Academic Session
- Total Exams
- Date Generated

Includes:

- View Export Menu
- Export PDF
- Export Excel
- Delete History

### Landing Page

- Hero Section
- Features Section
- Footer

---

# 🛠 Technology Stack

## Frontend

- React.js
- React Router DOM
- Bootstrap 5
- Axios
- React Icons

---

## Backend

- FastAPI
- SQLAlchemy ORM
- Pydantic
- Uvicorn

---

## Database

- SQLite

---

## Export Libraries

- ReportLab (PDF)
- OpenPyXL (Excel)

---

# 📁 Project Structure

```
AI-Exam-Time-Table
│
├── backend
│   ├── app
│   │
│   ├── database
│   ├── routes
│   ├── services
│   ├── schemas
│   └── main.py
│
├── frontend
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── layout
│   ├── api
│   └── assets
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Muhammed-jamiu/AI-powered-Exam-time-table.git
```

---

## Backend Setup

Navigate into backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

```
POST /signup
POST /login
```

---

## Courses

```
GET /courses
POST /courses
DELETE /courses/{id}
```

---

## Venues

```
GET /venues
POST /venues
DELETE /venues/{id}
```

---

## Invigilators

```
GET /invigilators
POST /invigilators
DELETE /invigilators/{id}
```

---

## Timetable

```
POST /timetable/generate
GET /timetable
DELETE /timetable/clear
```

---

## History

```
GET /history
DELETE /history/{id}
GET /history/{id}/pdf
GET /history/{id}/excel
```

---

# Scheduling Logic

The timetable generator automatically:

- Reads all available courses.
- Sorts venues by seating capacity.
- Assigns examination venues.
- Assigns available invigilators.
- Allocates examination days.
- Allocates examination time slots.
- Stores generated timetable.
- Saves timetable history.

AI-Powered scheduling process by automatically selecting the most suitable allocation based on predefined constraints.

---

# Screenshots

# Author

Abdulsalam Muhammed Jamiu{Jamoskeydev}

Frontend Developer && Backend Developer

GitHub:https://github.com/Muhammed-jamiu

LinkedIn:
https://www.linkedin.com/in/muhammedjamiuanate

Portfolio:https://app.netlify.com/projects/jamoskeydev-portfolio/

---
