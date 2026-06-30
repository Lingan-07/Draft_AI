from sqlalchemy.orm import Session

from app.models.draft_version import DraftVersion


class DraftVersionRepository:

    @staticmethod
    def create(
        db: Session,
        version: DraftVersion,
    ):
        db.add(version)
        db.commit()
        db.refresh(version)
        return version

    @staticmethod
    def get_by_draft(
        db: Session,
        draft_id: int,
    ):
        return (
            db.query(DraftVersion)
            .filter(DraftVersion.draft_id == draft_id)
            .order_by(DraftVersion.version_no.desc())
            .all()
        )

    @staticmethod
    def get_latest_version(
        db: Session,
        draft_id: int,
    ):
        return (
            db.query(DraftVersion)
            .filter(DraftVersion.draft_id == draft_id)
            .order_by(DraftVersion.version_no.desc())
            .first()
        )