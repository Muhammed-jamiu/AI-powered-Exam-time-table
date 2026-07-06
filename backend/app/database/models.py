from sqlalchemy import Column, Integer, String, ForeignKey
from .db import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)

    course_code = Column(String, unique=True)
    course_title = Column(String)

    department = Column(String)
    level = Column(String)

    semester = Column(String)

    student_count = Column(Integer)


class Venue(Base):
    __tablename__ = "venues"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    capacity = Column(Integer)

    building = Column(String)

    status = Column(String, default="Available")


class Invigilator(Base):
    __tablename__ = "invigilators"

    id = Column(Integer, primary_key=True, index=True)

    staff_id = Column(String, unique=True)

    name = Column(String)

    department = Column(String)

    phone = Column(String)

    status = Column(
        String,
        default="Available"
    )


class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    venue_id = Column(
        Integer,
        ForeignKey("venues.id")
    )

    invigilator_id = Column(
        Integer,
        ForeignKey("invigilators.id")
    )

    allocated_students = Column(Integer)

    exam_day = Column(String)

    exam_time = Column(String)

    status = Column(
        String,
        default="Scheduled"
    )