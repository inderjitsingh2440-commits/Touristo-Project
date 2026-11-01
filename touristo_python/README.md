# TOURISTO — Travel Smart. Travel Safe.

An AI Travel Companion for India built with Python 3.11+, KivyMD, SQLite, and scikit-learn.

## Architecture & Screens

1. **Splash Screen**: Welcome animation with Indian monuments and traveler graphics.
2. **Home Screen**: Dashboard featuring 6 pastel cards:
   - Scam Detector (Pale Yellow)
   - Currency Scanner (Pale Blue)
   - Translator (Pale Pink)
   - Currency Calculator (Pale Mint Green)
   - Women Safety (Pale Lavender)
   - Explore India (Pale Peach)
3. **Currency Scanner**: Banknote identification (₹10, ₹20, ₹50, ₹100, ₹200, ₹500) with audio pronunciation in Hindi and English.
4. **Translator**: 3 modes (Text, Voice, Conversation) for English ⇄ Hindi with speech recognition and synthesis.
5. **Currency Calculator**: Real-time conversions with live rates and sync to Expense Tracker.
6. **Expense Tracker**: Category breakdowns, budgets, and SQLite persistence.
7. **Scam Detector**: Motor Vehicles Act fare benchmark calculator with risk scoring.
8. **Scam Examples**: 8 categories of common tourist traps and countermeasures.
9. **Women Safety (Safe Route)**: High-illumination, CCTV-monitored routes and emergency share.
10. **SOS Emergency**: Distinctive dark red screen, siren alarm, GPS broadcasting, and helpline calling.
11. **Nearby Help**: 24/7 Police, Trauma Hospitals, and Pink Booths with proximity radar.
12. **Profile & Settings**: Emergency contacts, itinerary, and export/import tools.

## Installation (Windows / macOS / Linux)

```bash
# 1. Create a Python 3.11 virtual environment
python -m venv venv

# 2. Activate virtual environment
# Windows:
venv\\Scripts\\activate
# Linux/macOS:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run tests
pytest tests/

# 5. Launch Application
python main.py
```

## Android Packaging via Buildozer

```bash
# On Linux (Ubuntu recommended)
pip install buildozer
buildozer init
buildozer android debug
# The resulting APK will be located in the bin/ directory
```
