"""Execution Agent for order placement and tracking"""

from google.adk import Agent
from google.genai import types

from . import prompt
from ...tools.tools import mongodb_tools, instacart_tools, gmail_tools

MODEL = "gemini-1.5-flash"

# Build tools list for execution agent - filter out None and empty lists
tools = []
for tool in [mongodb_tools, instacart_tools, gmail_tools]:
    if tool is not None and tool != []:
        if isinstance(tool, list):
            tools.extend(tool)
        else:
            tools.append(tool)

execution_agent = Agent(
    model=MODEL,
    name="execution_agent",
    description="Executes orders and tracks delivery status",
    instruction=prompt.EXECUTION_AGENT_PROMPT,
    tools=tools,
    generate_content_config=types.GenerateContentConfig(temperature=0.1),
)
