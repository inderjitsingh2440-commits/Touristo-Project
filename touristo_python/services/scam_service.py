"""
Travel Fare Risk Assessment Engine in Pure Python.
Calculates fare difference, risk scoring, and evaluates circumstance red flags.
"""
from typing import Dict, Any, List

class ScamScoringEngine:
    @staticmethod
    def calculate_benchmark_fare(transport_type: str, distance_km: float, is_night: bool = False) -> float:
        dist = max(0.5, float(distance_km))
        fare = 0.0

        if transport_type == "Auto Rickshaw":
            # Delhi official tariff: Rs 30 for first 1.5km, Rs 11/km after
            fare = 30.0 if dist <= 1.5 else 30.0 + (dist - 1.5) * 11.0
        elif transport_type in ["Prepaid Taxi", "Prepaid Taxi (Non-AC)"]:
            fare = 50.0 if dist <= 1.0 else 50.0 + (dist - 1.0) * 16.0
        elif transport_type in ["Prepaid Taxi (AC)", "Airport Cab"]:
            fare = 65.0 if dist <= 1.0 else 65.0 + (dist - 1.0) * 19.0
        elif transport_type == "Cycle Rickshaw":
            fare = max(30.0, dist * 25.0)
        else:
            fare = max(40.0, dist * 15.0)

        if is_night:
            fare *= 1.25  # 25% night tariff 11 PM to 5 AM

        return round(fare)

    @classmethod
    def evaluate(
        cls, 
        transport_type: str, 
        from_loc: str, 
        to_loc: str, 
        distance_km: float, 
        quoted_fare: float, 
        is_night: bool = False, 
        circumstances: List[str] = None
    ) -> Dict[str, Any]:
        circumstances = circumstances or []
        benchmark = cls.calculate_benchmark_fare(transport_type, distance_km, is_night)
        difference = quoted_fare - benchmark
        diff_percent = round((difference / max(1.0, benchmark)) * 100)

        risk_score = 0
        factors = []
        recommendations = []

        if diff_percent <= 20:
            risk_score += 15
            factors.append("Quoted fare is within reasonable variance of government tariff.")
        elif diff_percent <= 50:
            risk_score += 45
            factors.append(f"Quoted fare is {diff_percent}% above benchmark.")
        elif diff_percent <= 120:
            risk_score += 75
            factors.append(f"Severe overcharge: Quoted fare is {diff_percent}% higher than tariff.")
        else:
            risk_score += 90
            factors.append(f"Extreme price gouging: Quoted price is {diff_percent}% over market rate.")

        for circ in circumstances:
            cl = circ.lower()
            if "hotel is closed" in cl or "burnt down" in cl:
                risk_score += 40
                factors.append("CRITICAL: Classic Hotel Closed diversion scam detected.")
                recommendations.append("Do not let driver divert you to another travel office.")
            if "meter broken" in cl or "refused meter" in cl:
                risk_score += 20
                factors.append("Refusal to engage meter is illegal under Motor Vehicles Act.")
            if "tout" in cl:
                risk_score += 25
                factors.append("Unlicensed solicitor inside transit hub.")

        risk_score = min(100, max(5, risk_score))
        risk_level = "High" if risk_score >= 65 else ("Medium" if risk_score >= 35 else "Low")

        if not recommendations:
            if risk_level == "High":
                recommendations.append("Politely decline and use the official prepaid police counter or Metro.")
            else:
                recommendations.append("Fare is fair. Confirm meter is zeroed before starting.")

        return {
            "standard_fare": benchmark,
            "quoted_fare": quoted_fare,
            "diff_percent": diff_percent,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "factors": factors,
            "recommendations": recommendations,
        }
