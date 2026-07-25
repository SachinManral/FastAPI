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


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str
    source: str = "Groq Llama-3.3-70B"


class TelemetryResponse(BaseModel):
    engine: str
    database_name: str
    latency_ms: float

    completed_items: int
    pending_items: int
    categories: list[str]
    mode: str
