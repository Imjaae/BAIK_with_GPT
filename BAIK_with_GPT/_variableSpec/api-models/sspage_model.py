"""
Pydantic schemas and SQLAlchemy models for sspage domain.
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


class ReqSspage(BaseModel):
    """Request model for creating or updating sspage (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    page_key: Optional[int] = None
    name: Optional[str] = None
    url: Optional[str] = None
    comment: Optional[str] = None


class SSpage(Base):
    """SQLAlchemy table for sspage."""

    __tablename__ = "sspage"

    page_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    name = Column(String(100), nullable=False)
    url = Column(String(255), nullable=True)
    comment = Column(String(255), nullable=True)
