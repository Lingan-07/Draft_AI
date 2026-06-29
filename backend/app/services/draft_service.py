from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.draft import Draft
from app.repositories.draft_repository import DraftRepository
from app.schemas.draft import (
    DraftCreateRequest,
    DraftUpdateRequest,
)
from app.utils.constants import DRAFT

class DraftService:

    @staticmethod
    def create_draft(
        db: Session,
        request: DraftCreateRequest,
        user_id: int,
    ):
        draft = Draft(
            user_id=user_id,
            title=request.title,
            message_type=request.message_type,
            tone=request.tone,
            rough_points=request.rough_points,
            status=DRAFT,
        )

        return DraftRepository.create(
            db,
            draft,
        )
    
    
    @staticmethod
    def get_all_drafts(
        db: Session,
        user_id: int,
    ):
        return DraftRepository.get_all_by_user(
            db,
            user_id,
        )
    
    
    @staticmethod
    def get_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftRepository.get_by_id(
            db,
            draft_id,
        )

        if not draft:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Draft not found",
            )

        if draft.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        return draft
    

    @staticmethod
    def update_draft(
        db: Session,
        draft_id: int,
        request: DraftUpdateRequest,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        update_data = request.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                draft,
                key,
                value,
            )

        return DraftRepository.update(
            db,
            draft,
        )
    

    @staticmethod
    def delete_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        DraftRepository.delete(
            db,
            draft,
        )

        return {
            "message": "Draft deleted successfully"
        }