from sqlalchemy.orm import Session

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
    ):
        return (
            db.query(Draft)
            .filter(Draft.user_id == user_id)
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