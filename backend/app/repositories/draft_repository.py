from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.draft import Draft


class DraftRepository:

    @staticmethod
    def create(
        db: Session,
        draft: Draft,
    ):
        db.add(draft)
        db.commit()
        db.refresh(draft)
        return draft

    @staticmethod
    def get_by_id(
        db: Session,
        draft_id: int,
    ):
        return (
            db.query(Draft)
            .filter(Draft.id == draft_id)
            .first()
        )

    @staticmethod
    def get_all_by_user(
        db: Session,
        user_id: int,
        search: str | None = None,
    ):
        query = (
            db.query(Draft)
            .filter(Draft.user_id == user_id)
        )

        if search:
            query = query.filter(
                or_(
                    Draft.title.ilike(f"%{search}%"),
                    Draft.tone.ilike(f"%{search}%"),
                    Draft.message_type.ilike(f"%{search}%"),
                )
            )

        return (
            query
            .order_by(Draft.created_at.desc())
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        draft: Draft,
    ):
        db.commit()
        db.refresh(draft)
        return draft

    @staticmethod
    def delete(
        db: Session,
        draft: Draft,
    ):
        db.delete(draft)
        db.commit()

    @staticmethod
    def save(
        db: Session,
        draft: Draft,
    ):
        db.commit()
        db.refresh(draft)
        return draft
    
    @staticmethod
    def get_by_id_and_user(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        return (
            db.query(Draft)
            .filter(
                Draft.id == draft_id,
                Draft.user_id == user_id,
            )
            .first()
        )