"""
TOURISTO - Global Configuration & Environment Settings
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "touristo.sqlite3"

APP_NAME = "TOURISTO — Travel Smart. Travel Safe."
APP_VERSION = "2.4.0"

# Currency Exchange Cache Duration (in seconds)
EXCHANGE_CACHE_TTL = 3600

# Emergency Contact Defaults
DEFAULT_EMERGENCY_NUMBERS = {
    "National Emergency SOS": "112",
    "Women Helpline": "1091",
    "Tourist Police Helpline": "1363",
    "Ambulance / Medical Trauma": "108"
}
