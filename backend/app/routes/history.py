from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import TimetableHistory

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history(db: Session = Depends(get_db)):
    return (
        db.query(TimetableHistory)
        .order_by(
            TimetableHistory.generated_at.desc()
        )
        .all()
    )