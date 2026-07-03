from pydantic import BaseModel


class VenueCreate(BaseModel):
    name: str
    capacity: int


class VenueResponse(VenueCreate):
    id: int

    class Config:
        from_attributes = True