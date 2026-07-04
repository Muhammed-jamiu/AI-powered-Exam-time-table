from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Course
from app.schemas.course import (
    CourseCreate,
    CourseResponse
)

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.post(
    "/",
    response_model=CourseResponse
)
def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db)
):
    new_course = Course(
        course_code=course.course_code,
        course_title=course.course_title,
        department=course.department,
        level=course.level,
        semester=course.semester,
        student_count=course.student_count
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


@router.get(
    "/",
    response_model=list[CourseResponse]
)
def get_courses(
    db: Session = Depends(get_db)
):
    return db.query(Course).all()