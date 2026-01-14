"""
Pydantic schemas and SQLAlchemy models for bus domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import ARRAY, BigInteger, Column, Date, DateTime, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqBus(BaseModel):
    """Request model for creating or updating bus (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    bus_key: Optional[int] = None
    busgroup_key: Optional[int] = None
    bus_id: Optional[str] = None
    car_no: Optional[str] = None
    name: Optional[str] = None
    comment: Optional[str] = None
    engine_type: Optional[str] = None
    floor2_yn: Optional[int] = None
    low_yn: Optional[int] = None
    tot_seat: Optional[int] = None


class Bus(Base):
    """SQLAlchemy table for bus."""

    __tablename__ = "bus"

    bus_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    busgroup_key = Column(BigInteger, nullable=False)
    bus_id = Column(String(50), nullable=True)
    car_no = Column(String(50), nullable=True)
    name = Column(String(100), nullable=True)
    comment = Column(String(255), nullable=True)
    engine_type = Column(String(10), nullable=True)
    floor2_yn = Column(Integer, default=0, nullable=False)
    low_yn = Column(Integer, default=0, nullable=False)
    tot_seat = Column(Integer, nullable=True)
