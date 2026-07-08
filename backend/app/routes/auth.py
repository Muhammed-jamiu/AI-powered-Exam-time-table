from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import ExamOfficer
from app.utils.dependencies import get_current_user

from app.schemas.auth import (
    SignupRequest,
    LoginRequest,
    OfficerResponse,
    TokenResponse,
)

from app.utils.password import (
    hash_password,
    verify_password,
)

from app.utils.jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================
# SIGN UP
# ==========================

@router.post(
    "/signup",
    response_model=OfficerResponse
)
def signup(
    officer: SignupRequest,
    db: Session = Depends(get_db)
):

    existing_email = (
        db.query(ExamOfficer)
        .filter(
            ExamOfficer.email == officer.email
        )
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_employee = (
        db.query(ExamOfficer)
        .filter(
            ExamOfficer.employee_id == officer.employee_id
        )
        .first()
    )

    if existing_employee:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists"
        )

    new_officer = ExamOfficer(
        full_name=officer.full_name,
        employee_id=officer.employee_id,
        email=officer.email,
        phone=officer.phone,
        password=hash_password(officer.password),
    )

    db.add(new_officer)
    db.commit()
    db.refresh(new_officer)

    return new_officer


# ==========================
# LOGIN
# ==========================

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    officer: LoginRequest,
    db: Session = Depends(get_db)
):

    existing_officer = (
        db.query(ExamOfficer)
        .filter(
            ExamOfficer.email == officer.email
        )
        .first()
    )

    if not existing_officer:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        officer.password,
        existing_officer.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": existing_officer.email,
            "id": existing_officer.id,
            "role": existing_officer.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ==========================
# CURRENT USER
# ==========================

@router.get(
    "/me",
    response_model=OfficerResponse
)
def get_me(
    current_user: ExamOfficer = Depends(get_current_user)
):
    return current_user