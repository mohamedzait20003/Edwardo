"""
Edwardo Agent Workflows
Orchestrates multi-agent sequences for key user journeys
"""

from typing import Dict, Any, Optional
import asyncio
from datetime import datetime, timedelta
from .agent import root_agent
from .sub_agents import context_agent, planning_agent, decision_agent, execution_agent
from .config import settings
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn

console = Console()


class WeeklyPlanningWorkflow:
    """
    Full weekly planning cycle workflow
    Sequence: Coordinator → Context → Planning → Decision → Coordinator
    """
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.workflow_id = f"weekly_plan_{user_id}_{datetime.now().isoformat()}"
        self.status = {}
        
    async def execute(self) -> Dict[str, Any]:
        """Execute full weekly planning workflow"""
        console.print(f"\n[bold cyan]🚀 Starting Weekly Planning Workflow[/bold cyan]")
        console.print(f"User ID: {self.user_id}")
        console.print(f"Workflow ID: {self.workflow_id}\n")
        
        try:
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                console=console
            ) as progress:
                
                # Step 1: Coordinator initialization
                task1 = progress.add_task("[cyan]Initializing coordinator...", total=None)
                coordinator = root_agent
                self.status["coordinator"] = "initialized"
                progress.update(task1, description="[green]✓ Coordinator ready")
                await asyncio.sleep(0.5)
                
                # Step 2: Context gathering
                task2 = progress.add_task("[cyan]Gathering context data...", total=None)
                
                # Simulate context gathering (in real implementation, would call agent)
                context_result = await self._gather_context(context_agent)
                self.status["context"] = "completed"
                progress.update(task2, description="[green]✓ Context gathered")
                await asyncio.sleep(0.5)
                
                # Step 3: Meal planning
                task3 = progress.add_task("[cyan]Generating meal plan...", total=None)
                
                meal_plan_result = await self._generate_meal_plan(planning_agent, context_result)
                self.status["planning"] = "completed"
                progress.update(task3, description="[green]✓ Meal plan generated")
                await asyncio.sleep(0.5)
                
                # Step 4: Grocery list compilation
                task4 = progress.add_task("[cyan]Compiling grocery list...", total=None)
                grocery_list_result = await self._compile_grocery_list(planning_agent, meal_plan_result, context_result)
                progress.update(task4, description="[green]✓ Grocery list ready")
                await asyncio.sleep(0.5)
                
                # Step 5: Price comparison
                task5 = progress.add_task("[cyan]Comparing prices...", total=None)
                
                price_result = await self._compare_prices(decision_agent, grocery_list_result)
                self.status["decision"] = "completed"
                progress.update(task5, description="[green]✓ Best prices found")
                await asyncio.sleep(0.5)
                
                # Step 6: Errand scheduling
                task6 = progress.add_task("[cyan]Scheduling errands...", total=None)
                errand_result = await self._schedule_errands(planning_agent, context_result)
                progress.update(task6, description="[green]✓ Errands scheduled")
                await asyncio.sleep(0.5)
                
                # Step 7: Finalization
                task7 = progress.add_task("[cyan]Creating approval requests...", total=None)
                final_result = await self._finalize_plan(
                    coordinator,
                    meal_plan_result,
                    grocery_list_result,
                    price_result,
                    errand_result
                )
                self.status["workflow"] = "completed"
                progress.update(task7, description="[green]✓ Plan ready for approval")
            
            console.print("\n[bold green]✅ Weekly planning workflow completed successfully![/bold green]\n")
            return final_result
            
        except Exception as e:
            console.print(f"\n[bold red]❌ Workflow failed: {str(e)}[/bold red]\n")
            self.status["workflow"] = "failed"
            raise
    
    async def _gather_context(self, agent: Any) -> Dict[str, Any]:
        """Gather context data from multiple sources"""
        # In real implementation, would use agent's tools to fetch data
        return {
            "availability": {
                "free_blocks": ["Sat 10am-6pm", "Sun 2pm-8pm"],
                "busy_blocks": ["Sat 8-9:30am", "Sun 10am-1pm"]
            },
            "spending_patterns": {
                "avg_weekly_grocery": 150.0,
                "categories": {"produce": 40, "dairy": 25, "meat": 35, "pantry": 50}
            },
            "pantry_state": {
                "running_low": ["milk", "eggs", "bread"],
                "well_stocked": ["rice", "pasta", "canned_goods"]
            },
            "contextual_insights": {
                "weather": "Clear weekend",
                "traffic": "Light Saturday afternoon",
                "recommended_shopping_time": "Saturday 2-3pm"
            }
        }
    
    async def _generate_meal_plan(self, agent: Any, context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate weekly meal plan"""
        # In real implementation, would invoke planning agent
        return {
            "week_start_date": datetime.now().date().isoformat(),
            "meals": [
                {
                    "day": "monday",
                    "meal_type": "dinner",
                    "recipe_name": "Veggie Stir-fry",
                    "cook_time_minutes": 25,
                    "servings": 2,
                    "ingredients": [
                        {"name": "broccoli", "quantity": 1, "unit": "head"},
                        {"name": "bell peppers", "quantity": 2, "unit": "count"},
                        {"name": "soy sauce", "quantity": 2, "unit": "tbsp"}
                    ],
                    "estimated_cost": 12.50
                },
                {
                    "day": "tuesday",
                    "meal_type": "dinner",
                    "recipe_name": "Pasta Primavera",
                    "cook_time_minutes": 30,
                    "servings": 2,
                    "ingredients": [
                        {"name": "pasta", "quantity": 8, "unit": "oz"},
                        {"name": "cherry tomatoes", "quantity": 1, "unit": "pint"},
                        {"name": "parmesan", "quantity": 4, "unit": "oz"}
                    ],
                    "estimated_cost": 15.00
                }
            ],
            "total_estimated_cost": 145.00,
            "status": "proposed"
        }
    
    async def _compile_grocery_list(self, agent: Any, meal_plan: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Compile consolidated grocery list"""
        return {
            "items": [
                {"name": "broccoli", "quantity": 1, "unit": "head", "category": "produce", "in_pantry": False},
                {"name": "bell peppers", "quantity": 2, "unit": "count", "category": "produce", "in_pantry": False},
                {"name": "milk", "quantity": 1, "unit": "gallon", "category": "dairy", "in_pantry": False},
                {"name": "eggs", "quantity": 12, "unit": "count", "category": "dairy", "in_pantry": False},
            ],
            "status": "draft"
        }
    
    async def _compare_prices(self, agent: Any, grocery_list: Dict[str, Any]) -> Dict[str, Any]:
        """Compare prices across vendors"""
        return {
            "vendor_comparisons": [
                {
                    "vendor": "instacart_whole_foods",
                    "total_cost": 147.23,
                    "delivery_fee": 5.99,
                    "items_available": 45,
                    "items_total": 45,
                    "delivery_windows": ["Sat 2-4pm", "Sat 4-6pm"]
                },
                {
                    "vendor": "amazon_fresh",
                    "total_cost": 152.10,
                    "delivery_fee": 0.0,
                    "items_available": 43,
                    "items_total": 45,
                    "delivery_windows": ["Sat 4-6pm"]
                }
            ],
            "recommended_vendor": "instacart_whole_foods",
            "reasoning": "Best availability and competitive pricing"
        }
    
    async def _schedule_errands(self, agent: Any, context: Dict[str, Any]) -> Dict[str, Any]:
        """Schedule errands optimally"""
        return {
            "errands": [
                {
                    "type": "dry_cleaning",
                    "location": "Clean Express, 123 Main St",
                    "scheduled_time": "Sat 10:00am",
                    "duration_minutes": 15
                },
                {
                    "type": "pharmacy",
                    "location": "CVS, 456 Oak Ave",
                    "scheduled_time": "Sat 10:30am",
                    "duration_minutes": 10
                }
            ],
            "route": {
                "total_drive_time_minutes": 25,
                "total_duration_minutes": 50
            }
        }
    
    async def _finalize_plan(self, agent: Any, meal_plan: Dict, grocery_list: Dict, prices: Dict, errands: Dict) -> Dict[str, Any]:
        """Finalize and create approval records"""
        return {
            "workflow_id": self.workflow_id,
            "status": "ready_for_approval",
            "meal_plan": meal_plan,
            "grocery_order": {
                "list": grocery_list,
                "pricing": prices,
                "selected_vendor": prices["recommended_vendor"],
                "total": 147.23
            },
            "errand_schedule": errands,
            "estimated_savings": {
                "time_saved_hours": 5,
                "money_saved_dollars": 23.45
            },
            "approvals_needed": [
                "grocery_order",
                "meal_plan",
                "errand_schedule"
            ]
        }


class ApprovalWorkflow:
    """
    Approval and execution workflow
    Sequence: User Approval → Execution Agent → Status Tracking
    """
    
    def __init__(self, approval_id: str, user_id: str):
        self.approval_id = approval_id
        self.user_id = user_id
        
    async def execute(self, approval_type: str) -> Dict[str, Any]:
        """Execute approval and subsequent actions"""
        console.print(f"\n[bold cyan]📋 Processing Approval[/bold cyan]")
        console.print(f"Approval ID: {self.approval_id}")
        console.print(f"Type: {approval_type}\n")
        
        if approval_type == "grocery_order":
            result = await self._execute_grocery_order(execution_agent)
        elif approval_type == "errand_schedule":
            result = await self._execute_errand_booking(execution_agent)
        else:
            result = {"status": "approved", "message": f"{approval_type} approved"}
        
        console.print(f"[bold green]✅ {approval_type} processed successfully![/bold green]\n")
        return result
    
    async def _execute_grocery_order(self, agent: Any) -> Dict[str, Any]:
        """Execute approved grocery order"""
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            task = progress.add_task("[cyan]Placing order with Instacart...", total=None)
            await asyncio.sleep(2)  # Simulate API call
            progress.update(task, description="[green]✓ Order placed successfully")
        
        return {
            "order_id": "inst_ord_12345",
            "status": "placed",
            "confirmation_number": "EDWRD12345",
            "estimated_delivery": (datetime.now() + timedelta(days=1)).isoformat(),
            "total_charged": 147.23,
            "tracking_url": "https://instacart.com/track/inst_ord_12345"
        }
    
    async def _execute_errand_booking(self, agent: Any) -> Dict[str, Any]:
        """Execute errand calendar bookings"""
        return {
            "calendar_events_created": 2,
            "status": "scheduled"
        }


class AdaptiveRePlanningWorkflow:
    """
    Adaptive re-planning when pantry or context changes
    Sequence: Context Update → Planning Agent → Decision Agent
    """
    
    def __init__(self, user_id: str, trigger_reason: str):
        self.user_id = user_id
        self.trigger_reason = trigger_reason
        
    async def execute(self, change_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute adaptive re-planning"""
        console.print(f"\n[bold yellow]🔄 Adaptive Re-planning Triggered[/bold yellow]")
        console.print(f"Reason: {self.trigger_reason}")
        console.print(f"Change: {change_data}\n")
        
        # Assess impact
        impact = await self._assess_impact(change_data)
        
        if impact["severity"] == "low":
            console.print("[green]Low impact - no re-planning needed[/green]\n")
            return {"action": "none", "reason": "low_impact"}
        
        # Re-plan as needed
        result = await self._execute_replan(planning_agent, change_data, impact)
        
        console.print("[bold green]✅ Re-planning completed![/bold green]\n")
        return result
    
    async def _assess_impact(self, change_data: Dict[str, Any]) -> Dict[str, Any]:
        """Assess impact of change"""
        # Simple heuristic for MVP
        if self.trigger_reason == "pantry_item_depleted":
            return {"severity": "medium", "affected": ["grocery_list", "meal_plan"]}
        elif self.trigger_reason == "calendar_conflict":
            return {"severity": "high", "affected": ["errand_schedule"]}
        else:
            return {"severity": "low", "affected": []}
    
    async def _execute_replan(self, agent: Any, change_data: Dict, impact: Dict) -> Dict[str, Any]:
        """Execute the re-planning"""
        return {
            "action": "modified_grocery_list",
            "changes": ["Added milk to order"],
            "new_total": 151.78
        }


# Workflow registry
WORKFLOWS = {
    "weekly_planning": WeeklyPlanningWorkflow,
    "approval": ApprovalWorkflow,
    "adaptive_replan": AdaptiveRePlanningWorkflow,
}


def get_workflow(workflow_name: str):
    """Get workflow class by name"""
    if workflow_name not in WORKFLOWS:
        raise ValueError(f"Unknown workflow: {workflow_name}")
    return WORKFLOWS[workflow_name]
