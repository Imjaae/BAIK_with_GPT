"""
Pydantic schemas and SQLAlchemy models for gugan domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import ARRAY, BigInteger, Column, Date, DateTime, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqGugan(BaseModel):
    """Request model for creating or updating gugan (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    gugan_key: Optional[int] = None
    busgroup_key: Optional[int] = None
    fr_busstop_key: Optional[int] = None
    to_busstop_key: Optional[int] = None
    term_min: Optional[int] = None


class Gugan(Base):
    """SQLAlchemy table for gugan."""

    __tablename__ = "gugan"

    gugan_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    busgroup_key = Column(BigInteger, nullable=False)
    fr_busstop_key = Column(BigInteger, nullable=False)
    to_busstop_key = Column(BigInteger, nullable=False)
    term_min = Column(Integer, nullable=False)
