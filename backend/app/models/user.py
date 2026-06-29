from datetime import UTC, datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.utils.constants import USER_ROLE


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False, index=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(String(20), nullable=False, default=USER_ROLE)

    is_active = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )

    # Relationships

    drafts = relationship(
        "Draft",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    ai_generation_logs = relationship(
        "AIGenerationLog",
        back_populates="user",
        cascade="all, delete-orphan"
    )