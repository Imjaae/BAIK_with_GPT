"""
Pydantic schemas and SQLAlchemy models for busarrival domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import ARRAY, BigInteger, Column, Date, DateTime, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqBusarrival(BaseModel):
    """Request model for creating or updating busarrival (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    log_arrival_key: Optional[int] = None
    bus_key: Optional[int] = None
    busstop_key: Optional[int] = None
    arrival_time: Optional[datetime] = None
    upper_yn: Optional[int] = None
    total_seat: Optional[int] = None
    use_seat: Optional[int] = None
    busy_stat: Optional[str] = None


class Busarrival(Base):
    """SQLAlchemy table for busarrival."""

    __tablename__ = "busarrival"

    log_arrival_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    bus_key = Column(BigInteger, nullable=False)
    busstop_key = Column(BigInteger, nullable=False)
    arrival_time = Column(DateTime(timezone=True), nullable=False)
    upper_yn = Column(Integer, default=0, nullable=False)
    total_seat = Column(Integer, nullable=True)
    use_seat = Column(Integer, nullable=True)
    busy_stat = Column(String(1), nullable=True)
