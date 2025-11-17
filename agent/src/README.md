# 🤖 Edwardo - Autonomous Life Assistant

**Multi-agent orchestration system for intelligent meal planning, grocery shopping, and errand management.**

Built with:
- **Google ADK** (Agent Developer Kit) for multi-agent orchestration
- **MCP** (Model Context Protocol) for external service integrations
- **Gemini 2.0** for intelligent decision-making

---

## 🏗️ Architecture

```
┌─────────────────────────────┐
│   Orchestration Layer       │
│  (Coordinator Agent)        │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼─────────┐  ┌───────▼────┐
│Intelligence │  │  Execution │
│   Layer     │  │   Layer    │
└───┬─────────┘  └────────────┘
    │
┌───┴─────────────────────┐
│  Context  │  Planning  │
│  Agent    │  Agent     │
│           │            │
│ Decision  │  Execution │
│  Agent    │  Agent     │
└─────────────────────────┘
```

### Agents

| Agent | Role | MCP Tools |
|-------|------|-----------|
| **Coordinator** | Workflow orchestration, error handling, user approvals | None (orchestrates others via AgentTool) |
| **Context** | Data gathering from calendar, email, bank, maps | Google Calendar, Gmail, Plaid, Google Maps, MongoDB |
| **Planning** | Meal planning, grocery list compilation, errand scheduling | MongoDB, Google Calendar, Google Maps |
| **Decision** | Price comparison, vendor selection, deal optimization | MongoDB, Instacart, Amazon Fresh, Walmart |
| **Execution** | Order placement, status tracking, email notifications | MongoDB, Instacart, Gmail |

### Project Structure

```
src/edwardo/
├── __init__.py              # Main entry point
├── agent.py                 # Coordinator agent (LlmAgent)
├── prompt.py                # Coordinator system prompt
├── config.py                # Configuration and settings
├── workflows.py             # Workflow orchestration
├── mcp_toolsets.py          # MCP service integrations
├── tools/
│   └── tools.py             # Tool initialization and assignments
└── sub_agents/              # Specialized agents
    ├── __init__.py          # Agent exports and tool assignments
    ├── context_agent/       # Data gathering agent
    ├── planning_agent/      # Meal planning agent
    ├── decision_agent/      # Price optimization agent
    └── execution_agent/     # Order execution agent
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- MongoDB (local or Atlas)
- Google API key for Gemini

### Installation

1. **Clone and navigate:**
   ```bash
   cd /path/to/Edwardo
   ```

2. **Install with uv:**
   ```bash
   uv sync
   ```

3. **Configure environment:**
   ```bash
   cp .env.template .env
   # Edit .env with your API keys
   ```

### Configuration

Required environment variables (`.env`):

```env
# Core
GOOGLE_API_KEY=your_google_api_key
MONGODB_URI=mongodb://localhost:27017

# Optional (for full functionality)
GOOGLE_CALENDAR_CLIENT_ID=...
GMAIL_CLIENT_ID=...
INSTACART_API_KEY=...
GOOGLE_MAPS_API_KEY=...
PLAID_CLIENT_ID=...
```

### Run Demo

```bash
uv run edwardo
```

This will execute a simulated weekly planning workflow demonstrating:
1. Context gathering (calendar, spending patterns, pantry)
2. Meal plan generation (5-7 meals)
3. Grocery list compilation
4. Price comparison across vendors
5. Errand scheduling optimization
6. Order approval and execution

---

## 📚 Usage Examples

### Weekly Planning Workflow

```python
import asyncio
from edwardo.workflows import WeeklyPlanningWorkflow

async def plan_week():
    workflow = WeeklyPlanningWorkflow(user_id="user_123")
    result = await workflow.execute()
    
    print(f"Meals planned: {len(result['meal_plan']['meals'])}")
    print(f"Total cost: ${result['grocery_order']['total']}")
    print(f"Time saved: {result['estimated_savings']['time_saved_hours']} hrs")

asyncio.run(plan_week())
```

### Approval and Execution

```python
from edwardo.workflows import ApprovalWorkflow

