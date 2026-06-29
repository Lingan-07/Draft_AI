from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    TokenResponse,
)

from app.services.auth_service import AuthService
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

# Register

@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):
    return AuthService.register_user(
        db,
        request,
    )

# Login

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login_user(
        db,
        request,
    )

# Get Current User

@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return current_user