from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.draft import (
    DraftCreateRequest,
    DraftUpdateRequest,
    DraftResponse,
)
from app.services.draft_service import DraftService

router = APIRouter(
    prefix="/drafts",
    tags=["Drafts"],
)

@router.post(
    "",
    response_model=DraftResponse,
)
def create_draft(
    request: DraftCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DraftService.create_draft(
        db,
        request,
        current_user.id,
    )

@router.get(
    "",
    response_model=list[DraftResponse],
)
def get_all_drafts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DraftService.get_all_drafts(
        db,
        current_user.id,
    )

@router.get(
    "/{draft_id}",
    response_model=DraftResponse,
)
def get_draft(
    draft_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DraftService.get_draft(
        db,
        draft_id,
        current_user.id,
    )

@router.put(
    "/{draft_id}",
    response_model=DraftResponse,
)
def update_draft(
    draft_id: int,
    request: DraftUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DraftService.update_draft(
        db,
        draft_id,
        request,
        current_user.id,
    )

@router.delete(
    "/{draft_id}",
)
def delete_draft(
    draft_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DraftService.delete_draft(
        db,
        draft_id,
        current_user.id,
    )