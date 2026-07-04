from pydantic import BaseModel


class TimetableResponse(BaseModel):
    id: int
    course_id: int
    venue_id: int
    invigilator_id: int

    allocated_students: int

    exam_day: str
    exam_time: str

    status: str

    class Config:
        from_attributes = True