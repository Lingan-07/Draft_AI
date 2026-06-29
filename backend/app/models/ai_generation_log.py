from datetime import UTC, datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class AIGenerationLog(Base):
    __tablename__ = "ai_generation_logs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    draft_id = Column(
        Integer,
        ForeignKey("drafts.id", ondelete="CASCADE"),
        nullable=False,
    )

    input_text = Column(
        Text,
        nullable=False,
    )

    output_text = Column(
        Text,
        nullable=False,
    )

    model_name = Column(
        String(100),
        nullable=False,
        default="gemini-2.5-flash",
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )

    # Relationships

    user = relationship(
        "User",
        back_populates="ai_generation_logs",
    )

    draft = relationship(
        "Draft",
        back_populates="ai_logs",
    )