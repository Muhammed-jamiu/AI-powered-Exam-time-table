from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError

from app.database.db import get_db
from app.database.models import ExamOfficer
from app.utils.jwt import verify_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = verify_token(token)

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    officer = (
        db.query(ExamOfficer)
        .filter(ExamOfficer.email == email)
        .first()
    )

    if officer is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return officer