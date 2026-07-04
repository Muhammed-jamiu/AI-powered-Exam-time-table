from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import Invigilator

from app.schemas.invigilator import (
    InvigilatorCreate,
    InvigilatorResponse
)

router = APIRouter(
    prefix="/invigilators",
    tags=["Invigilators"]
)


@router.post(
    "/",
    response_model=InvigilatorResponse
)
def create_invigilator(
    invigilator: InvigilatorCreate,
    db: Session = Depends(get_db)
):
    new_invigilator = Invigilator(
        staff_id=invigilator.staff_id,
        name=invigilator.name,
        department=invigilator.department,
        phone=invigilator.phone,
        email=invigilator.email,
        status=invigilator.status
    )

    db.add(new_invigilator)
    db.commit()
    db.refresh(new_invigilator)

    return new_invigilator


@router.get(
    "/",
    response_model=list[InvigilatorResponse]
)
def get_invigilators(
    db: Session = Depends(get_db)
):
    return db.query(
        Invigilator
    ).all()