"""
Pydantic schemas and SQLAlchemy models for busstop domain.
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
    DateTime,
    Integer,
    Numeric,
    String,
    Text,
    Time,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import declarative_base

from api.busgroup.busgroup_model import ReqBusgroup
from api.bus.bus_model import ReqBus

Base = declarative_base()


####################################################################################################
###### pydantic 모델
####################################################################################################


class ReqBusstop(BaseModel):
    """Request model for creating or updating busstop (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    busstop_key: Optional[int] = None
    busstop_id: Optional[str] = None
    name: Optional[str] = None
    comment: Optional[str] = None
    upper_yn: Optional[int] = None
    map_x: Optional[Decimal] = None
    map_y: Optional[Decimal] = None
    juso: Optional[str] = None
    si: Optional[str] = None
    gu: Optional[str] = None
    dong: Optional[str] = None
    image_filekey_list: Optional[list[int]] = None


####################################################################################################
###### pydantic 모델 (버스정보)
####################################################################################################


class BusgroupWithBuses(BaseModel):
    """Busgroup with its buses."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    busgroup: ReqBusgroup
    bus_list: list[ReqBus]


class ResBusgroupsWithBuses(BaseModel):
    """Response model for busgroups and buses by busstop."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    busgroup_list: list[BusgroupWithBuses]


####################################################################################################
###### DB 모델
####################################################################################################
class Busstop(Base):
    """SQLAlchemy table for busstop."""

    __tablename__ = "busstop"

    busstop_key = Column(
        BigInteger, primary_key=True, autoincrement=True, nullable=True
    )
    busstop_id = Column(String(50), nullable=False)
    name = Column(String(100), nullable=False)
    comment = Column(String(255), nullable=True)
    upper_yn = Column(Integer, default=0, nullable=False)
    map_x = Column(Numeric(10, 7), nullable=True)
    map_y = Column(Numeric(10, 7), nullable=True)
    juso = Column(String(255), nullable=True)
    si = Column(String(50), nullable=True)
    gu = Column(String(50), nullable=True)
    dong = Column(String(50), nullable=True)
    image_filekey_list = Column(ARRAY(BigInteger), nullable=False, default=list)
