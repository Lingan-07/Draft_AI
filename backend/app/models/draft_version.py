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


class DraftVersion(Base):
    __tablename__ = "draft_versions"

    id = Column(Integer, primary_key=True, index=True)

    draft_id = Column(
        Integer,
        ForeignKey("drafts.id", ondelete="CASCADE"),
        nullable=False,
    )

    version_no = Column(Integer, nullable=False)

    tone = Column(String(50), nullable=False)

    subject = Column(String(255), nullable=True)

    body = Column(Text, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )

    # Relationship
    draft = relationship(
        "Draft",
        back_populates="versions",
    )