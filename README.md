# ⚡ FastAPI Academy & Developer Studio

An interactive, beginner-friendly learning platform and live developer studio for mastering **FastAPI**, **Pydantic v2**, and **SQLAlchemy 2.0 ORM**.

---

## 🌟 Key Features

- **🎓 Theory & Core Curriculum**: 6 interactive modules covering ASGI architecture, Pydantic type safety, REST routing, SQLAlchemy 2.0 ORM, Dependency Injection (`Depends`), and OpenAPI specification generation.
- **🐣 Beginner ELI5 Restaurant Metaphor**: Plain-English breakdown explaining Web APIs, HTTP methods, JSON payloads, and Status Codes for absolute newcomers.
- **⚡ Practical Execution Lab**: Real-time CRUD manager connected to a live execution terminal dock tracking SQL statements, HTTP requests, Pydantic models, and JSON outputs.
- **🗄️ Relational DB Schema Introspection**: Inspect live table definitions, primary keys, and column data types extracted from Python `DeclarativeBase` metadata.
- **🧪 API Endpoint Tester**: In-browser HTTP request builder with preset endpoints to test REST APIs live.
- **💻 Production Code Blueprint**: Clean, production-ready `main.py` Python template integrating FastAPI routing, CORS middleware, and database sessions.
- **🔌 MCP (Model Context Protocol) Support**: Compatible with MCP servers for automated database introspection, AI agent context, and API tool integration.
- **🎨 Minimalist Pitch Black & Paper White Themes**: Ultra-clean monochrome theme engine with smooth 0.3s CSS transitions and vibrant code snippet syntax highlighting.

---

## 🔐 Database Passwords & Security (.env Setup)

To keep database credentials and secret keys secure, environment variables are loaded dynamically using `os.getenv()` in `database.py`. **Never commit database passwords or secret keys directly to Git repositories.**

1. Create a `.env` file in the root directory:
   ```env
   # Database Credentials
   DB_USER=postgres
   DB_PASS=your_secure_password_here
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_NAME=fastapi_test

   # Optional Secret Keys & Settings
   SECRET_KEY=your_super_secret_jwt_key
   ENVIRONMENT=development
   ```

2. All `.env` files, credentials (`secrets.json`, `auth.json`), and database passwords are automatically ignored via [.gitignore](file:///d:/Study%20Material/VS%20Studio/FastAPI/.gitignore).

---

## 🔌 Model Context Protocol (MCP) Integration

This repository supports **Model Context Protocol (MCP)** integration for AI coding assistants (Cursor, VS Code, Anthropic, Gemini, FastMCP).

- **MCP Configuration File**: `.cursor/mcp.json` or `.vscode/mcp.json`
- **MCP Database Server**: Enables AI agents to introspect PostgreSQL/SQLite schemas, run database queries safely, and test API endpoints.
- Note: MCP configuration files containing local paths or database URIs are excluded from version control via `.gitignore`.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

---

### 1. Backend Setup (FastAPI & SQLAlchemy)

1. Activate your Python virtual environment:
   ```bash
   # On Windows PowerShell
   .\myenv\Scripts\Activate.ps1

   # On Linux/macOS
   source myenv/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-dotenv
   ```

3. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   - Server running at: `http://localhost:8000`
   - Interactive Swagger API Docs at: `http://localhost:8000/docs`
   - ReDoc Documentation at: `http://localhost:8000/redoc`

---

### 2. Frontend Setup (Vite Learning Studio)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   - Studio UI running at: `http://localhost:5173`

---

## 📁 Project Structure

```text
FastAPI/
├── main.py                # Core FastAPI application routes & CORS middleware
├── database.py            # SQLAlchemy database engine & SessionLocal setup
├── database_model.py      # SQLAlchemy ORM database models (ItemDB)
├── models.py              # Pydantic request/response validation schemas
├── .env                   # Local environment variables & DB passwords (Git-ignored)
├── .gitignore             # Git ignore rules for Python, MCP, secrets, DB passwords
├── README.md              # Project documentation & security guide
└── frontend/              # Vite + JavaScript ES6 + Vanilla CSS frontend
    ├── index.html         # Main single-page application structure
    ├── package.json       # Frontend dependencies & scripts
    └── src/
        ├── main.js        # Interactive engine, tab router & API client
        └── style.css      # Theme variables, typography & layout styling
```

---

## 🛠️ Technology Stack

- **Backend**: FastAPI, Python 3.10+, SQLAlchemy 2.0, Pydantic v2, Uvicorn (ASGI)
- **Frontend**: Vite, JavaScript ES6+, Vanilla CSS (Design Tokens & CSS Variables), Lucide Icons
- **Database**: SQLite / PostgreSQL (Configurable via `.env`)
- **Protocol**: MCP (Model Context Protocol) for AI agent tooling

---

## 📜 License

Distributed under the MIT License. Feel free to modify and expand for learning and production use!
