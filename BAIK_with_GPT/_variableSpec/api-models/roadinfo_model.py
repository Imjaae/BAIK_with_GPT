"""
Pydantic schemas and SQLAlchemy models for roadinfo domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import ARRAY, BigInteger, Column, Date, DateTime, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqRoadinfo(BaseModel):
    """Request model for creating or updating roadinfo (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    roadinfo_key: Optional[int] = None
    info_type: Optional[str] = None
    title: Optional[str] = None
    body_str: Optional[str] = None
    image_filekey_list: Optional[list[int]] = None


class Roadinfo(Base):
    """SQLAlchemy table for roadinfo."""

    __tablename__ = "roadinfo"

    roadinfo_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    info_type = Column(String(20), nullable=False)
    title = Column(String(200), nullable=False)
    body_str = Column(Text, nullable=True)
    image_filekey_list = Column(ARRAY(BigInteger), nullable=False, default=list)
