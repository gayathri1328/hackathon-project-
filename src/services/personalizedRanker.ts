import { EducationalResource, QueryUnderstanding, RankedResource, UserProfile } from '../types';

export function rankResources(
  candidateResources: Array<{ resource: EducationalResource; semantic_score: number }>,
  profile: UserProfile,
  intent: QueryUnderstanding
): RankedResource[] {
  const targetLevel = intent.level || profile.learning_level || 'Beginner';
  const targetFormat = intent.preferred_resource_type || profile.preferred_format || 'Explanation';

  const hasPastAssessments = profile.assessment_history && profile.assessment_history.length > 0;

  const ranked: RankedResource[] = candidateResources.map(({ resource, semantic_score }) => {
    const matchReasons: string[] = [];

    // 1. FORMAT ALIGNMENT (Major Weight: 0.30)
    // Ensures selecting Practice vs Explanation vs Visual strictly elevates corresponding resources!
    let formatScore = 0.3;
    if (resource.format === targetFormat) {
      formatScore = 1.0;
      matchReasons.push(`Direct match for requested ${resource.format} format`);
    } else if (
      (targetFormat === 'Explanation' && resource.format === 'Visual Guides') ||
      (targetFormat === 'Visual Guides' && resource.format === 'Explanation')
    ) {
      formatScore = 0.7;
    } else if (targetFormat === 'Examples' && resource.format === 'Practice') {
      formatScore = 0.75;
    } else if (resource.format === 'Summary') {
      formatScore = 0.6;
    }

    // 2. DIFFICULTY & LEVEL ALIGNMENT (Weight: 0.25)
    let levelScore = 0.5;
    if (targetLevel === 'Beginner') {
      if (resource.difficulty === 'Easy') {
        levelScore = 1.0;
        matchReasons.push('Calibrated for beginner foundational comprehension');
      } else if (resource.difficulty === 'Medium') {
        levelScore = 0.6;
      } else {
        levelScore = 0.25;
      }
    } else if (targetLevel === 'Intermediate') {
      if (resource.difficulty === 'Medium') {
        levelScore = 1.0;
        matchReasons.push('Calibrated for intermediate hands-on proficiency');
      } else if (resource.difficulty === 'Easy') {
        levelScore = 0.75;
      } else {
        levelScore = 0.75;
      }
    } else {
      // Advanced
      if (resource.difficulty === 'Hard') {
        levelScore = 1.0;
        matchReasons.push('Calibrated for advanced deep-dive analysis');
      } else if (resource.difficulty === 'Medium') {
        levelScore = 0.8;
      } else {
        levelScore = 0.4;
      }
    }

    // 3. LEARNER HISTORY & ASSESSMENT CONTEXT (Weight: 0.15)
    let assessmentScore = 0.5;
    const pastAssessments = (profile.assessment_history || []).filter(
      (a) => a.topic.toLowerCase().includes(resource.topic.toLowerCase()) ||
             resource.topic.toLowerCase().includes(a.topic.toLowerCase())
    );

    const isAreaToImprove = (profile.areas_to_improve || []).some(
      (area) => area.toLowerCase().includes(resource.topic.toLowerCase()) ||
                resource.topic.toLowerCase().includes(area.toLowerCase())
    );

    const topicMastery = Object.entries(profile.topics_mastery || {}).find(([top]) =>
      resource.topic.toLowerCase().includes(top.toLowerCase()) ||
      resource.category.toLowerCase().includes(top.toLowerCase())
    );

    const masteryPercent = topicMastery ? topicMastery[1] : (pastAssessments.length > 0 ? pastAssessments[0].percentage : null);

    if (isAreaToImprove || (masteryPercent !== null && masteryPercent < 70)) {
      if (resource.difficulty === 'Easy' || resource.format === 'Explanation' || resource.format === 'Visual Guides') {
        assessmentScore = 1.0;
        matchReasons.push(`Reinforcement priority: Targets your improvement area (${masteryPercent !== null ? `${masteryPercent}% score` : 'identified weakness'})`);
      } else {
        assessmentScore = 0.35;
      }
    } else if (masteryPercent !== null && masteryPercent >= 80) {
      if (resource.format === 'Practice' || resource.format === 'Examples' || resource.difficulty === 'Medium' || resource.difficulty === 'Hard') {
        assessmentScore = 0.95;
        matchReasons.push(`High mastery (${masteryPercent}%): Recommending practice & advanced challenges`);
      } else {
        assessmentScore = 0.6;
      }
    } else {
      assessmentScore = 0.7;
    }

    // Combined Weighted Final Score:
    // Semantic Score: 30%
    // Format Match: 30%
    // Level Match: 25%
    // Assessment Context: 15%
    const finalScore = (
      (semantic_score * 0.30) +
      (formatScore * 0.30) +
      (levelScore * 0.25) +
      (assessmentScore * 0.15)
    );

    // Generate accurate personalized narrative based on REAL user data
    let whyRecommended = '';
    if (isAreaToImprove && resource.difficulty === 'Easy') {
      whyRecommended = `Because ${resource.topic} is currently marked in your areas to improve, and this provides accessible fundamentals.`;
    } else if (masteryPercent !== null && masteryPercent >= 80 && (resource.format === 'Practice' || resource.format === 'Examples')) {
      whyRecommended = `Because you demonstrated ${masteryPercent}% mastery on ${resource.category}, practical challenges will deepen your understanding.`;
    } else if (hasPastAssessments && masteryPercent !== null) {
      whyRecommended = `Aligned with your ${targetLevel} level and previous ${resource.topic} assessment score (${masteryPercent}%).`;
    } else {
      // New user with no assessment history - DO NOT FABRICATE PAST SCORES!
      whyRecommended = `Recommended for your selected ${targetLevel} level and ${targetFormat.toLowerCase()} preference. (No assessment history yet)`;
    }

    return {
      resource,
      semantic_score: Math.round(semantic_score * 100) / 100,
      context_score: Math.round(((formatScore + levelScore + assessmentScore) / 3) * 100) / 100,
      final_score: Math.round(finalScore * 100) / 100,
      why_recommended: whyRecommended,
      match_reasons: matchReasons,
      rank: 0
    };
  });

  // Sort descending by final personalized score
  ranked.sort((a, b) => b.final_score - a.final_score);

  ranked.forEach((item, index) => {
    item.rank = index + 1;
  });

  return ranked;
}
