from sqlalchemy.orm import Session

from app.models.ai_generation_log import AIGenerationLog


class AIGenerationLogRepository:

    @staticmethod
    def create(
        db: Session,
        log: AIGenerationLog,
    ):
        db.add(log)
        db.commit()
        db.refresh(log)
        return log

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(AIGenerationLog)
            .filter(AIGenerationLog.user_id == user_id)
            .order_by(AIGenerationLog.created_at.desc())
            .all()
        )