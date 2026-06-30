from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import get_current_user
from app.dependencies.admin import get_current_admin

from app.models.user import User

from app.schemas.dashboard import (
    UserDashboardResponse,
    AdminDashboardResponse,
)

from app.services.dashboard_service import DashboardService


router = APIRouter(
    tags=["Dashboard"],
)


@router.get(
    "/dashboard",
    response_model=UserDashboardResponse,
)
def get_user_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_user_dashboard(
        db,
        current_user.id,
    )


@router.get(
    "/admin/dashboard",
    response_model=AdminDashboardResponse,
)
def get_admin_dashboard(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return DashboardService.get_admin_dashboard(
        db,
    )