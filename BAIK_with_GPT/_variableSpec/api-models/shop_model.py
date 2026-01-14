"""
Pydantic schemas and SQLAlchemy models for shop domain.
Basic audit fields are included inline on every model (no shared BasicSet model).
"""

from datetime import date, datetime, time
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from sqlalchemy import ARRAY, BigInteger, Column, Date, DateTime, Integer, Numeric, String, Text, Time
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class ReqShop(BaseModel):
    """Request model for creating or updating shop (camelCase aliases)."""

    model_config = ConfigDict(
        response_model_by_alias=False, populate_by_name=True, from_attributes=True
    )

    shop_key: Optional[int] = None
    name: Optional[str] = None
    comment: Optional[str] = None
    map_x: Optional[Decimal] = None
    map_y: Optional[Decimal] = None
    juso: Optional[str] = None
    si: Optional[str] = None
    gu: Optional[str] = None
    dong: Optional[str] = None
    image_filekey_list: Optional[list[int]] = None


class Shop(Base):
    """SQLAlchemy table for shop."""

    __tablename__ = "shop"

    shop_key = Column(BigInteger, primary_key=True, autoincrement=True, nullable=True)
    name = Column(String(100), nullable=False)
    comment = Column(String(255), nullable=True)
    map_x = Column(Numeric(10, 7), nullable=True)
    map_y = Column(Numeric(10, 7), nullable=True)
    juso = Column(String(255), nullable=True)
    si = Column(String(50), nullable=True)
    gu = Column(String(50), nullable=True)
    dong = Column(String(50), nullable=True)
    image_filekey_list = Column(ARRAY(BigInteger), nullable=False, default=list)
