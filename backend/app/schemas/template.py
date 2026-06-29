from datetime import datetime
from typing import Optional
from pydantic import Field
from app.schemas.common import BaseModel, BaseSchema


class TemplateCreateRequest(BaseModel):
    template_name: str = Field(..., min_length=3, max_length=100)
    message_type: str
    default_tone: str
    prompt_text: str = Field(..., min_length=10)


class TemplateUpdateRequest(BaseModel):
    template_name: Optional[str] = None
    message_type: Optional[str] = None
    default_tone: Optional[str] = None
    prompt_text: Optional[str] = None
    is_active: Optional[bool] = None


class TemplateResponse(BaseSchema):
    id: int
    template_name: str
    message_type: str
    default_tone: str
    prompt_text: str
    is_active: bool
    created_at: datetime