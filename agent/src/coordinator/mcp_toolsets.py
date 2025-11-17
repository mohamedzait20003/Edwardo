"""
MCP Toolsets for Edwardo Agent System
Wraps Model Context Protocol integrations for various services
"""

from google import genai
from typing import Any, Dict, List
import json


class MongoDBMCPToolset:
    """MongoDB MCP integration for data storage and retrieval"""
    
    def __init__(self, uri: str, database: str):
        self.uri = uri
        self.database = database
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return MongoDB MCP tools for agent use"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="mongodb_find_one",
                        description="Find a single document in MongoDB collection",
                        parameters={
                            "type": "object",
                            "properties": {
                                "collection": {"type": "string", "description": "Collection name"},
                                "filter": {"type": "object", "description": "Query filter"},
                            },
                            "required": ["collection", "filter"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="mongodb_find_many",
                        description="Find multiple documents in MongoDB collection",
                        parameters={
                            "type": "object",
                            "properties": {
                                "collection": {"type": "string", "description": "Collection name"},
                                "filter": {"type": "object", "description": "Query filter"},
                                "limit": {"type": "integer", "description": "Maximum results", "default": 100}
                            },
                            "required": ["collection"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="mongodb_insert_one",
                        description="Insert a single document into MongoDB collection",
                        parameters={
                            "type": "object",
                            "properties": {
                                "collection": {"type": "string", "description": "Collection name"},
                                "document": {"type": "object", "description": "Document to insert"}
                            },
                            "required": ["collection", "document"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="mongodb_update_one",
                        description="Update a single document in MongoDB collection",
                        parameters={
                            "type": "object",
                            "properties": {
                                "collection": {"type": "string", "description": "Collection name"},
                                "filter": {"type": "object", "description": "Query filter"},
                                "update": {"type": "object", "description": "Update operations"}
                            },
                            "required": ["collection", "filter", "update"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="mongodb_aggregate",
                        description="Run aggregation pipeline on MongoDB collection",
                        parameters={
                            "type": "object",
                            "properties": {
                                "collection": {"type": "string", "description": "Collection name"},
                                "pipeline": {"type": "array", "description": "Aggregation pipeline stages"}
                            },
                            "required": ["collection", "pipeline"]
                        }
                    ),
                ]
            )
        ]


class GoogleCalendarMCPToolset:
    """Google Calendar MCP integration"""
    
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return Google Calendar MCP tools"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="calendar_list_events",
                        description="List calendar events within a time range",
                        parameters={
                            "type": "object",
                            "properties": {
                                "time_min": {"type": "string", "description": "Start time (ISO 8601)"},
                                "time_max": {"type": "string", "description": "End time (ISO 8601)"},
                                "max_results": {"type": "integer", "default": 50}
                            },
                            "required": ["time_min", "time_max"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="calendar_create_event",
                        description="Create a new calendar event",
                        parameters={
                            "type": "object",
                            "properties": {
                                "summary": {"type": "string", "description": "Event title"},
                                "description": {"type": "string", "description": "Event description"},
                                "start_time": {"type": "string", "description": "Start time (ISO 8601)"},
                                "end_time": {"type": "string", "description": "End time (ISO 8601)"},
                                "location": {"type": "string", "description": "Event location"}
                            },
                            "required": ["summary", "start_time", "end_time"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="calendar_get_free_busy",
                        description="Get free/busy information for time range",
                        parameters={
                            "type": "object",
                            "properties": {
                                "time_min": {"type": "string", "description": "Start time (ISO 8601)"},
                                "time_max": {"type": "string", "description": "End time (ISO 8601)"}
                            },
                            "required": ["time_min", "time_max"]
                        }
                    ),
                ]
            )
        ]


class GmailMCPToolset:
    """Gmail MCP integration for receipt extraction"""
    
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return Gmail MCP tools"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="gmail_search_messages",
                        description="Search Gmail messages with query",
                        parameters={
                            "type": "object",
                            "properties": {
                                "query": {"type": "string", "description": "Gmail search query (e.g., 'from:instacart receipt')"},
                                "max_results": {"type": "integer", "default": 20},
                                "after_date": {"type": "string", "description": "Search after this date (YYYY/MM/DD)"}
                            },
                            "required": ["query"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="gmail_get_message",
                        description="Get full message content including attachments",
                        parameters={
                            "type": "object",
                            "properties": {
                                "message_id": {"type": "string", "description": "Gmail message ID"}
                            },
                            "required": ["message_id"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="gmail_extract_receipt",
                        description="Extract structured data from receipt email/attachment",
                        parameters={
                            "type": "object",
                            "properties": {
                                "message_id": {"type": "string", "description": "Gmail message ID with receipt"}
                            },
                            "required": ["message_id"]
                        }
                    ),
                ]
            )
        ]


class InstacartMCPToolset:
    """Instacart MCP integration for grocery ordering"""
    
    def __init__(self, api_key: str, user_token: str):
        self.api_key = api_key
        self.user_token = user_token
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return Instacart MCP tools"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="instacart_search_products",
                        description="Search for products at a specific store",
                        parameters={
                            "type": "object",
                            "properties": {
                                "store_name": {"type": "string", "description": "Store name (e.g., 'Whole Foods')"},
                                "query": {"type": "string", "description": "Product search query"},
                                "limit": {"type": "integer", "default": 10}
                            },
                            "required": ["store_name", "query"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="instacart_get_prices",
                        description="Get prices for a list of items across stores",
                        parameters={
                            "type": "object",
                            "properties": {
                                "items": {"type": "array", "items": {"type": "string"}, "description": "List of item names"},
                                "stores": {"type": "array", "items": {"type": "string"}, "description": "List of store names"}
                            },
                            "required": ["items"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="instacart_create_order",
                        description="Create and place an Instacart order",
                        parameters={
                            "type": "object",
                            "properties": {
                                "store_name": {"type": "string", "description": "Store name"},
                                "items": {"type": "array", "items": {"type": "object"}, "description": "Items with product_id and quantity"},
                                "delivery_window": {"type": "string", "description": "Delivery time window"},
                                "delivery_address": {"type": "object", "description": "Delivery address"}
                            },
                            "required": ["store_name", "items", "delivery_window"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="instacart_track_order",
                        description="Get order status and tracking information",
                        parameters={
                            "type": "object",
                            "properties": {
                                "order_id": {"type": "string", "description": "Instacart order ID"}
                            },
                            "required": ["order_id"]
                        }
                    ),
                ]
            )
        ]


class GoogleMapsMCPToolset:
    """Google Maps MCP integration for route optimization"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return Google Maps MCP tools"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="maps_geocode_address",
                        description="Convert address to latitude/longitude coordinates",
                        parameters={
                            "type": "object",
                            "properties": {
                                "address": {"type": "string", "description": "Address to geocode"}
                            },
                            "required": ["address"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="maps_calculate_route",
                        description="Calculate optimal route for multiple destinations",
                        parameters={
                            "type": "object",
                            "properties": {
                                "origin": {"type": "object", "description": "Start location {lat, lng}"},
                                "destinations": {"type": "array", "items": {"type": "object"}, "description": "List of {lat, lng} destinations"},
                                "optimize": {"type": "boolean", "default": True, "description": "Optimize waypoint order"}
                            },
                            "required": ["origin", "destinations"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="maps_get_traffic",
                        description="Get current traffic conditions for a route",
                        parameters={
                            "type": "object",
                            "properties": {
                                "origin": {"type": "object", "description": "Start {lat, lng}"},
                                "destination": {"type": "object", "description": "End {lat, lng}"},
                                "departure_time": {"type": "string", "description": "Departure time (ISO 8601)"}
                            },
                            "required": ["origin", "destination"]
                        }
                    ),
                ]
            )
        ]


class PlaidMCPToolset:
    """Plaid MCP integration for bank transaction data"""
    
    def __init__(self, client_id: str, secret: str, env: str):
        self.client_id = client_id
        self.secret = secret
        self.env = env
        
    def get_tools(self) -> List[genai.types.Tool]:
        """Return Plaid MCP tools"""
        return [
            genai.types.Tool(
                function_declarations=[
                    genai.types.FunctionDeclaration(
                        name="plaid_get_transactions",
                        description="Fetch bank transactions for date range",
                        parameters={
                            "type": "object",
                            "properties": {
                                "start_date": {"type": "string", "description": "Start date (YYYY-MM-DD)"},
                                "end_date": {"type": "string", "description": "End date (YYYY-MM-DD)"},
                                "account_ids": {"type": "array", "items": {"type": "string"}, "description": "Account IDs to query"}
                            },
                            "required": ["start_date", "end_date"]
                        }
                    ),
                    genai.types.FunctionDeclaration(
                        name="plaid_categorize_transaction",
                        description="Get category for a transaction",
                        parameters={
                            "type": "object",
                            "properties": {
                                "transaction_id": {"type": "string", "description": "Transaction ID"},
                                "merchant_name": {"type": "string", "description": "Merchant name"},
                                "amount": {"type": "number", "description": "Transaction amount"}
                            },
                            "required": ["transaction_id"]
                        }
                    ),
                ]
            )
        ]
