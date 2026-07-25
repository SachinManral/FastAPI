from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str = "Learning"
    priority: str = "Medium"
    completed: bool = False


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class ColumnSchema(BaseModel):
    name: str
    type: str
    nullable: bool
    primary_key: bool


class TableSchema(BaseModel):
    name: str
    columns: list[ColumnSchema]


class DatabaseSchemaResponse(BaseModel):
    engine: str
    database_name: str
    tables: list[TableSchema]


class TelemetryResponse(BaseModel):
    status: str
    engine: str
    total_items: int
    completed_items: int
    pending_items: int
    categories: list[str]
    mode: str


