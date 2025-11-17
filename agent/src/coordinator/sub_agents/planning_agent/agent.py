"""Planning Agent for meal and errand planning"""

from google.adk import Agent
from google.genai import types

from . import prompt
from ...tools.tools import mongodb_tools, calendar_tools, maps_tools

MODEL = "gemini-1.5-flash"

# Build tools list for planning agent - filter out None and empty lists
tools = []
for tool in [mongodb_tools, calendar_tools, maps_tools]:
    if tool is not None and tool != []:
        if isinstance(tool, list):
            tools.extend(tool)
        else:
            tools.append(tool)

planning_agent = Agent(
    model=MODEL,
    name="planning_agent",
    description="Generates meal plans and shopping lists based on context data",
    instruction=prompt.PLANNING_AGENT_PROMPT,
    tools=tools,
    generate_content_config=types.GenerateContentConfig(temperature=0.7),
)
