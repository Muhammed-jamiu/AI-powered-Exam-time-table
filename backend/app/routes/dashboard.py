from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import (
    Course,
    Venue,
    Invigilator,
    Timetable
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard_summary(db: Session = Depends(get_db)):
    return {
        "total_courses": db.query(Course).count(),
        "total_venues": db.query(Venue).count(),
        "total_invigilators": db.query(Invigilator).count(),
        "total_exams": db.query(Timetable).count()
    }