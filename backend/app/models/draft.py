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


class Draft(Base):
    __tablename__ = "drafts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    title = Column(String(255), nullable=False)

    message_type = Column(String(20), nullable=False)

    tone = Column(String(50), nullable=False)

    rough_points = Column(Text, nullable=False)

    subject = Column(String(255), nullable=True)

    body = Column(Text, nullable=True)

    status = Column(String(20), nullable=False, default="DRAFT")

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
    )

    # Relationships

    user = relationship(
        "User",
        back_populates="drafts",
    )

    versions = relationship(
        "DraftVersion",
        back_populates="draft",
        cascade="all, delete-orphan",
    )

    ai_logs = relationship(
        "AIGenerationLog",
        back_populates="draft",
        cascade="all, delete-orphan",
    )