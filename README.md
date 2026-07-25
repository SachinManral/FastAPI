# ⚡ FastAPI Academy & Developer Studio

An interactive, beginner-friendly learning platform and live developer studio for mastering **FastAPI**, **Pydantic v2**, and **SQLAlchemy 2.0 ORM**.

---

## 🌟 Key Features

- **🤖 AI FastAPI Mentor Chatbot**: Embedded technical coding assistant powered by **Groq Cloud (Llama-3.3-70B)** and **Tavily Web Search API** for instant code generation, error troubleshooting, and live documentation lookup.
- **🎓 Theory & Core Curriculum**: 6 interactive modules covering ASGI architecture, Pydantic type safety, REST routing, SQLAlchemy 2.0 ORM, Dependency Injection (`Depends`), and OpenAPI specification generation.
- **🐣 Beginner ELI5 Restaurant Metaphor**: Plain-English breakdown explaining Web APIs, HTTP methods, JSON payloads, and Status Codes for absolute newcomers.
- **⚡ Practical Execution Lab**: Real-time CRUD manager connected to a live execution terminal dock tracking SQL statements, HTTP requests, Pydantic models, and JSON outputs.
- **🗄️ Relational DB Schema Introspection**: Inspect live table definitions, primary keys, and column data types extracted from Python `DeclarativeBase` metadata.
- **🧪 API Endpoint Tester**: In-browser HTTP request builder with preset endpoints to test REST APIs live with color-coded HTTP status badges.
- **💻 Production Code Blueprint**: Clean, production-ready `main.py` Python template integrating FastAPI routing, CORS middleware, and database sessions.
- **🔌 MCP (Model Context Protocol) Support**: Compatible with MCP servers for automated database introspection, AI agent context, and API tool integration.
- **🎨 Radial Wave Theme Transitions**: Smooth circular expansion theme engine (Dark / Light mode) using the Web View Transitions API with crisp monochrome styling.

---

## 🌐 Live Deployments

- **Live Custom Domain**: [https://fastapi.sachinmanral.com](https://fastapi.sachinmanral.com)
- **Vercel Frontend**: [https://fastapi-academy.vercel.app](https://fastapi-academy.vercel.app)
- **Render Backend API**: [https://fastapi-lrtn.onrender.com](https://fastapi-lrtn.onrender.com)
- **Interactive Swagger Docs**: [https://fastapi-lrtn.onrender.com/docs](https://fastapi-lrtn.onrender.com/docs)

---

## 🔐 Environment Variables & Security (.env Setup)

To keep database credentials and AI API keys secure, environment variables are loaded dynamically using `os.getenv()` in `database.py` and `main.py`. **Never commit database passwords or secret keys directly to Git repositories.**

1. Create a `.env` file in the root directory:
   ```env
   # Option 1: Full Database Connection URL (Neon / PostgreSQL)
   DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-polished-unit-ayksonna-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require

   # Option 2: Individual Connection Parameters (Local PostgreSQL)
   DB_USER=postgres
   DB_PASS=your_secure_password_here
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_NAME=fastapi_test

   # AI Assistant & Knowledge Search Keys
   GROQ_API_KEY=gsk_YOUR_GROQ_API_KEY_HERE
   TAVILY_API_KEY=tvly-YOUR_TAVILY_KEY_HERE
   SERPAPI_KEY=YOUR_SERPAPI_KEY_HERE
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
   pip install -r requirements.txt
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
├── main.py                # Core FastAPI app, CORS middleware, and AI Chatbot (/api/v1/chat)
├── database.py            # SQLAlchemy database engine & SessionLocal setup
├── database_model.py      # SQLAlchemy ORM database models (ItemDB)
├── models.py              # Pydantic validation schemas & AI Chat models
├── requirements.txt       # Python dependencies (fastapi, uvicorn, sqlalchemy, httpx)
├── .env                   # Local environment variables & AI API keys (Git-ignored)
├── .env.example           # Environment template with generic placeholders
├── .gitignore             # Git ignore rules for Python, MCP, secrets, DB passwords
├── README.md              # Project documentation & setup guide
└── frontend/              # Vite + JavaScript ES6 + Vanilla CSS frontend
    ├── index.html         # Main single-page application structure & AI Chat UI
    ├── package.json       # Frontend dependencies & scripts
    └── src/
        ├── main.js        # Interactive engine, tab router, AI Chat client & API tester
        └── style.css      # Design tokens, view transitions, responsive & chat styling
```

---

## 🛠️ Technology Stack

- **Backend**: FastAPI, Python 3.10+, SQLAlchemy 2.0, Pydantic v2, Uvicorn (ASGI), `httpx`
- **AI & Search Engines**: Groq Cloud LLM (`Llama-3.3-70B`), Tavily Search API, SerpAPI
- **Frontend**: Vite, JavaScript ES6+, Vanilla CSS (Design Tokens & View Transitions), Lucide Icons
- **Database**: Serverless PostgreSQL (Neon) / Local PostgreSQL / SQLite
- **Protocol**: MCP (Model Context Protocol) for AI agent tooling

---

## 📜 License

Distributed under the MIT License. Feel free to modify and expand for learning and production use!
