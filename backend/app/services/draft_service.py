from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.ai_generation_log import AIGenerationLog
from app.models.draft import Draft
from app.models.draft_version import DraftVersion

from app.repositories.ai_log_repository import AIGenerationLogRepository
from app.repositories.draft_repository import DraftRepository
from app.repositories.draft_version_repository import DraftVersionRepository

from app.schemas.draft import (
    DraftCreateRequest,
    DraftUpdateRequest,
)

from app.services.ai_service import ai_service
from app.utils.constants import (DRAFT,GENERATED)
from app.utils.prompt_builder import PromptBuilder


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

    @staticmethod
    def _process_ai_action(
        db: Session,
        draft: Draft,
        prompt: str,
        ai_function,
    ):
        response = ai_function(prompt)

        subject = response.get("subject")
        body = response.get("body")

        if not body:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Invalid AI response.",
            )

        draft.subject = subject
        draft.body = body
        draft.status = GENERATED

        DraftRepository.save(
            db,
            draft,
        )

        latest_version = DraftVersionRepository.get_latest_version(
            db,
            draft.id,
        )

        version_no = (
            1
            if latest_version is None
            else latest_version.version_no + 1
        )

        version = DraftVersion(
            draft_id=draft.id,
            version_no=version_no,
            tone=draft.tone,
            subject=draft.subject,
            body=draft.body,
        )

        DraftVersionRepository.create(
            db,
            version,
        )

        log = AIGenerationLog(
            user_id=draft.user_id,
            draft_id=draft.id,
            input_text=prompt,
            output_text=draft.body,
            model_name="gemini-2.5-flash",
        )

        AIGenerationLogRepository.create(
            db,
            log,
        )

        return draft

    @staticmethod
    def generate_ai_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        prompt = PromptBuilder.build_generate_prompt(
            draft.message_type,
            draft.tone,
            draft.rough_points,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.generate,
        )

    @staticmethod
    def rewrite_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        prompt = PromptBuilder.build_rewrite_prompt(
            draft.subject,
            draft.body,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.rewrite,
        )

    @staticmethod
    def improve_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        prompt = PromptBuilder.build_improve_prompt(
            draft.subject,
            draft.body,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.improve
        )

    @staticmethod
    def shorten_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        prompt = PromptBuilder.build_shorten_prompt(
            draft.subject,
            draft.body,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.shorten
        )

    @staticmethod
    def expand_draft(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        prompt = PromptBuilder.build_expand_prompt(
            draft.subject,
            draft.body,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.expand
        )

    @staticmethod
    def change_tone(
        db: Session,
        draft_id: int,
        user_id: int,
        tone: str,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        draft.tone = tone

        prompt = PromptBuilder.build_tone_prompt(
            draft.subject,
            draft.body,
            tone,
        )

        return DraftService._process_ai_action(
            db,
            draft,
            prompt,
            ai_service.change_tone
        )
    
    @staticmethod
    def get_versions(
        db: Session,
        draft_id: int,
        user_id: int,
    ):
        draft = DraftService.get_draft(
            db,
            draft_id,
            user_id,
        )

        return DraftVersionRepository.get_by_draft(
            db,
            draft.id,
        )