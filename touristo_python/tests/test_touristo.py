"""
Automated unit tests for TOURISTO Python modules.
Run with: pytest tests/test_touristo.py
"""
import pytest
import os
from services.scam_service import ScamScoringEngine
from services.currency_service import CurrencyService
from database.db import init_db, add_expense, get_expenses, delete_expense
from database.models import Expense

def test_auto_rickshaw_fare_calculation():
    # 1.5 km should cost exactly 30 INR
    assert ScamScoringEngine.calculate_benchmark_fare("Auto Rickshaw", 1.5, False) == 30
    # 5.0 km should cost 30 + (3.5 * 11) = 68.5 -> rounded to 68 or 69
    fare = ScamScoringEngine.calculate_benchmark_fare("Auto Rickshaw", 5.0, False)
    assert 68 <= fare <= 69

def test_night_tariff_surcharge():
    day_fare = ScamScoringEngine.calculate_benchmark_fare("Prepaid Taxi", 10.0, False)
    night_fare = ScamScoringEngine.calculate_benchmark_fare("Prepaid Taxi", 10.0, True)
    assert night_fare > day_fare
    assert round(night_fare) == round(day_fare * 1.25)

def test_scam_risk_high_detection():
    result = ScamScoringEngine.evaluate(
        transport_type="Auto Rickshaw",
        from_loc="NDLS Station",
        to_loc="Paharganj",
        distance_km=2.5,
        quoted_fare=850.0,
        is_night=False,
        circumstances=["Driver said hotel is closed / burnt down"]
    )
    assert result["risk_level"] == "High"
    assert result["risk_score"] >= 80

def test_currency_conversion():
    # 100 USD to INR
    converted, rate = CurrencyService.convert(100.0, 'USD', 'INR')
    assert converted == 8720.0
    assert rate == 87.20

def test_sqlite_expense_lifecycle(tmp_path):
    test_db = str(tmp_path / "test_touristo.sqlite3")
    init_db(test_db)

    exp = Expense(
        id=None,
        title="Metro Card Recharge",
        amount=500.0,
        currency="INR",
        amount_in_inr=500.0,
        category="Transport",
        date="2026-10-25",
        notes="Airport Express Line"
    )
    inserted_id = add_expense(exp, test_db)
    assert inserted_id is not None

    items = get_expenses(test_db)
    assert len(items) == 1
    assert items[0]["title"] == "Metro Card Recharge"

    delete_expense(inserted_id, test_db)
    assert len(get_expenses(test_db)) == 0
