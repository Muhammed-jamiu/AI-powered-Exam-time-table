from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Venue
from app.schemas.venue import (
    VenueCreate,
    VenueResponse
)

router = APIRouter(
    prefix="/venues",
    tags=["Venues"]
)


@router.post(
    "/",
    response_model=VenueResponse
)
def create_venue(
    venue: VenueCreate,
    db: Session = Depends(get_db)
):
    new_venue = Venue(
        name=venue.name,
        capacity=venue.capacity,
        building=venue.building,
        status=venue.status
    )

    db.add(new_venue)
    db.commit()
    db.refresh(new_venue)

    return new_venue


@router.get(
    "/",
    response_model=list[VenueResponse]
)
def get_venues(
    db: Session = Depends(get_db)
):
    return db.query(Venue).all()

@router.delete("/{venue_id}")
def delete_venue(
    venue_id: int,
    db: Session = Depends(get_db)
):
    venue = (
        db.query(Venue)
        .filter(Venue.id == venue_id)
        .first()
    )

    if not venue:
        return {
            "message": "Venue not found"
        }

    db.delete(venue)
    db.commit()

    return {
        "message":
            "Venue deleted successfully"
    }