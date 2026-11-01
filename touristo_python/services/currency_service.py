"""
Currency Exchange Service in Pure Python.
"""
from typing import Dict, Tuple

RATES_TO_INR = {
    'USD': 87.20,
    'EUR': 92.45,
    'GBP': 110.80,
    'AED': 23.75,
    'JPY': 0.58,
    'CAD': 62.10,
    'AUD': 56.40,
    'SGD': 65.30,
    'INR': 1.00
}

class CurrencyService:
    @staticmethod
    def convert(amount: float, from_curr: str, to_curr: str) -> Tuple[float, float]:
        if amount <= 0:
            return 0.0, 1.0

        from_rate = RATES_TO_INR.get(from_curr.upper(), 1.0)
        to_rate = RATES_TO_INR.get(to_curr.upper(), 1.0)

        amount_inr = amount * from_rate
        result = amount_inr / to_rate
        direct_rate = from_rate / to_rate

        return round(result, 2), round(direct_rate, 4)
