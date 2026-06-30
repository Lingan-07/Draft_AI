from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_user_dashboard(
        db: Session,
        user_id: int,
    ):
        return DashboardRepository.get_user_dashboard(
            db,
            user_id,
        )

    @staticmethod
    def get_admin_dashboard(
        db: Session,
    ):
        return DashboardRepository.get_admin_dashboard(
            db,
        )