async def approve_order():
    workflow = ApprovalWorkflow(
        approval_id="appr_12345",
        user_id="user_123"
    )
    result = await workflow.execute("grocery_order")
    
    print(f"Order placed: {result['order_id']}")
    print(f"Tracking: {result['tracking_url']}")

asyncio.run(approve_order())
```

### Adaptive Re-planning

```python
from edwardo.workflows import AdaptiveRePlanningWorkflow

async def replan_on_change():
    workflow = AdaptiveRePlanningWorkflow(
        user_id="user_123",
        trigger_reason="pantry_item_depleted"
    )
    result = await workflow.execute(change_data={"item": "milk"})
    
    print(f"Action: {result['action']}")
    print(f"Changes: {result['changes']}")

asyncio.run(replan_on_change())
```

---

## 🛠️ Development

### Project Structure

```
Edwardo/
├── .github/
│   └── copilot-instructions.md
├── src/
│   └── edwardo/
│       ├── __init__.py          # Main entry point
│       ├── config.py             # Settings and environment
│       ├── agents.py             # 5 agent definitions
│       ├── mcp_toolsets.py       # MCP integration wrappers
│       └── workflows.py          # Orchestration workflows
├── .env.template                 # Environment template
├── pyproject.toml                # Dependencies
└── README.md
```

### Adding New Agents

1. Create agent class in `agents.py`:
   ```python
   class MyAgent:
       SYSTEM_INSTRUCTION = "..."
       
       def __init__(self):
           self.model = settings.gemini_model
           self.tools = [...]
       
       def create_agent(self):
           return client.aio.agents.create(...)
   ```

2. Register in `AGENTS` dict:
   ```python
   AGENTS = {
       ...
       "my_agent": MyAgent(),
   }
   ```

### Adding New MCP Integrations

1. Create toolset in `mcp_toolsets.py`:
   ```python
   class MyServiceMCPToolset:
       def get_tools(self) -> List[genai.types.Tool]:
           return [
               genai.types.Tool(
                   function_declarations=[...]
               )
           ]
   ```

2. Add to relevant agent:
   ```python
   my_service = MyServiceMCPToolset(...)
   self.tools.extend(my_service.get_tools())
   ```

---

## 📊 MongoDB Collections

The system uses 8 collections:

| Collection | Purpose |
|------------|---------|
| `users` | User profiles and preferences |
| `pantry_items` | Inventory tracking with depletion estimates |
| `grocery_transactions` | Historical purchase records |
| `meal_plans` | Generated meal plans with status |
| `grocery_lists` | Shopping lists with vendor comparisons |
| `errands` | Scheduled tasks and routes |
| `price_snapshots` | Price history for trend analysis |
| `approvals` | Approval workflow state |

---

## 🧪 Testing

Run the demo to verify setup:

```bash
uv run edwardo
```

Expected output:
- ✓ Coordinator initialized
- ✓ Context gathered
- ✓ Meal plan generated (5+ meals)
- ✓ Grocery list ready
- ✓ Prices compared
- ✓ Errands scheduled
- ✓ Approval workflow executed

---

## 🔐 Security

- API keys stored in `.env` (never committed)
- OAuth tokens encrypted at rest
- MCP connections use secure transports (TLS)
- User data isolated by `user_id`

---

## 📈 Roadmap

**Phase 1 (MVP - Current)**
- ✅ 5-agent architecture
- ✅ Weekly planning workflow
- ✅ MCP integrations (8 providers)
- ✅ Approval workflow
- ✅ Adaptive re-planning

**Phase 2 (Next)**
- [ ] Real MCP server implementations
- [ ] WebSocket status streaming
- [ ] Advanced meal preference learning
- [ ] Multi-vendor cart splitting
- [ ] Frontend dashboard

**Phase 3 (Future)**
- [ ] Voice interface
- [ ] Autonomous execution (no approval)
- [ ] Social features (share meal plans)
- [ ] Recipe import from websites

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open pull request

---

## 📄 License

MIT License - see LICENSE file

---

## 🙏 Acknowledgments

- **Google ADK** for agent orchestration framework
- **Model Context Protocol** for standardized integrations
- **Gemini** for intelligent decision-making

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: mohammedalaa40123@gmail.com

---

**Built with ❤️ by the Edwardo team**
