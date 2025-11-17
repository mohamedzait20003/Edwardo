"""Tools initialization for Edwardo agents"""

from google.adk.tools.mcp_tool import MCPToolset, StdioConnectionParams
from mcp import StdioServerParameters
from ..config import settings

# Initialize MCP toolsets using ADK's MCPToolset with proper server_params

# MongoDB MCP Server
try:
    mongodb_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-mongodb", settings.mongodb_uri],
            )
        )
    )
except Exception as e:
    print(f"Warning: MongoDB MCP server not available: {e}")
    mongodb_tools = None

# Google Calendar MCP Server
try:
    calendar_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-google-calendar"],
                env={
                    "GOOGLE_CALENDAR_CLIENT_ID": settings.google_calendar_client_id,
                    "GOOGLE_CALENDAR_CLIENT_SECRET": settings.google_calendar_client_secret,
                }
            )
        )
    )
except Exception as e:
    print(f"Warning: Google Calendar MCP server not available: {e}")
    calendar_tools = None

# Gmail MCP Server
try:
    gmail_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-gmail"],
                env={
                    "GMAIL_CLIENT_ID": settings.gmail_client_id,
                    "GMAIL_CLIENT_SECRET": settings.gmail_client_secret,
                }
            )
        )
    )
except Exception as e:
    print(f"Warning: Gmail MCP server not available: {e}")
    gmail_tools = None

# Plaid MCP Server
try:
    plaid_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-plaid"],
                env={
                    "PLAID_CLIENT_ID": settings.plaid_client_id,
                    "PLAID_SECRET": settings.plaid_secret,
                    "PLAID_ENV": settings.plaid_env,
                }
            )
        )
    )
except Exception as e:
    print(f"Warning: Plaid MCP server not available: {e}")
    plaid_tools = None

# Google Maps MCP Server
try:
    maps_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-google-maps"],
                env={
                    "GOOGLE_MAPS_API_KEY": settings.google_maps_api_key,
                }
            )
        )
    )
except Exception as e:
    print(f"Warning: Google Maps MCP server not available: {e}")
    maps_tools = None

# Instacart MCP Server (custom - may need different package name)
try:
    instacart_tools = MCPToolset(
        connection_params=StdioConnectionParams(
            server_params=StdioServerParameters(
                command="npx",
                args=["-y", "@modelcontextprotocol/server-instacart"],
                env={
                    "INSTACART_API_KEY": settings.instacart_api_key,
                    "INSTACART_USER_TOKEN": settings.instacart_user_token,
                }
            )
        )
    )
except Exception as e:
    print(f"Warning: Instacart MCP server not available: {e}")
    instacart_tools = None

