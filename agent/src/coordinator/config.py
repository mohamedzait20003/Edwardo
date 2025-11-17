"""
Edwardo Configuration Module
Centralized settings and environment variable management
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Literal


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )
    
    # LLM Configuration
    google_api_key: str = Field(default="", description="Google AI API key for Gemini")
    gemini_model: str = Field(default="gemini-1.5-flash", description="Gemini model name")
    
    # MongoDB
    mongodb_uri: str = Field(default="mongodb://localhost:27017", description="MongoDB connection URI")
    mongodb_database: str = Field(default="edwardo_db", description="MongoDB database name")
    
    # Google Services
    google_calendar_client_id: str = Field(default="", description="Google Calendar OAuth client ID")
    google_calendar_client_secret: str = Field(default="", description="Google Calendar OAuth secret")
    gmail_client_id: str = Field(default="", description="Gmail OAuth client ID")
    gmail_client_secret: str = Field(default="", description="Gmail OAuth secret")
    
    # Financial Services
    plaid_client_id: str = Field(default="", description="Plaid client ID")
    plaid_secret: str = Field(default="", description="Plaid secret key")
    plaid_env: Literal["sandbox", "development", "production"] = Field(default="sandbox")
    
    # Grocery & Shopping
    instacart_api_key: str = Field(default="", description="Instacart API key")
    instacart_user_token: str = Field(default="", description="Instacart user token")
    amazon_fresh_access_key: str = Field(default="", description="Amazon Fresh access key")
    amazon_fresh_secret_key: str = Field(default="", description="Amazon Fresh secret key")
    
    # Location Services
    google_maps_api_key: str = Field(default="", description="Google Maps API key")
    
    # Application Settings
    app_env: Literal["development", "staging", "production"] = Field(default="development")
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = Field(default="INFO")
    agent_timeout_seconds: int = Field(default=120, description="Agent execution timeout")


# Global settings instance
settings = Settings()
