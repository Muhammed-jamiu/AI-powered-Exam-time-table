from pydantic import BaseModel


class VenueCreate(BaseModel):
    name: str
    capacity: int
    building: str
    status: str = "Available"


class VenueResponse(VenueCreate):
    id: int

    class Config:
        from_attributes = True