"""
Pydantic schemas and SQLAlchemy models for sspagelog domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import (
    ARRAY,
    BigInteger,
    Column,
    Date,
    DateTime,
    Integer,
    Numeric,
    String,
    Text,
    Time,
)
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqSspagelog(BaseModel):
    """Request model for creating or updating sspagelog (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    log_page_key: Optional[int] = None
    page_key: Optional[int] = None
    start_time: Optional[datetime] = None


class SSpagelog(Base):
    """SQLAlchemy table for sspagelog."""

    __tablename__ = "sspagelog"

    log_page_key = Column(
        BigInteger, primary_key=True, autoincrement=True, nullable=True
    )
    page_key = Column(BigInteger, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
