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
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_courses = db.query(Course).count()

    total_venues = db.query(Venue).count()

    total_invigilators = db.query(
        Invigilator
    ).count()

    total_scheduled = db.query(
        Timetable
    ).count()

    return {
        "courses": total_courses,
        "venues": total_venues,
        "invigilators": total_invigilators,
        "scheduled_exams": total_scheduled
    }