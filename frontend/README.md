# 🚀 FastAPI Learning Hub - Frontend UI

This is a modern, responsive, and feature-rich frontend application built specifically for learning and experimenting with **FastAPI** and database integration.

---

## 🌟 Key Features

1. **Standalone Demo Mode (Mock Storage)**:
   - Works immediately out-of-the-box using browser `localStorage`.
   - Allows testing full CRUD operations (Create, Read, Update, Delete, Search, Filter, Stats) without needing a backend server running.

2. **Live FastAPI Integration Mode**:
   - Easily switch to live FastAPI mode via the **Status Pill / Settings** menu in the top right.
   - Points to `http://localhost:8000` (or any custom API base URL).
   - Features dynamic health connection testing (`/health`) and handles REST API fetch errors with friendly toasts.

3. **Interactive API Request Tester (Playground)**:
   - Test endpoints (`GET /api/v1/items`, `POST /api/v1/items`, `PUT /api/v1/items/{id}`, `DELETE /api/v1/items/{id}`) with custom request headers and JSON bodies directly inside the browser.
   - Displays real-time response status codes, execution latency (ms), and formatted JSON output.

4. **FastAPI Backend Blueprint Tab**:
   - Contains a complete, ready-to-run `main.py` Python snippet with FastAPI endpoints, Pydantic schemas, and CORS middleware configured for this UI.

---

## 🛠️ Quick Start

### 1. Install & Start Development Server
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (Vite)
npm install

# Start local dev server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🐍 Connecting to your FastAPI Backend (When ready!)

When you start learning FastAPI:

1. Create a `main.py` file in your backend folder.
2. Enable CORS in FastAPI so your frontend can communicate with it:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

3. Run FastAPI using Uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

4. Click the **Backend Status Badge** in the frontend top bar, switch mode to **"Live FastAPI Backend"**, and enjoy!
