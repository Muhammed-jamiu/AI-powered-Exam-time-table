from pydantic import BaseModel

class InvigilatorCreate(BaseModel):
    staff_id: str
    name: str
    department: str
    phone: str
    status: str


class InvigilatorResponse(BaseModel):
    id: int
    staff_id: str
    name: str
    department: str
    phone: str
    status: str

    class Config:
        from_attributes = True