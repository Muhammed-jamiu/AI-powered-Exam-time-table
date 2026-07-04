from pydantic import BaseModel


class CourseCreate(BaseModel):
    course_code: str
    course_title: str
    department: str
    level: str
    semester: str
    student_count: int


class CourseResponse(CourseCreate):
    id: int

    class Config:
        from_attributes = True