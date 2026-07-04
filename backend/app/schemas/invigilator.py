from pydantic import BaseModel


class InvigilatorCreate(BaseModel):
    staff_id: str
    name: str
    department: str
    phone: str
    email: str
    status: str = "Available"


class InvigilatorResponse(
    InvigilatorCreate
):
    id: int

    class Config:
        from_attributes = True