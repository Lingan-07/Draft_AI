from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import security
from app.repositories.user_repository import UserRepository
from app.utils.jwt import verify_access_token


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    user = UserRepository.get_by_id(
        db,
        payload["user_id"],
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user