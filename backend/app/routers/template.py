from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.admin import get_current_admin
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.template import (
    TemplateCreateRequest,
    TemplateUpdateRequest,
    TemplateResponse,
)

from app.services.template_service import TemplateService

router = APIRouter(
    prefix="/templates",
    tags=["Templates"],
)


@router.post(
    "",
    response_model=TemplateResponse,
)
def create_template(
    request: TemplateCreateRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return TemplateService.create_template(
        db,
        request,
    )


@router.get(
    "",
    response_model=list[TemplateResponse],
)
def get_templates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return TemplateService.get_all_templates(
        db,
    )


@router.get(
    "/{template_id}",
    response_model=TemplateResponse,
)
def get_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return TemplateService.get_template(
        db,
        template_id,
    )


@router.put(
    "/{template_id}",
    response_model=TemplateResponse,
)
def update_template(
    template_id: int,
    request: TemplateUpdateRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return TemplateService.update_template(
        db,
        template_id,
        request,
    )


@router.delete(
    "/{template_id}",
)
def delete_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return TemplateService.delete_template(
        db,
        template_id,
    )