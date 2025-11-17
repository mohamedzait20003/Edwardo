"""Decision Agent for price optimization"""

from google.adk import Agent
from google.genai import types

from . import prompt
from ...tools.tools import mongodb_tools, instacart_tools

MODEL = "gemini-1.5-flash"

# Build tools list for decision agent - filter out None and empty lists
tools = []
for tool in [mongodb_tools, instacart_tools]:
    if tool is not None and tool != []:
        if isinstance(tool, list):
            tools.extend(tool)
        else:
            tools.append(tool)

decision_agent = Agent(
    model=MODEL,
    name="decision_agent",
    description="Compares prices across vendors and selects optimal options",
    instruction=prompt.DECISION_AGENT_PROMPT,
    tools=tools,
    generate_content_config=types.GenerateContentConfig(temperature=0.2),
)
