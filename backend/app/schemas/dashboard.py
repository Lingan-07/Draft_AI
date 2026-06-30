from app.schemas.common import BaseSchema


class UserDashboardResponse(BaseSchema):
    total_drafts: int
    generated_drafts: int
    templates_available: int
    ai_generations: int


class AdminDashboardResponse(BaseSchema):
    total_users: int
    total_drafts: int
    total_ai_generations: int
    active_templates: int