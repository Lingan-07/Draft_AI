from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import RegisterRequest
from app.utils.constants import USER_ROLE
from app.utils.password import hash_password

from app.schemas.auth import LoginRequest, TokenResponse
from app.utils.password import verify_password
from app.utils.jwt import create_access_token


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        request: RegisterRequest,
    ):
        existing_user = UserRepository.get_by_email(
            db,
            request.email,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        hashed_password = hash_password(
            request.password
        )

        user = User(
            name=request.name,
            email=request.email,
            password_hash=hashed_password,
            role=USER_ROLE,
        )

        return UserRepository.create(
            db,
            user,
        )

    @staticmethod
    def login_user(
        db: Session,
        request: LoginRequest,
    ):
        user = UserRepository.get_by_email(
            db,
            request.email,
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(
            request.password,
            user.password_hash,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        access_token = create_access_token(
            {
                "user_id": user.id,
                "email": user.email,
                "role": user.role,
            }
        )

        return TokenResponse(
            access_token=access_token
        )

    @staticmethod
    def get_current_user(user):
        return user