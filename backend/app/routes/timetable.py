from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.scheduler import (
    generate_exam_timetable
)

from app.database.models import (
    Timetable,
    Course,
    Venue,
    Invigilator
)

router = APIRouter(
    prefix="/timetable",
    tags=["Timetable"]
)


@router.post("/generate")
def generate(db: Session = Depends(get_db)):

    data = generate_exam_timetable(db)

    return {
        "message": "Timetable generated successfully",
        "records": len(data)
    }


@router.get("/")
def get_timetable(
    db: Session = Depends(get_db)
):

    timetable = (
        db.query(
            Timetable,
            Course,
            Venue,
            Invigilator
        )
        .join(
            Course,
            Timetable.course_id == Course.id
        )
        .join(
            Venue,
            Timetable.venue_id == Venue.id
        )
        .join(
            Invigilator,
            Timetable.invigilator_id == Invigilator.id
        )
        .all()
    )

    result = []

    for t, c, v, i in timetable:

        result.append({
            "course_code": c.course_code,
            "course_title": c.course_title,
            "department": c.department,
            "level": c.level,

            "venue": v.name,
            "venue_capacity": v.capacity,

            "invigilator": i.name,

            "allocated_students":
                t.allocated_students,

            "exam_day":
                t.exam_day,

            "exam_time":
                t.exam_time,

            "status":
                t.status
        })

    return result

@router.delete("/clear")
def clear_timetable(
    db: Session = Depends(get_db)
):

    deleted = db.query(Timetable).delete()

    db.commit()

    return {
        "message": "Timetable cleared successfully",
        "deleted_records": deleted
    }