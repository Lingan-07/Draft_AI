from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.draft import Draft
from app.models.ai_generation_log import AIGenerationLog
from app.models.message_template import MessageTemplate


class DashboardRepository:

    @staticmethod
    def get_user_dashboard(
        db: Session,
        user_id: int,
    ):
        total_drafts = (
            db.query(func.count(Draft.id))
            .filter(Draft.user_id == user_id)
            .scalar()
        )

        generated_drafts = (
            db.query(func.count(Draft.id))
            .filter(
                Draft.user_id == user_id,
                Draft.status == "GENERATED",
            )
            .scalar()
        )

        templates_available = (
            db.query(func.count(MessageTemplate.id))
            .filter(MessageTemplate.is_active == True)
            .scalar()
        )

        ai_generations = (
            db.query(func.count(AIGenerationLog.id))
            .filter(AIGenerationLog.user_id == user_id)
            .scalar()
        )

        return {
            "total_drafts": total_drafts,
            "generated_drafts": generated_drafts,
            "templates_available": templates_available,
            "ai_generations": ai_generations,
        }

    @staticmethod
    def get_admin_dashboard(
        db: Session,
    ):
        total_users = (
            db.query(func.count(User.id))
            .scalar()
        )

        total_drafts = (
            db.query(func.count(Draft.id))
            .scalar()
        )

        total_ai_generations = (
            db.query(func.count(AIGenerationLog.id))
            .scalar()
        )

        active_templates = (
            db.query(func.count(MessageTemplate.id))
            .filter(MessageTemplate.is_active == True)
            .scalar()
        )

        return {
            "total_users": total_users,
            "total_drafts": total_drafts,
            "total_ai_generations": total_ai_generations,
            "active_templates": active_templates,
        }