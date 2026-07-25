import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker

# PostgreSQL Connection settings
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "3107")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "fastapi_test")

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
DB_ENGINE_TYPE = "PostgreSQL"

def init_engine():
    global SQLALCHEMY_DATABASE_URL, DB_ENGINE_TYPE
    default_url = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/postgres"
    try:
        # Try connecting to PostgreSQL server to ensure database exists
        temp_engine = create_engine(default_url, isolation_level="AUTOCOMMIT", connect_args={"connect_timeout": 3})
        with temp_engine.connect() as conn:
            result = conn.execute(
                text(f"SELECT 1 FROM pg_database WHERE datname='{DB_NAME}'")
            )
            if not result.scalar():
                conn.execute(text(f'CREATE DATABASE "{DB_NAME}"'))
                print(f"Database '{DB_NAME}' created successfully.")
        temp_engine.dispose()
        
        pg_engine = create_engine(SQLALCHEMY_DATABASE_URL)
        # Test connection
        with pg_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print(f"Connected to PostgreSQL database: '{DB_NAME}'")
        return pg_engine, "PostgreSQL"
    except Exception as e:
        print(f"PostgreSQL connection note: {e}")
        print("Falling back to local SQLite database: 'fastapi_learning.db'")
        SQLALCHEMY_DATABASE_URL = "sqlite:///./fastapi_learning.db"
        DB_ENGINE_TYPE = "SQLite (Fallback)"
        sqlite_engine = create_engine(
            SQLALCHEMY_DATABASE_URL, 
            connect_args={"check_same_thread": False}
        )
        return sqlite_engine, "SQLite (Fallback)"

engine, DB_ENGINE_TYPE = init_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


