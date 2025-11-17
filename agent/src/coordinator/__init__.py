"""
Edwardo - Autonomous Life Assistant
Multi-agent system powered by Google ADK and MCP integrations
"""

import os
import asyncio
from rich.console import Console
from rich.panel import Panel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set Google API key for ADK
if os.getenv("GOOGLE_API_KEY"):
    os.environ.setdefault("GOOGLE_GENAI_API_KEY", os.getenv("GOOGLE_API_KEY"))

from .workflows import get_workflow
from .config import settings
from . import agent  # Load agent module

console = Console()


async def main() -> None:
    """Main application entry point"""
    
    # Display welcome banner
    console.print(Panel.fit(
        "[bold cyan]🤖 Edwardo - Autonomous Life Assistant[/bold cyan]\n"
        "Multi-agent orchestration for meal planning, grocery shopping, and errands",
        border_style="cyan"
    ))
    
    console.print(f"\n[dim]Environment: {settings.app_env}[/dim]")
    console.print(f"[dim]Model: {settings.gemini_model}[/dim]\n")
    
    # Demo user
    user_id = "demo_user_001"
    
    # Execute weekly planning workflow
    try:
        weekly_workflow = get_workflow("weekly_planning")(user_id=user_id)
        result = await weekly_workflow.execute()
        
        # Display results
        console.print("\n[bold]📊 Planning Results:[/bold]")
        console.print(f"  • Meals planned: {len(result['meal_plan']['meals'])}")
        console.print(f"  • Grocery items: {len(result['grocery_order']['list']['items'])}")
        console.print(f"  • Total cost: ${result['grocery_order']['total']}")
        console.print(f"  • Errands scheduled: {len(result['errand_schedule']['errands'])}")
        console.print(f"  • Estimated time saved: {result['estimated_savings']['time_saved_hours']} hours")
        console.print(f"  • Estimated money saved: ${result['estimated_savings']['money_saved_dollars']}")
        
        console.print("\n[bold green]✨ Plan is ready for user approval![/bold green]")
        console.print(f"[dim]Workflow ID: {result['workflow_id']}[/dim]\n")
        
        # Simulate approval
        console.print("\n[bold]Simulating user approval...[/bold]")
        approval_workflow = get_workflow("approval")(
            approval_id="appr_12345",
            user_id=user_id
        )
        order_result = await approval_workflow.execute("grocery_order")
        
        console.print(f"  • Order ID: {order_result['order_id']}")
        console.print(f"  • Confirmation: {order_result['confirmation_number']}")
        console.print(f"  • Tracking: {order_result['tracking_url']}")
        
    except Exception as e:
        console.print(f"\n[bold red]Error: {str(e)}[/bold red]")
        raise
    
    console.print("\n[bold cyan]🎉 Demo completed successfully![/bold cyan]\n")


def run():
    """Synchronous wrapper for async main"""
    asyncio.run(main())


if __name__ == "__main__":
    run()

