from pydantic import BaseModel
from datetime import datetime


class HistoryResponse(BaseModel):
    id: int
    department: str
    semester: str
    session: str
    total_exams: int
    generated_at: datetime

    class Config:
        from_attributes = True