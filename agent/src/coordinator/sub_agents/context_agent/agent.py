"""Context Agent for data gathering"""

from google.adk import Agent
from google.genai import types

from . import prompt
from ...tools.tools import mongodb_tools, calendar_tools, gmail_tools, plaid_tools, maps_tools

MODEL = "gemini-1.5-flash"

# Build tools list for context agent - filter out None and empty lists
tools = []
for tool in [mongodb_tools, calendar_tools, gmail_tools, plaid_tools, maps_tools]:
    if tool is not None and tool != []:
        if isinstance(tool, list):
            tools.extend(tool)
        else:
            tools.append(tool)

context_agent = Agent(
    model=MODEL,
    name="context_agent",
    description="Gathers environmental data including pantry status, calendar, receipts, and financial state",
    instruction=prompt.CONTEXT_AGENT_PROMPT,
    tools=tools,
    generate_content_config=types.GenerateContentConfig(temperature=0.1),
)
