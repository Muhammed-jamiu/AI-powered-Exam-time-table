from pydantic import BaseModel


class InvigilatorCreate(BaseModel):
    name: str


class InvigilatorResponse(InvigilatorCreate):
    id: int

    class Config:
        from_attributes = True