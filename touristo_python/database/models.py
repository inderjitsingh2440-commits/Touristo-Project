"""
Data Models for TOURISTO
"""
from dataclasses import dataclass
from typing import Optional

@dataclass
class Expense:
    id: Optional[int]
    title: str
    amount: float
    currency: str
    amount_in_inr: float
    category: str
    date: str
    notes: Optional[str] = None

@dataclass
class EmergencyContact:
    id: Optional[int]
    name: str
    relation: str
    phone: str
    notify_on_sos: bool = True

@dataclass
class ScamReport:
    id: Optional[int]
    date: str
    transport_type: str
    from_location: str
    to_location: str
    quoted_fare: float
    standard_fare: float
    risk_score: int
    risk_level: str
