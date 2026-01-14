"""
Pydantic schemas and SQLAlchemy models for busgroup domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import (
    BigInteger,
    Column,
    Date,
    Integer,
    String,
    Time,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqBusgroup(BaseModel):
    """Request model for creating or updating busgroup (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    busgroup_key: Optional[int] = None
    busgroup_name: Optional[str] = None
    bus_type: Optional[str] = None
    busmap_image_filekey: Optional[int] = None
    first_time: Optional[time] = None
    last_time: Optional[time] = None
    term_time: Optional[int] = None
    busstop_key_list: Optional[list[int]] = None
    comment: Optional[str] = None
    juso: Optional[str] = None
    si: Optional[str] = None
    gu: Optional[str] = None
    dong: Optional[str] = None
    tel: Optional[str] = None
    mobile: Optional[str] = None
    ceo_name: Optional[str] = None
    open_date: Optional[date] = None
    company_no: Optional[str] = None


class Busgroup(Base):
    """SQLAlchemy table for busgroup."""

    __tablename__ = "busgroup"

    busgroup_key = Column(
        BigInteger, primary_key=True, autoincrement=True, nullable=True
    )
    busgroup_name = Column(String(100), nullable=False)
    bus_type = Column(String(1), nullable=False)
    busmap_image_filekey = Column(Integer, nullable=False)
    first_time = Column(Time, nullable=True)
    last_time = Column(Time, nullable=True)
    term_time = Column(Integer, nullable=True)
    busstop_key_list = Column(ARRAY(BigInteger), nullable=False, default=list)
    comment = Column(String(255), nullable=True)
    juso = Column(String(255), nullable=True)
    si = Column(String(50), nullable=True)
    gu = Column(String(50), nullable=True)
    dong = Column(String(50), nullable=True)
    tel = Column(String(50), nullable=True)
    mobile = Column(String(50), nullable=True)
    ceo_name = Column(String(50), nullable=True)
    open_date = Column(Date, nullable=True)
    company_no = Column(String(50), nullable=True)
