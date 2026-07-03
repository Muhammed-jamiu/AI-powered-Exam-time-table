from fastapi import FastAPI

from app.database.db import engine
from app.database.models import Base


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Exam Timetable System",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Exam Timetable API is running"
    }