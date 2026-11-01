import { ScamAssessment } from '../types/touristo';

export interface ScamInput {
  transportType: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  quotedFare: number;
  isNightTime: boolean;
  circumstances: string[];
}

export const scamScoringEngine = {
  calculateBenchmarkFare(transportType: string, distanceKm: number, isNightTime: boolean): number {
    const dist = Math.max(0.5, distanceKm);
    let fare = 0;

    switch (transportType) {
      case 'Auto Rickshaw':
        // Delhi standard auto tariff: ₹30 for first 1.5 km, ₹11 per km thereafter
        if (dist <= 1.5) {
          fare = 30;
        } else {
          fare = 30 + (dist - 1.5) * 11;
        }
        break;

      case 'Prepaid Taxi (Non-AC)':
        // Delhi prepaid: ₹50 first 1 km, ₹16/km thereafter
        if (dist <= 1.0) {
          fare = 50;
        } else {
          fare = 50 + (dist - 1.0) * 16;
        }
        break;

      case 'Prepaid Taxi (AC) / App Cab':
        // AC cab standard: ₹65 first 1 km, ₹19/km thereafter
        if (dist <= 1.0) {
          fare = 65;
        } else {
          fare = 65 + (dist - 1.0) * 19;
        }
        break;

      case 'Airport Shuttle / Taxi':
        // Airport routes usually include ₹50 airport toll/parking fee
        if (dist <= 1.0) {
          fare = 150;
        } else {
          fare = 150 + (dist - 1.0) * 22;
        }
        break;

      case 'Cycle Rickshaw':
        fare = Math.max(30, dist * 25);
        break;

      default:
        fare = Math.max(40, dist * 15);
        break;
    }

    // Official night surcharge (11:00 PM to 5:00 AM) is +25%
    if (isNightTime) {
      fare = fare * 1.25;
    }

    return Math.round(fare);
  },

  evaluate(input: ScamInput): ScamAssessment {
    const standardFare = this.calculateBenchmarkFare(input.transportType, input.distanceKm, input.isNightTime);
    const difference = input.quotedFare - standardFare;
    const diffPercent = Math.round((difference / Math.max(1, standardFare)) * 100);

    let baseRiskScore = 0;
    const factors: string[] = [];
    const recommendations: string[] = [];

    // Evaluate fare inflation
    if (diffPercent <= 20) {
      baseRiskScore += 15;
      factors.push(`Quoted fare (₹${input.quotedFare}) is within normal variance of official tariff (₹${standardFare}).`);
    } else if (diffPercent <= 50) {
      baseRiskScore += 45;
      factors.push(`Quoted fare is ${diffPercent}% above benchmark (₹${input.quotedFare} vs ₹${standardFare}). Typical during peak rush or rain.`);
    } else if (diffPercent <= 120) {
      baseRiskScore += 75;
      factors.push(`Severe overcharge: Quoted fare is ${diffPercent}% higher than regulated government rate (₹${input.quotedFare} vs ₹${standardFare}).`);
    } else {
      baseRiskScore += 90;
      factors.push(`Extreme price gouging: Quoted price is ${diffPercent}% over reasonable market tariff.`);
    }

    // Circumstantial red flags
    input.circumstances.forEach((circ) => {
      if (circ.includes('hotel is closed') || circ.includes('burnt down')) {
        baseRiskScore += 40;
        factors.push('CRITICAL RED FLAG: Classic "Hotel Closed / Burnt Down" diversion script detected.');
        recommendations.push('Do not allow the driver to take you to any alternative travel desk or hotel. Insist on proceeding to your destination.');
      }
      if (circ.includes('refused meter') || circ.includes('meter broken')) {
        baseRiskScore += 20;
        factors.push('Refusal to engage electronic meter is a regulatory violation under Motor Vehicles Act.');
        recommendations.push('State clearly: "Meter se chaliye" (Run by meter) or take another auto.');
      }
      if (circ.includes('tout approached') || circ.includes('unsolicited helper')) {
        baseRiskScore += 25;
        factors.push('Approached unprompted inside transit hub by unlicensed agent.');
        recommendations.push('Only hire transport from official painted pre-paid booths manned by Delhi Police or through official mobile apps.');
      }
      if (circ.includes('private white plate') || circ.includes('unregistered car')) {
        baseRiskScore += 30;
        factors.push('Unlicensed private vehicle (white license plate). Commercial transport in India must have yellow plates.');
        recommendations.push('Never enter a private vehicle claiming to be a taxi. Commercial taxis have yellow plates with black lettering.');
      }
      if (circ.includes('late night arrival')) {
        factors.push('Night travel surcharge (+25%) is legally applicable between 11 PM and 5 AM, but flat extortion is not.');
      }
    });

    const finalScore = Math.min(100, Math.max(5, baseRiskScore));

    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (finalScore >= 65) {
      riskLevel = 'High';
    } else if (finalScore >= 35) {
      riskLevel = 'Medium';
    }

    if (recommendations.length === 0) {
      if (riskLevel === 'High') {
        recommendations.push('Walk away politely and use the official prepaid booth or Delhi Metro.');
        recommendations.push('If at Delhi Airport (IGI), take the Metro Airport Express Line (Terminal 3 to New Delhi Station in 19 mins for ₹60).');
      } else if (riskLevel === 'Medium') {
        recommendations.push(`Counter-offer ₹${Math.round(standardFare * 1.15)} or verify fare with another driver.`);
      } else {
        recommendations.push('Fair fare. Always ensure driver resets the meter if using an auto rickshaw.');
      }
    }

    return {
      id: 'scam_' + Date.now(),
      date: new Date().toISOString(),
      transportType: input.transportType,
      fromLocation: input.fromLocation,
      toLocation: input.toLocation,
      distanceKm: input.distanceKm,
      quotedFare: input.quotedFare,
      standardFare,
      riskScore: finalScore,
      riskLevel,
      factors,
      recommendations,
    };
  },
};
