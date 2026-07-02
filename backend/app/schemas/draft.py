from datetime import datetime
from typing import Optional
from pydantic import Field
from app.schemas.common import BaseModel, BaseSchema


class DraftCreateRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    message_type: str
    tone: str
    rough_points: str = Field(..., min_length=10)


class DraftUpdateRequest(BaseModel):
    title: Optional[str] = None
    message_type: Optional[str] = None
    tone: Optional[str] = None
    rough_points: Optional[str] = None
    subject: Optional[str] = None
    body: Optional[str] = None
    status: Optional[str] = None


class DraftResponse(BaseSchema):
    id: int
    user_id: int
    title: str
    message_type: str
    tone: str
    rough_points: str
    subject: Optional[str]
    body: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime


class GenerateDraftRequest(BaseModel):
    draft_id: int


class GenerateDraftResponse(BaseSchema):
    subject: Optional[str]
    body: str


class DraftVersionResponse(BaseSchema):
    id: int
    version_no: int
    tone: str
    subject: Optional[str]
    body: str
    created_at: datetime

class ToneRequest(BaseModel):
    tone: str = Field(
        ...,
        min_length=3,
        max_length=50,
    )