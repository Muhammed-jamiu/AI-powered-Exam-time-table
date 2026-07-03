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


class Invigilator(Base):
    __tablename__ = "invigilators"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)

    course_id = Column(Integer, ForeignKey("courses.id"))

    exam_date = Column(String)
    exam_time = Column(String)

    venue_id = Column(Integer, ForeignKey("venues.id"))

    invigilator_id = Column(
        Integer,
        ForeignKey("invigilators.id")
    )
    status = Column(String, default="scheduled")