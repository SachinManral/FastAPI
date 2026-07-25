import time
from datetime import datetime
from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect
from sqlalchemy.orm import Session

from database import DB_ENGINE_TYPE, Base, SessionLocal, engine
from database_model import ItemDB
from models import DatabaseSchemaResponse, ItemCreate, ItemResponse, TelemetryResponse

# Ensure database tables exist
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Table creation note: {e}")

app = FastAPI(
    title="FastAPI Hub Backend & Learning Platform",
    description="Backend powered by FastAPI, Pydantic, and SQLAlchemy ORM with PostgreSQL / SQLite DB",
    version="2.0.0",
)

# Enable CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Process-Time", "X-DB-Engine", "X-Pydantic-Model", "X-SQL-Executed"],
)


@app.middleware("http")
async def add_telemetry_headers(request: Request, call_next):
    start_time = time.time()
    response: Response = await call_next(request)
    process_time = (time.time() - start_time) * 1000  # in ms
    response.headers["X-Process-Time"] = f"{process_time:.2f}ms"
    response.headers["X-DB-Engine"] = DB_ENGINE_TYPE
    return response


# Dependency to get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Default seed items matching learning guide
DEFAULT_ITEMS = [
    {
        "title": "Setup FastAPI Environment & Uvicorn",
        "description": "Install fastapi and uvicorn using pip, then start dev server with uvicorn main:app --reload",
        "category": "Learning",
        "priority": "High",
        "completed": True,
    },
    {
        "title": "Define Pydantic Request & Response Models",
        "description": "Create Base, Create, and Response schemas with type hints for automatic validation & docs",
        "category": "Learning",
        "priority": "High",
        "completed": True,
    },
    {
        "title": "Connect Frontend Fetch requests to FastAPI endpoints",
        "description": "Enable CORSMiddleware in FastAPI to allow cross-origin requests from localhost:5173",
        "category": "Project",
        "priority": "Medium",
        "completed": False,
    },
    {
        "title": "Integrate SQLAlchemy & PostgreSQL Database",
        "description": "Replace temporary python list with actual DB session dependencies (get_db)",
        "category": "Work",
        "priority": "High",
        "completed": False,
    },
]


def init_db():
    try:
        db = SessionLocal()
        if db.query(ItemDB).count() == 0:
            for item in DEFAULT_ITEMS:
                db.add(ItemDB(**item))
            db.commit()
            print(f"Default items seeded into {DB_ENGINE_TYPE} database successfully.")
        db.close()
    except Exception as e:
        print(f"Initial DB seed note: {e}")


init_db()


@app.get("/")
def read_root():
    return {
        "message": "Welcome to FastAPI Visual Learning Platform Backend",
        "docs": "/docs",
        "engine": DB_ENGINE_TYPE,
        "status": "operational",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "mode": "FastAPI Learning Platform Backend",
        "engine": DB_ENGINE_TYPE,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/api/v1/telemetry", response_model=TelemetryResponse)
def get_telemetry(db: Session = Depends(get_db)):
    total = db.query(ItemDB).count()
    completed = db.query(ItemDB).filter(ItemDB.completed == True).count()
    pending = total - completed
    cats = [c[0] for c in db.query(ItemDB.category).distinct().all()]

    return TelemetryResponse(
        status="healthy",
        engine=DB_ENGINE_TYPE,
        total_items=total,
        completed_items=completed,
        pending_items=pending,
        categories=cats,
        mode="Full FastAPI & Database Execution",
    )


@app.get("/api/v1/db/schema", response_model=DatabaseSchemaResponse)
def get_db_schema():
    inspector = inspect(engine)
    tables_schema = []

    for table_name in inspector.get_table_names():
        columns = []
        pk_constraint = inspector.get_pk_constraint(table_name)
        pk_cols = pk_constraint.get("constrained_columns", [])

        for col in inspector.get_columns(table_name):
            columns.append(
                {
                    "name": col["name"],
                    "type": str(col["type"]),
                    "nullable": col.get("nullable", True),
                    "primary_key": col["name"] in pk_cols,
                }
            )

        tables_schema.append({"name": table_name, "columns": columns})

    return DatabaseSchemaResponse(
        engine=DB_ENGINE_TYPE,
        database_name="fastapi_test" if "PostgreSQL" in DB_ENGINE_TYPE else "fastapi_learning.db",
        tables=tables_schema,
    )


@app.get("/api/v1/items", response_model=list[ItemResponse])
def get_all_items(response: Response, db: Session = Depends(get_db)):
    query_str = "SELECT * FROM items ORDER BY items.id ASC;"
    response.headers["X-SQL-Executed"] = query_str
    response.headers["X-Pydantic-Model"] = "list[ItemResponse]"
    return db.query(ItemDB).order_by(ItemDB.id.asc()).all()


@app.get("/api/v1/items/{id}", response_model=ItemResponse)
def get_item_by_id(id: int, response: Response, db: Session = Depends(get_db)):
    query_str = f"SELECT * FROM items WHERE items.id = {id} LIMIT 1;"
    response.headers["X-SQL-Executed"] = query_str
    response.headers["X-Pydantic-Model"] = "ItemResponse"

    item = db.query(ItemDB).filter(ItemDB.id == id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Item #{id} not found"
        )
    return item


@app.post("/api/v1/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate, response: Response, db: Session = Depends(get_db)):
    db_item = ItemDB(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    query_str = f"INSERT INTO items (title, description, category, priority, completed) VALUES ('{db_item.title}', ...);"
    response.headers["X-SQL-Executed"] = query_str
    response.headers["X-Pydantic-Model"] = "ItemCreate -> ItemResponse"

    return db_item


@app.put("/api/v1/items/{id}", response_model=ItemResponse)
def update_item(id: int, item: ItemCreate, response: Response, db: Session = Depends(get_db)):
    db_item = db.query(ItemDB).filter(ItemDB.id == id).first()
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Item #{id} not found"
        )

    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)

    query_str = f"UPDATE items SET title='{db_item.title}', completed={db_item.completed} WHERE items.id = {id};"
    response.headers["X-SQL-Executed"] = query_str
    response.headers["X-Pydantic-Model"] = "ItemCreate -> ItemResponse"

    return db_item


@app.delete("/api/v1/items/{id}")
def delete_item(id: int, response: Response, db: Session = Depends(get_db)):
    db_item = db.query(ItemDB).filter(ItemDB.id == id).first()
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Item #{id} not found"
        )

    query_str = f"DELETE FROM items WHERE items.id = {id};"
    response.headers["X-SQL-Executed"] = query_str
    response.headers["X-Pydantic-Model"] = "None -> Dict[detail]"

    db.delete(db_item)
    db.commit()
    return {"detail": f"Item #{id} deleted successfully"}