from sqlalchemy.orm import Session

from app.models.message_template import MessageTemplate


class TemplateRepository:

    @staticmethod
    def create(
        db: Session,
        template: MessageTemplate,
    ):
        db.add(template)
        db.commit()
        db.refresh(template)
        return template

    @staticmethod
    def get_all(
        db: Session,
    ):
        return (
            db.query(MessageTemplate)
            .order_by(MessageTemplate.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        template_id: int,
    ):
        return (
            db.query(MessageTemplate)
            .filter(MessageTemplate.id == template_id)
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        template: MessageTemplate,
    ):
        db.commit()
        db.refresh(template)
        return template

    @staticmethod
    def delete(
        db: Session,
        template: MessageTemplate,
    ):
        db.delete(template)
        db.commit()