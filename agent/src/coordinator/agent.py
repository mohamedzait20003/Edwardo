"""Edwardo Coordinator Agent"""

from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai import types

from . import prompt
from .config import settings
from .sub_agents import (
    context_agent,
    planning_agent,
    decision_agent,
    execution_agent,
)

MODEL = settings.gemini_model

coordinator_agent = LlmAgent(
    name="coordinator_agent",
    model=MODEL,
    description="Orchestrates multi-agent workflows for grocery planning and ordering",
    instruction=prompt.COORDINATOR_PROMPT,
    tools=[
        AgentTool(agent=context_agent),
        AgentTool(agent=planning_agent),
        AgentTool(agent=decision_agent),
        AgentTool(agent=execution_agent),
    ],
    generate_content_config=types.GenerateContentConfig(temperature=0.3),
)

root_agent = coordinator_agent
