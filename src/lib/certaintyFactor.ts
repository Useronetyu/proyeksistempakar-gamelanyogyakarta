// Certainty Factor Calculation Engine for Gamelan Expert System

export interface ConsultationAnswers {
  goal: string;      // watching, learning, history
  visitDay: string;  // weekday, weekend, holiday
  duration: string;  // short, medium, long
}

export interface CFRule {
  condition: (answers: ConsultationAnswers) => boolean;
  cf: number; // Certainty Factor value (0-1)
}

export interface LocationResult {
  id: string;
  certaintyFactor: number;
}

// Define rules for each location (H01-H05)
const locationRules: Record<string, CFRule[]> = {
  // H01 - Pagelaran Gamelan Bangsal Sri Menganti (Performance watching)
  H01: [
    { condition: (a) => a.goal === "watching", cf: 0.9 },
    { condition: (a) => a.visitDay === "weekday" && (a.goal === "watching"), cf: 0.8 },
    { condition: (a) => a.duration === "short", cf: 0.7 },
    { condition: (a) => a.duration === "medium" && a.goal === "watching", cf: 0.6 },
  ],

  // H02 - Museum Keraton (Historical artifacts and collection)
  H02: [
    { condition: (a) => a.goal === "history", cf: 0.95 },
    { condition: (a) => a.duration === "medium" && a.goal === "history", cf: 0.8 },
    { condition: (a) => a.visitDay === "weekday" || a.visitDay === "weekend", cf: 0.7 },
    { condition: (a) => a.duration === "long" && a.goal === "history", cf: 0.75 },
  ],

  // H03 - Latihan Gamelan (Practice session viewing)
  H03: [
    { condition: (a) => a.goal === "watching", cf: 0.75 },
    { condition: (a) => a.visitDay === "weekday" && a.goal === "watching", cf: 0.85 },
    { condition: (a) => a.duration === "short" || a.duration === "medium", cf: 0.7 },
    { condition: (a) => a.goal === "learning" && a.visitDay === "weekday", cf: 0.6 },
  ],

  // H04 - Sanggar Belajar Gamelan (Hands-on learning)
  H04: [
    { condition: (a) => a.goal === "learning", cf: 0.95 },
    { condition: (a) => a.duration === "long" && a.goal === "learning", cf: 0.9 },
    { condition: (a) => a.duration === "medium" && a.goal === "learning", cf: 0.8 },
    { condition: (a) => a.visitDay === "weekday" || a.visitDay === "weekend", cf: 0.7 },
  ],

  // H05 - Tempat Perawatan Gamelan (Conservation and technical)
  H05: [
    { condition: (a) => a.goal === "history", cf: 0.75 },
    { condition: (a) => a.goal === "learning" && a.duration === "long", cf: 0.7 },
    { condition: (a) => a.visitDay === "weekday", cf: 0.8 },
    { condition: (a) => a.duration === "medium" || a.duration === "long", cf: 0.65 },
  ],
};

/**
 * Combine multiple certainty factors using the CF combination formula
 * CF_combined = CF1 + CF2 * (1 - CF1)
 */
function combineCF(cf1: number, cf2: number): number {
  return cf1 + cf2 * (1 - cf1);
}

/**
 * Calculate certainty factor for a specific location based on user answers
 */
function calculateLocationCF(locationId: string, answers: ConsultationAnswers): number {
  const rules = locationRules[locationId] || [];
  let combinedCF = 0;

  for (const rule of rules) {
    if (rule.condition(answers)) {
      combinedCF = combineCF(combinedCF, rule.cf);
    }
  }

  return combinedCF;
}

/**
 * Main function: Calculate CF for all locations and return sorted results
 */
export function calculateRecommendation(answers: ConsultationAnswers): LocationResult[] {
  const locations = ["H01", "H02", "H03", "H04", "H05"];
  
  const results = locations.map((locationId) => ({
    id: locationId,
    certaintyFactor: calculateLocationCF(locationId, answers),
  }));

  // Sort by certainty factor (highest first)
  return results.sort((a, b) => b.certaintyFactor - a.certaintyFactor);
}

/**
 * Get the top recommendation
 */
export function getTopRecommendation(answers: ConsultationAnswers): LocationResult {
  const results = calculateRecommendation(answers);
  return results[0];
}
