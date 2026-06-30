from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.message_template import MessageTemplate
from app.repositories.template_repository import TemplateRepository
from app.schemas.template import (
    TemplateCreateRequest,
    TemplateUpdateRequest,
)


class TemplateService:

    @staticmethod
    def create_template(
        db: Session,
        request: TemplateCreateRequest,
    ):
        template = MessageTemplate(
            template_name=request.template_name,
            message_type=request.message_type,
            default_tone=request.default_tone,
            prompt_text=request.prompt_text,
        )

        return TemplateRepository.create(
            db,
            template,
        )

    @staticmethod
    def get_all_templates(
        db: Session,
    ):
        return TemplateRepository.get_all(
            db,
        )

    @staticmethod
    def get_template(
        db: Session,
        template_id: int,
    ):
        template = TemplateRepository.get_by_id(
            db,
            template_id,
        )

        if not template:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Template not found",
            )

        return template

    @staticmethod
    def update_template(
        db: Session,
        template_id: int,
        request: TemplateUpdateRequest,
    ):
        template = TemplateService.get_template(
            db,
            template_id,
        )

        update_data = request.model_dump(
            exclude_unset=True,
        )

        for key, value in update_data.items():
            setattr(
                template,
                key,
                value,
            )

        return TemplateRepository.update(
            db,
            template,
        )

    @staticmethod
    def delete_template(
        db: Session,
        template_id: int,
    ):
        template = TemplateService.get_template(
            db,
            template_id,
        )

        TemplateRepository.delete(
            db,
            template,
        )

        return {
            "message": "Template deleted successfully"
        }