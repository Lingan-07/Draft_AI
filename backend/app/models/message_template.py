from datetime import UTC, datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Text,
)

from app.core.database import Base


class MessageTemplate(Base):
    __tablename__ = "message_templates"

    id = Column(Integer, primary_key=True, index=True)

    template_name = Column(
        String(100),
        nullable=False,
        unique=True,
    )

    message_type = Column(
        String(20),
        nullable=False,
    )

    default_tone = Column(
        String(50),
        nullable=False,
    )

    prompt_text = Column(
        Text,
        nullable=False,
    )

    is_active = Column(
        Boolean,
        default=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )