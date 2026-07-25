// main.js - FastAPI Academy Beginner-Friendly & Colorful Engine

const DEFAULT_ITEMS = [
  {
    id: 1,
    title: "Setup FastAPI Environment & Uvicorn",
    description: "Install fastapi and uvicorn using pip, then start dev server with uvicorn main:app --reload",
    category: "Learning",
    priority: "High",
    completed: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 2,
    title: "Define Pydantic Request & Response Models",
    description: "Create Base, Create, and Response schemas with type hints for automatic validation & docs",
    category: "Learning",
    priority: "High",
    completed: true,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: "Connect Frontend Fetch requests to FastAPI endpoints",
    description: "Enable CORSMiddleware in FastAPI to allow cross-origin requests from localhost:5173",
    category: "Project",
    priority: "Medium",
    completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Integrate SQLAlchemy & PostgreSQL Database",
    description: "Replace temporary python list with actual DB session dependencies (get_db)",
    category: "Work",
    priority: "High",
    completed: false,
    created_at: new Date().toISOString()
  }
];

const MODULE_DATA = {
  asgi: {
    num: "01",
    tag: "Architecture",
    title: "ASGI & Asynchronous Event Loop",
    theory: "<strong>ASGI (Asynchronous Server Gateway Interface)</strong> allows Python to handle multiple HTTP requests simultaneously without waiting for one to finish before starting another.<br/><br/>Think of it like a chef who puts water to boil, and while waiting, starts chopping vegetables instead of sitting idle. FastAPI uses <strong>Uvicorn</strong> and Python's <code>async def</code> keywords to achieve this non-blocking execution.",
    code: `<span class="tok-comment"># Module 01: Asynchronous Route Handler</span>
<span class="tok-keyword">from</span> fastapi <span class="tok-keyword">import</span> FastAPI
<span class="tok-keyword">import</span> asyncio

app = <span class="tok-func">FastAPI</span>()

<span class="tok-decorator">@app.get</span>(<span class="tok-string">"/async-data"</span>)
<span class="tok-keyword">async def</span> <span class="tok-func">get_async_data</span>():
    <span class="tok-comment"># Non-blocking async sleep simulates fetching remote database data</span>
    <span class="tok-keyword">await</span> asyncio.<span class="tok-func">sleep</span>(<span class="tok-number">0.05</span>)
    <span class="tok-keyword">return</span> {<span class="tok-string">"status"</span>: <span class="tok-string">"success"</span>, <span class="tok-string">"mode"</span>: <span class="tok-string">"ASGI Asynchronous"</span>}`
  },

  pydantic: {
    num: "02",
    tag: "Validation",
    title: "Pydantic v2 Type Safety & Schemas",
    theory: "<strong>Pydantic</strong> acts as the strict entry guard for your server.<br/><br/>If a client sends an order missing a required field or passes text when a number is expected, Pydantic immediately rejects the request with an automatic <code>422 Unprocessable Entity</code> response before any server code can break.",
    code: `<span class="tok-comment"># Module 02: Pydantic Data Models</span>
<span class="tok-keyword">from</span> pydantic <span class="tok-keyword">import</span> BaseModel, Field

<span class="tok-keyword">class</span> <span class="tok-type">ItemCreate</span>(BaseModel):
    title: <span class="tok-type">str</span> = <span class="tok-func">Field</span>(..., min_length=<span class="tok-number">3</span>, description=<span class="tok-string">"Title of the item"</span>)
    description: <span class="tok-type">str | None</span> = <span class="tok-keyword">None</span>
    category: <span class="tok-type">str</span> = <span class="tok-string">"Learning"</span>
    priority: <span class="tok-type">str</span> = <span class="tok-string">"Medium"</span>

<span class="tok-keyword">class</span> <span class="tok-type">ItemResponse</span>(ItemCreate):
    id: <span class="tok-type">int</span>
    completed: <span class="tok-type">bool</span>

    <span class="tok-keyword">class</span> <span class="tok-type">Config</span>:
        from_attributes = <span class="tok-keyword">True</span>  <span class="tok-comment"># Allows converting SQLAlchemy objects</span>`
  },

  routing: {
    num: "03",
    tag: "REST API",
    title: "FastAPI Routing & Path Operations",
    theory: "Routes are the URLs users visit to perform actions.<br/><br/>• <strong>GET</strong> = Read data (e.g. <code>/items</code>)<br/>• <strong>POST</strong> = Create new data (e.g. <code>/items</code>)<br/>• <strong>PUT</strong> = Update existing data (e.g. <code>/items/1</code>)<br/>• <strong>DELETE</strong> = Delete data (e.g. <code>/items/1</code>)",
    code: `<span class="tok-comment"># Module 03: Path Operations & Status Codes</span>
<span class="tok-keyword">from</span> fastapi <span class="tok-keyword">import</span> FastAPI, HTTPException, status

app = <span class="tok-func">FastAPI</span>()

<span class="tok-decorator">@app.get</span>(<span class="tok-string">"/api/v1/items/{item_id}"</span>)
<span class="tok-keyword">def</span> <span class="tok-func">get_item</span>(item_id: <span class="tok-type">int</span>):
    <span class="tok-keyword">if</span> item_id &lt; <span class="tok-number">1</span>:
        <span class="tok-keyword">raise</span> <span class="tok-func">HTTPException</span>(status_code=<span class="tok-number">404</span>, detail=<span class="tok-string">"Item ID not found"</span>)
    <span class="tok-keyword">return</span> {<span class="tok-string">"item_id"</span>: item_id, <span class="tok-string">"title"</span>: <span class="tok-string">"Sample Item"</span>}`
  },

  sqlalchemy: {
    num: "04",
    tag: "Database",
    title: "SQLAlchemy 2.0 & Relational ORM",
    theory: "An <strong>ORM (Object-Relational Mapper)</strong> lets you interact with database tables using Python objects instead of writing raw SQL query strings by hand.<br/><br/>SQLAlchemy converts Python method calls like <code>db.query(ItemDB).filter(...)</code> into clean SQL <code>SELECT * FROM items WHERE ...</code> statement strings automatically.",
    code: `<span class="tok-comment"># Module 04: SQLAlchemy Relational Model</span>
<span class="tok-keyword">from</span> sqlalchemy <span class="tok-keyword">import</span> Column, Integer, String, Boolean
<span class="tok-keyword">from</span> sqlalchemy.orm <span class="tok-keyword">import</span> DeclarativeBase

<span class="tok-keyword">class</span> <span class="tok-type">Base</span>(DeclarativeBase):
    <span class="tok-keyword">pass</span>

<span class="tok-keyword">class</span> <span class="tok-type">ItemDB</span>(Base):
    __tablename__ = <span class="tok-string">"items"</span>

    id = <span class="tok-func">Column</span>(Integer, primary_key=<span class="tok-keyword">True</span>, index=<span class="tok-keyword">True</span>)
    title = <span class="tok-func">Column</span>(String, nullable=<span class="tok-keyword">False</span>)
    description = <span class="tok-func">Column</span>(String)
    category = <span class="tok-func">Column</span>(String, default=<span class="tok-string">"Learning"</span>)
    completed = <span class="tok-func">Column</span>(Boolean, default=<span class="tok-keyword">False</span>)`
  },

  di: {
    num: "05",
    tag: "Design Pattern",
    title: "Dependency Injection Container",
    theory: "<strong>Dependency Injection</strong> is a pattern where a helper function automatically provides resources (like a database session) right when a route needs it.<br/><br/>FastAPI's <code>Depends(get_db)</code> opens the database connection before your route function starts, and safely closes it when the response is finished, preventing database memory leaks.",
    code: `<span class="tok-comment"># Module 05: Database Session Dependency Injection</span>
<span class="tok-keyword">from</span> fastapi <span class="tok-keyword">import</span> Depends
<span class="tok-keyword">from</span> sqlalchemy.orm <span class="tok-keyword">import</span> Session
<span class="tok-keyword">from</span> database <span class="tok-keyword">import</span> SessionLocal

<span class="tok-keyword">def</span> <span class="tok-func">get_db</span>():
    db = <span class="tok-func">SessionLocal</span>()
    <span class="tok-keyword">try</span>:
        <span class="tok-keyword">yield</span> db  <span class="tok-comment"># Hands database session to route</span>
    <span class="tok-keyword">finally</span>:
        db.<span class="tok-func">close</span>() <span class="tok-comment"># Guarantees session closure</span>

<span class="tok-decorator">@app.get</span>(<span class="tok-string">"/items"</span>)
<span class="tok-keyword">def</span> <span class="tok-func">list_items</span>(db: <span class="tok-type">Session</span> = <span class="tok-func">Depends</span>(get_db)):
    <span class="tok-keyword">return</span> db.<span class="tok-func">query</span>(ItemDB).<span class="tok-func">all</span>()`
  },

  openapi: {
    num: "06",
    tag: "Documentation",
    title: "OpenAPI Spec & Auto Interactive Docs",
    theory: "In older web frameworks, writing API documentation takes hours of manual work.<br/><br/>FastAPI reads your Python type hints and instantly generates interactive <strong>Swagger UI</strong> documentation at <code>http://localhost:8000/docs</code> where you can test your API live in the browser without extra code!",
    code: `<span class="tok-comment"># Module 06: Automatic OpenAPI Docs</span>
<span class="tok-comment"># Access interactive Swagger UI documentation at:</span>
<span class="tok-comment"># 1. http://localhost:8000/docs  (Interactive Playground)</span>
<span class="tok-comment"># 2. http://localhost:8000/redoc (Clean ReDoc Reader)</span>`
  }
};

const FLOW_EXPLANATIONS = {
  request: "<strong>Step 1 - HTTP Client:</strong> Sends an asynchronous HTTP request (GET, POST, PUT, DELETE) carrying headers and payload to the server.",
  pydantic: "<strong>Step 2 - Pydantic Validation:</strong> FastAPI automatically validates the request payload against Pydantic models. Fails produce immediate 422 Unprocessable Entity errors.",
  router: "<strong>Step 3 - FastAPI Router:</strong> Routes request to <code>@app</code> handlers and injects dependencies via <code>Depends(get_db)</code>.",
  sql: "<strong>Step 4 - SQLAlchemy ORM:</strong> SQLAlchemy translates Python operations into SQL statements (SELECT, INSERT, UPDATE, DELETE) executed on DB.",
  response: "<strong>Step 5 - JSON Serialization:</strong> Serializes ORM models to JSON schemas (ItemResponse) with HTTP status codes (200 OK, 201 Created)."
};

class App {
  constructor() {
    const envApiUrl = import.meta.env.VITE_API_BASE_URL || "https://fastapi-lrtn.onrender.com";
    const savedConfig = localStorage.getItem("fastapi_hub_config");
    this.config = savedConfig ? JSON.parse(savedConfig) : {
      mode: "api",
      baseUrl: envApiUrl
    };

    const savedItems = localStorage.getItem("fastapi_hub_items");
    this.items = savedItems ? JSON.parse(savedItems) : DEFAULT_ITEMS;
    this.editingItemId = null;
    this.activeDBEngine = "PostgreSQL";
    this.activeModule = null;

    this.initElements();
    this.initTheme();
    this.bindEvents();
    this.updateStatusBadge();
    this.refreshItems();
  }

  initElements() {
    // Header & Theme
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.themeIcon = document.getElementById("themeIcon");
    this.openLearnBtn = document.getElementById("openLearnBtn");
    this.statusPill = document.getElementById("statusPill");
    this.statusDot = document.getElementById("statusDot");
    this.statusText = document.getElementById("statusText");
    this.openSettingsBtn = document.getElementById("openSettingsBtn");

    // Hero
    this.startLabHeroBtn = document.getElementById("startLabHeroBtn");

    // Module Detail Drawer
    this.moduleDetailCard = document.getElementById("moduleDetailCard");
    this.moduleDetailTag = document.getElementById("moduleDetailTag");
    this.moduleDetailTitle = document.getElementById("moduleDetailTitle");
    this.moduleDetailTheory = document.getElementById("moduleDetailTheory");
    this.moduleDetailCode = document.getElementById("moduleDetailCode");
    this.closeDetailBtn = document.getElementById("closeDetailBtn");
    this.copyModuleCodeBtn = document.getElementById("copyModuleCodeBtn");
    this.tryInLabBtn = document.getElementById("tryInLabBtn");

    // Architecture Flow
    this.archExplainerText = document.getElementById("archExplainerText");

    // Metrics Summary
    this.statTotal = document.getElementById("statTotal");
    this.statCompleted = document.getElementById("statCompleted");
    this.statPending = document.getElementById("statPending");
    this.statEngine = document.getElementById("statEngine");

    // Filters & Controls
    this.searchInput = document.getElementById("searchInput");
    this.categoryFilter = document.getElementById("categoryFilter");
    this.statusFilter = document.getElementById("statusFilter");
    this.newItemBtn = document.getElementById("newItemBtn");
    this.emptyStateAddBtn = document.getElementById("emptyStateAddBtn");

    // Table & Empty State
    this.itemsTableBody = document.getElementById("itemsTableBody");
    this.emptyState = document.getElementById("emptyState");

    // Terminal Dock Inspector
    this.stepSQLCode = document.getElementById("stepSQLCode");
    this.stepClientDetail = document.getElementById("stepClientDetail");
    this.stepFastAPIDetail = document.getElementById("stepFastAPIDetail");
    this.pipelineStatus = document.getElementById("pipelineStatus");
    this.pipelineTime = document.getElementById("pipelineTime");
    this.pipelineJSONPreview = document.getElementById("pipelineJSONPreview");

    // Modals
    this.itemModal = document.getElementById("itemModal");
    this.itemForm = document.getElementById("itemForm");
    this.modalTitle = document.getElementById("modalTitle");
    this.closeModalBtn = document.getElementById("closeModalBtn");
    this.cancelModalBtn = document.getElementById("cancelModalBtn");
    this.itemIdInput = document.getElementById("itemId");
    this.itemTitleInput = document.getElementById("itemTitle");
    this.itemDescInput = document.getElementById("itemDescription");
    this.itemCatInput = document.getElementById("itemCategory");
    this.itemPriInput = document.getElementById("itemPriority");
    this.itemCompInput = document.getElementById("itemCompleted");

    // Settings Modal
    this.settingsModal = document.getElementById("settingsModal");
    this.closeSettingsBtn = document.getElementById("closeSettingsBtn");
    this.saveSettingsBtn = document.getElementById("saveSettingsBtn");
    this.testConnBtn = document.getElementById("testConnBtn");
    this.apiBaseUrlInput = document.getElementById("apiBaseUrl");
    this.modeMockRadio = document.getElementById("modeMock");
    this.modeApiRadio = document.getElementById("modeApi");
    this.modalConnStatus = document.getElementById("modalConnectionStatus");

    // Learn Modal
    this.learnModal = document.getElementById("learnModal");
    this.closeLearnBtn = document.getElementById("closeLearnBtn");
    this.gotItLearnBtn = document.getElementById("gotItLearnBtn");

    // Playground
    this.reqMethod = document.getElementById("reqMethod");
    this.reqUrl = document.getElementById("reqUrl");
    this.reqBody = document.getElementById("reqBody");
    this.sendReqBtn = document.getElementById("sendReqBtn");
    this.responseStatusBadge = document.getElementById("responseStatusBadge");
    this.responseTime = document.getElementById("responseTime");
    this.statusCode = document.getElementById("statusCode");
    this.responseDBEngine = document.getElementById("responseDBEngine");
    this.playgroundSQLText = document.getElementById("playgroundSQLText");
    this.responseBody = document.getElementById("responseBody");

    // Schema
    this.schemaTablesGrid = document.getElementById("schemaTablesGrid");
    this.refreshSchemaBtn = document.getElementById("refreshSchemaBtn");

    // Blueprint Copy Code
    this.copyCodeBtn = document.getElementById("copyCodeBtn");
    this.pythonCodeSnippet = document.getElementById("pythonCodeSnippet");

    // AI Chatbot Assistant
    this.aiChatMessages = document.getElementById("aiChatMessages");
    this.aiChatForm = document.getElementById("aiChatForm");
    this.aiChatInput = document.getElementById("aiChatInput");
    this.aiChatSendBtn = document.getElementById("aiChatSendBtn");
    this.aiFloatingBtn = document.getElementById("aiFloatingBtn");
    this.chatHistory = [];
  }

  // --- Theme Switcher (Dark & Light) ---
  initTheme() {
    const savedTheme = localStorage.getItem("fastapi_hub_theme") || "dark";
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem("fastapi_hub_theme", theme);

    if (this.themeIcon) {
      this.themeIcon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    }
    if (window.lucide) window.lucide.createIcons();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    this.showToast(`Switched to ${newTheme.toUpperCase()} theme`, "info");
  }

  toggleThemeWithAnimation(e) {
    const btn = this.themeToggleBtn;
    const rect = btn ? btn.getBoundingClientRect() : { left: window.innerWidth / 2, top: 40, width: 32, height: 32 };
    const x = e && e.clientX ? e.clientX : rect.left + rect.width / 2;
    const y = e && e.clientY ? e.clientY : rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        this.toggleTheme();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 550,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      });
    } else {
      this.createRippleEffect(x, y);
      this.toggleTheme();
    }
  }

  createRippleEffect(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "theme-ripple-wave";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  bindEvents() {
    // Theme Switcher Event
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", (e) => this.toggleThemeWithAnimation(e));
    }

    // Hero Action
    if (this.startLabHeroBtn) {
      this.startLabHeroBtn.addEventListener("click", () => this.switchTab("lab"));
    }

    // Navigation Tabs
    document.querySelectorAll(".tab-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });

    // Module Card Click Listeners
    document.querySelectorAll(".module-card").forEach(card => {
      card.addEventListener("click", () => {
        const modKey = card.getAttribute("data-module");
        this.openModuleDetail(modKey);
      });
    });

    if (this.closeDetailBtn) {
      this.closeDetailBtn.addEventListener("click", () => {
        this.moduleDetailCard.classList.add("hidden");
      });
    }

    if (this.copyModuleCodeBtn) {
      this.copyModuleCodeBtn.addEventListener("click", () => {
        const textToCopy = this.moduleDetailCode.innerText || this.moduleDetailCode.textContent;
        navigator.clipboard.writeText(textToCopy);
        this.showToast("Module code snippet copied!", "success");
      });
    }

    if (this.tryInLabBtn) {
      this.tryInLabBtn.addEventListener("click", () => {
        this.moduleDetailCard.classList.add("hidden");
        this.switchTab("lab");
      });
    }

    // Architecture Step Click Listeners
    document.querySelectorAll(".arch-step").forEach(stepEl => {
      stepEl.addEventListener("click", () => {
        const step = stepEl.getAttribute("data-flow-step");
        document.querySelectorAll(".arch-step").forEach(s => s.classList.remove("active"));
        stepEl.classList.add("active");

        if (FLOW_EXPLANATIONS[step] && this.archExplainerText) {
          this.archExplainerText.innerHTML = FLOW_EXPLANATIONS[step];
        }

        const dockMap = { request: "request", pydantic: "schema", router: "request", sql: "sql", response: "json" };
        this.switchDockTab(dockMap[step] || "sql");
      });
    });

    // Terminal Dock Tabs
    document.querySelectorAll(".dock-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const targetDock = tab.getAttribute("data-dock");
        this.switchDockTab(targetDock);
      });
    });

    // Learn Modal Trigger & Controls
    if (this.openLearnBtn) this.openLearnBtn.addEventListener("click", () => this.openLearnModal());
    if (this.closeLearnBtn) this.closeLearnBtn.addEventListener("click", () => this.closeLearnModal());
    if (this.gotItLearnBtn) this.gotItLearnBtn.addEventListener("click", () => this.closeLearnModal());

    document.querySelectorAll(".learn-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".learn-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".learn-content-pane").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.getAttribute("data-learn");
        const pane = document.getElementById(`learn-${target}`);
        if (pane) pane.classList.add("active");
      });
    });

    // Search and filters
    this.searchInput.addEventListener("input", () => this.renderItems());
    this.categoryFilter.addEventListener("change", () => this.renderItems());
    this.statusFilter.addEventListener("change", () => this.renderItems());

    // Item modal handlers
    this.newItemBtn.addEventListener("click", () => this.openItemModal());
    this.emptyStateAddBtn.addEventListener("click", () => this.openItemModal());
    this.closeModalBtn.addEventListener("click", () => this.closeItemModal());
    this.cancelModalBtn.addEventListener("click", () => this.closeItemModal());
    this.itemForm.addEventListener("submit", (e) => this.handleItemSubmit(e));

    // Settings modal handlers
    this.statusPill.addEventListener("click", () => this.openSettingsModal());
    if (this.openSettingsBtn) this.openSettingsBtn.addEventListener("click", () => this.openSettingsModal());
    this.closeSettingsBtn.addEventListener("click", () => this.closeSettingsModal());
    this.saveSettingsBtn.addEventListener("click", () => this.saveSettings());
    this.testConnBtn.addEventListener("click", () => this.testBackendConnection());

    // Playground Presets & Send
    document.querySelectorAll("[data-preset]").forEach(chip => {
      chip.addEventListener("click", (e) => this.loadPlaygroundPreset(e.target.dataset.preset));
    });
    this.sendReqBtn.addEventListener("click", () => this.executePlaygroundRequest());

    // Refresh Schema
    if (this.refreshSchemaBtn) {
      this.refreshSchemaBtn.addEventListener("click", () => this.fetchDBSchema());
    }

    // Blueprint Copy Code
    if (this.copyCodeBtn) {
      this.copyCodeBtn.addEventListener("click", () => {
        const text = this.pythonCodeSnippet.innerText || this.pythonCodeSnippet.textContent;
        navigator.clipboard.writeText(text);
        this.showToast("FastAPI main.py code copied to clipboard!", "success");
      });
    }

    // AI Chatbot Event Handlers
    if (this.aiChatForm) {
      this.aiChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAIChatSubmit();
      });
    }

    document.querySelectorAll(".ai-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        if (this.aiChatInput) {
          this.aiChatInput.value = prompt;
          this.handleAIChatSubmit();
        }
      });
    });

    if (this.aiFloatingBtn) {
      this.aiFloatingBtn.addEventListener("click", () => {
        this.switchTab("ai");
        const aiTabBtn = document.querySelector(`.tab-item[data-tab="ai"]`);
        if (aiTabBtn) aiTabBtn.scrollIntoView({ behavior: "smooth" });
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --- AI Chatbot Assistant Methods ---
  async handleAIChatSubmit() {
    if (!this.aiChatInput || !this.aiChatMessages) return;
    const userMsg = this.aiChatInput.value.trim();
    if (!userMsg) return;

    this.appendChatMessage("user", userMsg);
    this.aiChatInput.value = "";
    if (this.aiChatSendBtn) this.aiChatSendBtn.disabled = true;

    const loadingId = this.appendChatLoading();

    try {
      const res = await fetch(`${this.config.baseUrl}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: this.chatHistory.slice(-6)
        })
      });

      this.removeChatLoading(loadingId);

      if (res.ok) {
        const data = await res.json();
        this.appendChatMessage("ai", data.reply, data.source);
        this.chatHistory.push({ role: "user", content: userMsg });
        this.chatHistory.push({ role: "assistant", content: data.reply });
      } else {
        const errData = await res.json().catch(() => ({}));
        this.appendChatMessage("ai", `⚠️ **API Note (${res.status})**: ${errData.detail || "Unable to reach Groq Cloud AI inference endpoint."}`);
      }
    } catch (err) {
      this.removeChatLoading(loadingId);
      this.appendChatMessage("ai", `**FastAPI Assistant Note:**\n\nI can help you build your FastAPI application! Here is a tip on **${userMsg}**:\n\nIn FastAPI, always ensure your endpoints use ` + "`Depends(get_db)`" + ` for automatic database session cleanup, and ` + "`BaseModel`" + ` schemas for validation!`, "Local Knowledge Helper");
    } finally {
      if (this.aiChatSendBtn) this.aiChatSendBtn.disabled = false;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  appendChatMessage(role, text, source = null) {
    if (!this.aiChatMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${role === 'user' ? 'user-msg' : 'ai-msg'}`;
    
    const formattedText = this.formatMarkdownText(text);
    const sourceTag = source ? `<div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.4rem;">Powered by ${source}</div>` : '';

    msgDiv.innerHTML = `
      <div class="chat-avatar"><i data-lucide="${role === 'user' ? 'user' : 'bot'}"></i></div>
      <div class="chat-bubble">
        ${formattedText}
        ${sourceTag}
      </div>
    `;

    this.aiChatMessages.appendChild(msgDiv);
    this.aiChatMessages.scrollTop = this.aiChatMessages.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }

  appendChatLoading() {
    if (!this.aiChatMessages) return null;
    const id = `loading-${Date.now()}`;
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-msg ai-msg";
    msgDiv.id = id;
    msgDiv.innerHTML = `
      <div class="chat-avatar"><i data-lucide="bot"></i></div>
      <div class="chat-bubble">
        <span class="tok-comment">// Querying Groq Llama-3.3-70B & Tavily Knowledge Engine...</span>
      </div>
    `;
    this.aiChatMessages.appendChild(msgDiv);
    this.aiChatMessages.scrollTop = this.aiChatMessages.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
    return id;
  }

  removeChatLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  formatMarkdownText(txt) {
    if (!txt) return "";
    let html = txt
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre><code>${p1.trim()}</code></pre>`)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
    return html;
  }

  switchTab(targetTab) {
    document.querySelectorAll(".tab-item").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
    
    const navBtn = document.querySelector(`.tab-item[data-tab="${targetTab}"]`);
    const targetPane = document.getElementById(`tab-${targetTab}`);
    
    if (navBtn) navBtn.classList.add("active");
    if (targetPane) targetPane.classList.add("active");
    if (targetTab === "schema") this.fetchDBSchema();
  }

  openModuleDetail(modKey) {
    const data = MODULE_DATA[modKey];
    if (!data || !this.moduleDetailCard) return;

    this.activeModule = modKey;
    this.moduleDetailTag.textContent = `Module ${data.num} • ${data.tag}`;
    this.moduleDetailTitle.textContent = data.title;
    this.moduleDetailTheory.innerHTML = data.theory;
    this.moduleDetailCode.innerHTML = data.code;

    this.moduleDetailCard.classList.remove("hidden");
    this.moduleDetailCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  switchDockTab(targetDock) {
    document.querySelectorAll(".dock-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".dock-pane").forEach(p => p.classList.remove("active"));
    
    const tabEl = document.querySelector(`.dock-tab[data-dock="${targetDock}"]`);
    const paneEl = document.getElementById(`dock-${targetDock}`);
    
    if (tabEl) tabEl.classList.add("active");
    if (paneEl) paneEl.classList.add("active");
  }

  updateStatusBadge() {
    if (this.config.mode === "api") {
      this.statusDot.className = "status-indicator online";
      this.statusText.textContent = "Live API";
      if (this.modeApiRadio) this.modeApiRadio.checked = true;
    } else {
      this.statusDot.className = "status-indicator offline";
      this.statusText.textContent = "Demo Mode";
      if (this.modeMockRadio) this.modeMockRadio.checked = true;
      this.activeDBEngine = "Mock Storage";
    }
    this.apiBaseUrlInput.value = this.config.baseUrl;
  }

  saveMockItems() {
    localStorage.setItem("fastapi_hub_items", JSON.stringify(this.items));
  }

  // --- Terminal Dock Inspector Updates ---
  updateDockInspector({ method, url, payload, pydanticSchema, sqlQuery, dbEngine, duration, status, jsonResponse }) {
    this.stepSQLCode.innerHTML = this.highlightSQL(sqlQuery || "SELECT items.id, items.title, items.description, items.completed FROM items ORDER BY items.id ASC;");
    this.stepClientDetail.innerHTML = `Method: <strong class="tok-decorator">${method}</strong> | Path: <code>${url}</code>${payload ? ` | Payload: <code>${JSON.stringify(payload)}</code>` : ''}`;
    this.stepFastAPIDetail.innerHTML = `Pydantic Validation: <strong class="tok-type">${pydanticSchema || 'ItemCreate'}</strong> (<span class="tok-keyword">Passed 200</span>)`;
    this.pipelineStatus.textContent = status || "200 OK";
    this.pipelineTime.textContent = `${duration || 10}ms`;
    if (this.pipelineJSONPreview) {
      this.pipelineJSONPreview.innerHTML = this.highlightJSON(jsonResponse);
    }
  }

  // --- CRUD Operations ---
  async refreshItems() {
    const startTime = performance.now();
    if (this.config.mode === "api") {
      try {
        const res = await fetch(`${this.config.baseUrl}/api/v1/items`);
        const duration = Math.round(performance.now() - startTime);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

        const engineHeader = res.headers.get("X-DB-Engine") || "PostgreSQL";
        const sqlHeader = res.headers.get("X-SQL-Executed") || "SELECT * FROM items ORDER BY items.id ASC;";

        this.activeDBEngine = engineHeader;
        const data = await res.json();
        this.items = data;

        this.updateDockInspector({
          method: "GET",
          url: "/api/v1/items",
          pydanticSchema: "list[ItemResponse]",
          sqlQuery: sqlHeader,
          dbEngine: engineHeader,
          duration: duration,
          status: `${res.status} OK`,
          jsonResponse: data
        });

      } catch (err) {
        console.warn("Could not connect to FastAPI server:", err);
        this.updateDockInspector({
          method: "GET",
          url: "/api/v1/items",
          pydanticSchema: "list[ItemResponse]",
          sqlQuery: "SELECT * FROM mock_storage_items;",
          dbEngine: "Mock Storage",
          duration: 3,
          status: "200 Mock",
          jsonResponse: this.items
        });
      }
    } else {
      this.updateDockInspector({
        method: "GET",
        url: "/api/v1/items",
        pydanticSchema: "list[ItemResponse]",
        sqlQuery: "SELECT * FROM local_storage_items ORDER BY id ASC;",
        dbEngine: "Mock Storage",
        duration: 4,
        status: "200 OK (Mock)",
        jsonResponse: this.items
      });
    }

    this.renderItems();
  }

  renderItems() {
    const search = this.searchInput.value.toLowerCase().trim();
    const cat = this.categoryFilter.value;
    const status = this.statusFilter.value;

    const filtered = this.items.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search) || 
                          (item.description && item.description.toLowerCase().includes(search));
      const matchCat = cat === "ALL" || item.category === cat;
      const matchStatus = status === "ALL" || 
                          (status === "completed" && item.completed) || 
                          (status === "pending" && !item.completed);
      return matchSearch && matchCat && matchStatus;
    });

    this.updateStats();

    if (filtered.length === 0) {
      this.itemsTableBody.innerHTML = "";
      this.emptyState.classList.remove("hidden");
      return;
    }

    this.emptyState.classList.add("hidden");

    const categoryTagMap = {
      Learning: "tag-blue",
      Project: "tag-purple",
      Work: "tag-coral",
      Personal: "tag-green"
    };

    this.itemsTableBody.innerHTML = filtered.map(item => {
      const tagClass = categoryTagMap[item.category] || "tag-blue";
      return `
        <tr data-id="${item.id}">
          <td>
            <input type="checkbox" class="toggle-checkbox" ${item.completed ? 'checked' : ''} />
          </td>
          <td class="font-mono text-muted">#${item.id}</td>
          <td>
            <div class="row-title">${this.escapeHtml(item.title)}</div>
            <div class="row-desc">${this.escapeHtml(item.description || 'No description provided.')}</div>
          </td>
          <td>
            <span class="tag-badge ${tagClass}">${this.escapeHtml(item.category || 'General')}</span>
          </td>
          <td>
            <span class="tag-badge tag-amber">${this.escapeHtml(item.priority || 'Medium')}</span>
          </td>
          <td>
            <span class="status-badge ${item.completed ? 'completed' : 'pending'}">
              <span class="dot"></span> ${item.completed ? 'Completed' : 'Pending'}
            </span>
          </td>
          <td class="text-right">
            <div class="table-actions">
              <button class="btn-icon edit-btn" title="Edit Item"><i data-lucide="edit-2"></i></button>
              <button class="btn-icon delete-btn" title="Delete Item"><i data-lucide="trash-2"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    this.itemsTableBody.querySelectorAll("tr").forEach(row => {
      const id = parseInt(row.dataset.id, 10);
      row.querySelector(".toggle-checkbox").addEventListener("change", () => this.toggleItemStatus(id));
      row.querySelector(".edit-btn").addEventListener("click", () => this.openItemModal(id));
      row.querySelector(".delete-btn").addEventListener("click", () => this.deleteItem(id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  updateStats() {
    const total = this.items.length;
    const completed = this.items.filter(i => i.completed).length;
    const pending = total - completed;

    this.statTotal.textContent = total;
    this.statCompleted.textContent = completed;
    this.statPending.textContent = pending;
    this.statEngine.textContent = this.activeDBEngine;
  }

  async handleItemSubmit(e) {
    e.preventDefault();
    const payload = {
      title: this.itemTitleInput.value.trim(),
      description: this.itemDescInput.value.trim(),
      category: this.itemCatInput.value,
      priority: this.itemPriInput.value,
      completed: this.itemCompInput.checked
    };

    const startTime = performance.now();

    if (this.editingItemId) {
      if (this.config.mode === "api") {
        try {
          const res = await fetch(`${this.config.baseUrl}/api/v1/items/${this.editingItemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          const duration = Math.round(performance.now() - startTime);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const updatedObj = await res.json();

          this.updateDockInspector({
            method: "PUT",
            url: `/api/v1/items/${this.editingItemId}`,
            payload: payload,
            pydanticSchema: "ItemCreate -> ItemResponse",
            sqlQuery: `UPDATE items SET title='${payload.title}', completed=${payload.completed} WHERE items.id = ${this.editingItemId};`,
            dbEngine: this.activeDBEngine,
            duration: duration,
            status: `${res.status} OK`,
            jsonResponse: updatedObj
          });

          this.showToast(`Updated item #${this.editingItemId} in database`, "success");
        } catch (err) {
          this.showToast(`FastAPI Update Failed: ${err.message}`, "error");
        }
      } else {
        const idx = this.items.findIndex(i => i.id === this.editingItemId);
        if (idx !== -1) {
          this.items[idx] = { ...this.items[idx], ...payload };
          this.saveMockItems();
          this.updateDockInspector({
            method: "PUT",
            url: `/api/v1/items/${this.editingItemId}`,
            payload: payload,
            pydanticSchema: "ItemCreate (Mock)",
            sqlQuery: `UPDATE mock_items SET title='${payload.title}' WHERE id=${this.editingItemId};`,
            dbEngine: "Mock Storage",
            duration: 5,
            status: "200 OK (Mock)",
            jsonResponse: this.items[idx]
          });
          this.showToast("Updated item in Mock Storage", "success");
        }
      }
    } else {
      if (this.config.mode === "api") {
        try {
          const res = await fetch(`${this.config.baseUrl}/api/v1/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          const duration = Math.round(performance.now() - startTime);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const newObj = await res.json();

          this.updateDockInspector({
            method: "POST",
            url: "/api/v1/items",
            payload: payload,
            pydanticSchema: "ItemCreate -> ItemResponse",
            sqlQuery: `INSERT INTO items (title, description, category, priority, completed) VALUES ('${payload.title}', ...);`,
            dbEngine: this.activeDBEngine,
            duration: duration,
            status: `${res.status} Created`,
            jsonResponse: newObj
          });

          this.showToast(`Created item #${newObj.id} via FastAPI & DB`, "success");
        } catch (err) {
          this.showToast(`FastAPI Create Failed: ${err.message}`, "error");
        }
      } else {
        const newId = this.items.reduce((max, i) => i.id > max ? i.id : max, 0) + 1;
        const newItem = { id: newId, ...payload, created_at: new Date().toISOString() };
        this.items.unshift(newItem);
        this.saveMockItems();
        this.updateDockInspector({
          method: "POST",
          url: "/api/v1/items",
          payload: payload,
          pydanticSchema: "ItemCreate (Mock)",
          sqlQuery: `INSERT INTO mock_items (title) VALUES ('${payload.title}');`,
          dbEngine: "Mock Storage",
          duration: 6,
          status: "201 Created (Mock)",
          jsonResponse: newItem
        });
        this.showToast("Created item in Mock Storage", "success");
      }
    }

    this.closeItemModal();
    this.refreshItems();
  }

  async toggleItemStatus(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    const updatedPayload = {
      title: item.title,
      description: item.description,
      category: item.category,
      priority: item.priority,
      completed: !item.completed
    };

    const startTime = performance.now();

    if (this.config.mode === "api") {
      try {
        const res = await fetch(`${this.config.baseUrl}/api/v1/items/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload)
        });
        const duration = Math.round(performance.now() - startTime);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updatedObj = await res.json();

        this.updateDockInspector({
          method: "PUT",
          url: `/api/v1/items/${id}`,
          payload: updatedPayload,
          pydanticSchema: "ItemCreate -> ItemResponse",
          sqlQuery: `UPDATE items SET completed=${updatedPayload.completed} WHERE items.id = ${id};`,
          dbEngine: this.activeDBEngine,
          duration: duration,
          status: "200 OK",
          jsonResponse: updatedObj
        });

      } catch (err) {
        this.showToast(`FastAPI Toggle Failed: ${err.message}`, "error");
      }
    } else {
      item.completed = !item.completed;
      this.saveMockItems();
      this.updateDockInspector({
        method: "PUT",
        url: `/api/v1/items/${id}`,
        payload: updatedPayload,
        pydanticSchema: "ItemCreate (Mock)",
        sqlQuery: `UPDATE mock_items SET completed=${item.completed} WHERE id=${id};`,
        dbEngine: "Mock Storage",
        duration: 4,
        status: "200 OK (Mock)",
        jsonResponse: item
      });
    }

    this.showToast(`Item #${id} status updated`, "info");
    this.refreshItems();
  }

  async deleteItem(id) {
    if (!confirm(`Are you sure you want to delete item #${id}?`)) return;

    const startTime = performance.now();

    if (this.config.mode === "api") {
      try {
        const res = await fetch(`${this.config.baseUrl}/api/v1/items/${id}`, {
          method: "DELETE"
        });
        const duration = Math.round(performance.now() - startTime);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        this.updateDockInspector({
          method: "DELETE",
          url: `/api/v1/items/${id}`,
          pydanticSchema: "Dict[detail]",
          sqlQuery: `DELETE FROM items WHERE items.id = ${id};`,
          dbEngine: this.activeDBEngine,
          duration: duration,
          status: "200 OK",
          jsonResponse: data
        });

        this.showToast(`Deleted item #${id} from database`, "success");
      } catch (err) {
        this.showToast(`FastAPI Delete Failed: ${err.message}`, "error");
      }
    } else {
      this.items = this.items.filter(i => i.id !== id);
      this.saveMockItems();
      this.updateDockInspector({
        method: "DELETE",
        url: `/api/v1/items/${id}`,
        pydanticSchema: "Dict[detail] (Mock)",
        sqlQuery: `DELETE FROM mock_items WHERE id=${id};`,
        dbEngine: "Mock Storage",
        duration: 5,
        status: "200 OK (Mock)",
        jsonResponse: { detail: `Item #${id} deleted` }
      });
      this.showToast(`Deleted item #${id} from Mock Storage`, "info");
    }

    this.refreshItems();
  }

  // --- DB Schema Inspection (Tab 3) ---
  async fetchDBSchema() {
    if (!this.schemaTablesGrid) return;
    
    const btn = this.refreshSchemaBtn;
    if (btn) {
      btn.classList.add("is-refreshing");
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="rotate-cw"></i> Refreshing...`;
      if (window.lucide) window.lucide.createIcons();
    }

    try {
      if (this.config.mode === "api") {
        const res = await fetch(`${this.config.baseUrl}/api/v1/db/schema`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const schema = await res.json();
        this.renderDBSchema(schema);
      } else {
        this.renderMockDBSchema();
      }
      this.showToast("Database schema refreshed!", "success");
    } catch (err) {
      this.renderMockDBSchema();
      this.showToast("Schema refreshed (Mock Storage)", "info");
    } finally {
      setTimeout(() => {
        if (btn) {
          btn.classList.remove("is-refreshing");
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="rotate-cw"></i> Refresh Schema`;
          if (window.lucide) window.lucide.createIcons();
        }
      }, 600);
    }
  }

  renderDBSchema(schema) {
    this.schemaTablesGrid.innerHTML = schema.tables.map(table => `
      <div class="schema-table-card">
        <div class="schema-table-header">
          <span class="schema-table-title"><i data-lucide="table"></i> ${table.name}</span>
          <span class="tag-badge tag-purple">Relational Table</span>
        </div>
        <div class="schema-cols-list">
          ${table.columns.map(col => `
            <div class="schema-col-item">
              <span class="schema-col-name">${col.name} ${col.primary_key ? '<span class="tag-badge tag-amber">[PK]</span>' : ''}</span>
              <span class="schema-col-type">${col.type}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  renderMockDBSchema() {
    this.schemaTablesGrid.innerHTML = `
      <div class="schema-table-card">
        <div class="schema-table-header">
          <span class="schema-table-title"><i data-lucide="table"></i> items (PostgreSQL / SQLite)</span>
          <span class="tag-badge tag-purple">Relational Table</span>
        </div>
        <div class="schema-cols-list">
          <div class="schema-col-item"><span class="schema-col-name">id <span class="tag-badge tag-amber">[PK]</span></span><span class="schema-col-type">INTEGER</span></div>
          <div class="schema-col-item"><span class="schema-col-name">title</span><span class="schema-col-type">VARCHAR</span></div>
          <div class="schema-col-item"><span class="schema-col-name">description</span><span class="schema-col-type">VARCHAR</span></div>
          <div class="schema-col-item"><span class="schema-col-name">category</span><span class="schema-col-type">VARCHAR</span></div>
          <div class="schema-col-item"><span class="schema-col-name">priority</span><span class="schema-col-type">VARCHAR</span></div>
          <div class="schema-col-item"><span class="schema-col-name">completed</span><span class="schema-col-type">BOOLEAN</span></div>
          <div class="schema-col-item"><span class="schema-col-name">created_at</span><span class="schema-col-type">TIMESTAMP</span></div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- Learn Modal ---
  openLearnModal() {
    if (this.learnModal) this.learnModal.classList.remove("hidden");
  }

  closeLearnModal() {
    if (this.learnModal) this.learnModal.classList.add("hidden");
  }

  // --- Modals ---
  openItemModal(id = null) {
    this.editingItemId = id;
    if (id) {
      const item = this.items.find(i => i.id === id);
      if (item) {
        this.modalTitle.textContent = `Edit Item #${item.id}`;
        this.itemIdInput.value = item.id;
        this.itemTitleInput.value = item.title;
        this.itemDescInput.value = item.description || "";
        this.itemCatInput.value = item.category || "Learning";
        this.itemPriInput.value = item.priority || "Medium";
        this.itemCompInput.checked = !!item.completed;
      }
    } else {
      this.modalTitle.textContent = "Add New Item";
      this.itemForm.reset();
      this.itemIdInput.value = "";
      this.itemCatInput.value = "Learning";
      this.itemPriInput.value = "Medium";
    }
    this.itemModal.classList.remove("hidden");
  }

  closeItemModal() {
    this.itemModal.classList.add("hidden");
    this.editingItemId = null;
  }

  openSettingsModal() {
    if (this.config.mode === "api") {
      this.modeApiRadio.checked = true;
    } else {
      this.modeMockRadio.checked = true;
    }
    this.apiBaseUrlInput.value = this.config.baseUrl || "https://fastapi-lrtn.onrender.com";
    this.settingsModal.classList.remove("hidden");
  }

  closeSettingsModal() {
    this.settingsModal.classList.add("hidden");
  }

  saveSettings() {
    const isApiMode = this.modeApiRadio.checked;
    this.config.mode = isApiMode ? "api" : "mock";
    this.config.baseUrl = this.apiBaseUrlInput.value.trim().replace(/\/+$/, "");

    localStorage.setItem("fastapi_hub_config", JSON.stringify(this.config));
    this.updateStatusBadge();
    this.closeSettingsModal();
    this.showToast(`Configuration saved. Mode: ${this.config.mode.toUpperCase()}`, "success");
    this.refreshItems();
  }

  async testBackendConnection() {
    const url = this.apiBaseUrlInput.value.trim().replace(/\/+$/, "");
    this.modalConnStatus.innerHTML = `Connecting to ${url}/health ...`;

    try {
      const startTime = performance.now();
      const res = await fetch(`${url}/health`, { 
        method: "GET", 
        mode: "cors",
        headers: { "Accept": "application/json" } 
      });
      const elapsed = Math.round(performance.now() - startTime);

      if (res.ok) {
        const data = await res.json();
        this.activeDBEngine = data.engine || "PostgreSQL";
        this.modalConnStatus.innerHTML = `
          <span>
            🟢 Connection Successful (${elapsed}ms) | DB Engine: <strong>${this.activeDBEngine}</strong>
          </span>
        `;
      } else {
        this.modalConnStatus.innerHTML = `
          <span>
            🟡 Server responded with status ${res.status}
          </span>
        `;
      }
    } catch (err) {
      this.modalConnStatus.innerHTML = `
        <span>
          🔴 Connection Failed. Ensure FastAPI is running on ${url}
        </span>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --- API Playground (Tab 4) ---
  loadPlaygroundPreset(preset) {
    switch (preset) {
      case "GET_ALL":
        this.reqMethod.value = "GET";
        this.reqUrl.value = "/api/v1/items";
        this.reqBody.value = "";
        break;
      case "GET_ONE":
        this.reqMethod.value = "GET";
        this.reqUrl.value = "/api/v1/items/1";
        this.reqBody.value = "";
        break;
      case "POST":
        this.reqMethod.value = "POST";
        this.reqUrl.value = "/api/v1/items";
        this.reqBody.value = JSON.stringify({
          title: "Build REST API with Pydantic & FastAPI",
          description: "Use FastAPI to validate incoming JSON automatically",
          category: "Learning",
          priority: "High",
          completed: false
        }, null, 2);
        break;
      case "PUT":
        this.reqMethod.value = "PUT";
        this.reqUrl.value = "/api/v1/items/1";
        this.reqBody.value = JSON.stringify({
          title: "Setup FastAPI Environment (Updated)",
          description: "Updated item details via PUT request",
          category: "Learning",
          priority: "Medium",
          completed: true
        }, null, 2);
        break;
      case "DELETE":
        this.reqMethod.value = "DELETE";
        this.reqUrl.value = "/api/v1/items/1";
        this.reqBody.value = "";
        break;
      case "HEALTH":
        this.reqMethod.value = "GET";
        this.reqUrl.value = "/health";
        this.reqBody.value = "";
        break;
    }
  }

  async executePlaygroundRequest() {
    const method = this.reqMethod.value;
    const endpoint = this.reqUrl.value;
    const rawBody = this.reqBody.value.trim();
    const fullUrl = `${this.config.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    this.responseStatusBadge.innerHTML = `<span class="status-code-2xx">Executing...</span>`;
    this.responseBody.innerHTML = `<span class="tok-comment">// Executing HTTP request...</span>`;

    const startTime = performance.now();

    if (this.config.mode === "mock") {
      setTimeout(() => {
        const elapsed = Math.round(performance.now() - startTime);
        this.responseTime.textContent = `${elapsed}ms`;
        this.statusCode.innerHTML = `<span class="status-code-2xx">200 OK (Simulated)</span>`;
        this.responseDBEngine.textContent = "Mock Storage";
        this.responseStatusBadge.innerHTML = `<span class="status-code-2xx">200 OK</span>`;
        this.playgroundSQLText.innerHTML = this.highlightSQL(`SELECT * FROM items ORDER BY items.id ASC;`);

        let responseData = { message: "Simulated response in Demo Mode", method, endpoint };
        if (endpoint.includes("/items")) responseData = this.items;
        else if (endpoint.includes("/health")) responseData = { status: "ok", mode: "Demo Mode (Mock)" };

        this.responseBody.innerHTML = this.highlightJSON(responseData);
      }, 120);
      return;
    }

    try {
      const options = { method, headers: { "Content-Type": "application/json" } };
      if (["POST", "PUT"].includes(method) && rawBody) {
        options.body = rawBody;
      }

      const res = await fetch(fullUrl, options);
      const elapsed = Math.round(performance.now() - startTime);
      const isSuccess = res.status >= 200 && res.status < 300;
      const statusCls = isSuccess ? "status-code-2xx" : (res.status < 500 ? "status-code-4xx" : "status-code-5xx");

      this.responseTime.textContent = `${elapsed}ms`;
      this.statusCode.innerHTML = `<span class="${statusCls}">${res.status} ${res.statusText || 'OK'}</span>`;

      const sqlHeader = res.headers.get("X-SQL-Executed") || `SELECT * FROM items ORDER BY items.id ASC;`;
      const dbHeader = res.headers.get("X-DB-Engine") || this.activeDBEngine;

      this.responseDBEngine.textContent = dbHeader;
      this.playgroundSQLText.innerHTML = this.highlightSQL(sqlHeader);
      this.responseStatusBadge.innerHTML = `<span class="${statusCls}">${res.status} ${isSuccess ? 'OK' : 'Error'}</span>`;

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const json = await res.json();
        this.responseBody.innerHTML = this.highlightJSON(json);
      } else {
        const text = await res.text();
        this.responseBody.innerHTML = `<span class="tok-string">${this.escapeHtml(text || "(Empty Response)")}</span>`;
      }
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      this.responseTime.textContent = `${elapsed}ms`;
      this.statusCode.innerHTML = `<span class="status-code-5xx">Network Error</span>`;
      this.responseStatusBadge.innerHTML = `<span class="status-code-5xx">Failed</span>`;
      this.responseBody.innerHTML = this.highlightJSON({ error: `Failed to fetch from ${fullUrl}`, message: err.message });
    }
  }

  highlightJSON(json) {
    if (json === undefined || json === null) return `<span class="tok-comment">null</span>`;
    let str = typeof json !== 'string' ? JSON.stringify(json, null, 2) : json;
    const escaped = this.escapeHtml(str);
    return escaped.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'tok-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'tok-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'tok-keyword';
      } else if (/null/.test(match)) {
        cls = 'tok-comment';
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }

  highlightSQL(sqlStr) {
    if (!sqlStr) return "";
    let esc = this.escapeHtml(sqlStr);
    const keywords = /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|ORDER BY|GROUP BY|LIMIT|OFFSET|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|AS|ASC|DESC|IS|NULL|NOT|CREATE|TABLE|ALTER|DROP)\b/gi;
    esc = esc.replace(keywords, '<span class="tok-keyword">$1</span>');
    esc = esc.replace(/('([^'\\]|\\.)*')/g, '<span class="tok-string">$1</span>');
    esc = esc.replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>');
    return esc;
  }

  // --- Utilities ---
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check' : 'info'}"></i>
      <span>${this.escapeHtml(message)}</span>
    `;
    const container = document.getElementById("toastContainer");
    if (container) {
      container.appendChild(toast);
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => toast.remove(), 3500);
    }
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
