import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  RotateCcw, 
  Sparkles, 
  Brain, 
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAssessmentForTopic } from '../data/assessmentsData';
import { LearningLevel, TopicAssessmentAttempt } from '../types';
import { GraduationCapDoodle } from '../components/doodles';

interface AssessmentPageProps {
  topicName: string;
  onNavigate: (page: string) => void;
  onSearchTopic: (query: string) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  topicName,
  onNavigate,
  onSearchTopic
}) => {
  const { recordAssessment, getTopicAttemptNumber, user } = useAuth();

  const userLevel: LearningLevel = user?.learning_level || 'Beginner';
  const [currentAttempt, setCurrentAttempt] = useState<number>(1);
  const [assessment, setAssessment] = useState<TopicAssessmentAttempt | null>(null);

  useEffect(() => {
    const attempt = getTopicAttemptNumber(topicName || 'C Pointers');
    setCurrentAttempt(attempt);
    const asmt = getAssessmentForTopic(topicName || 'C Pointers', userLevel, attempt);
    setAssessment(asmt);
  }, [topicName, userLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(0);

  if (!assessment) {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center p-6">
        <div className="text-burgundy font-serif font-bold animate-pulse">
          Loading assessment...
        </div>
      </div>
    );
  }

  const currentQ = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;
  const currentSelection = selectedAnswers[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIndex
    });
  };

  const handleCheckAnswer = () => {
    setIsSubmitted(true);
  };

  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsSubmitted(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      // Final question submitted: Calculate real score
      let score = 0;
      assessment.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correct_option) {
          score += 1;
        }
      });
      setCalculatedScore(score);
      setIsFinished(true);

      const pct = Math.round((score / totalQuestions) * 100);

      // Trigger celebratory confetti if passed (>= 70%)
      if (pct >= 70) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Persist real score into authenticated user profile
      try {
        await recordAssessment(assessment.topic_name, userLevel, score, totalQuestions);
      } catch (err) {
        console.error('Failed to save assessment score:', err);
      }
    }
  };

  const handleRetakeWithNewAttempt = () => {
    // Moving to next attempt yields a new attempt-aware question set!
    const nextAttempt = currentAttempt + 1;
    setCurrentAttempt(nextAttempt);
    const newAsmt = getAssessmentForTopic(assessment.topic_name, userLevel, nextAttempt);
    setAssessment(newAsmt);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setIsFinished(false);
  };

  const percentage = Math.round((calculatedScore / totalQuestions) * 100);
  const passed = percentage >= 70;

  return (
    <div className="min-h-screen bg-cream-warm py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal hover:text-burgundy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel & Return to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-burgundy bg-burgundy-light px-2.5 py-1 rounded-full border border-burgundy-border">
              {assessment.topic_name} • {assessment.level}
            </span>
            <span className="text-xs font-mono font-bold text-charcoal-muted bg-white px-2 py-1 rounded-full border border-cream-border">
              Attempt #{assessment.attempt_number}
            </span>
          </div>
        </div>

        {!isFinished ? (
          /* QUESTION CARD */
          <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-10 shadow-doodle">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-charcoal-muted mb-2">
                <span>
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="font-mono text-burgundy">
                  {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete
                </span>
              </div>
              <div className="h-2.5 bg-cream-border rounded-full overflow-hidden border border-burgundy-border/30">
                <div
                  className="h-full bg-burgundy transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-dark leading-snug mb-6">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = currentSelection === idx;
                const isCorrect = idx === currentQ.correct_option;

                let optionStyle = 'border-cream-border hover:border-burgundy-border bg-white text-charcoal';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'border-burgundy bg-burgundy-light/60 text-burgundy-dark font-semibold shadow-sm';
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500';
                  } else {
                    optionStyle = 'opacity-50 border-cream-border bg-gray-50 text-charcoal-muted';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${optionStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold mt-0.5 ${
                      isSelected && !isSubmitted 
                        ? 'bg-burgundy text-white' 
                        : isSubmitted && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isSubmitted && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-cream-warm text-charcoal border border-cream-border'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm sm:text-base leading-snug flex-grow">
                      {opt}
                    </span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after check */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-cream-warm border border-burgundy-border mb-6 animate-fadeIn">
                <div className="flex items-start gap-2.5">
                  <Brain className="w-4 h-4 text-burgundy flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-burgundy block">
                      Concept Explanation
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal mt-1 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-border">
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={currentSelection === undefined}
                  onClick={handleCheckAnswer}
                  className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs sm:text-sm shadow-doodle transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs sm:text-sm shadow-doodle transition-all flex items-center gap-2"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ASSESSMENT COMPLETED CARD */
          <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-10 shadow-doodle text-center animate-fadeIn">
            <div className="inline-block p-4 rounded-3xl bg-burgundy-light mb-4">
              <GraduationCapDoodle className="w-16 h-16 text-burgundy" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-burgundy-dark mb-2">
              Assessment Completed!
            </h2>

            <p className="text-sm text-charcoal-muted max-w-md mx-auto mb-6">
              Your results have been recorded to your student profile and will dynamically calibrate your future search recommendations.
            </p>

            {/* Score pill */}
            <div className="inline-flex flex-col items-center p-6 rounded-2xl bg-cream-warm border-2 border-burgundy-border mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-muted">
                Your Score (Attempt #{assessment.attempt_number})
              </span>
              <div className="font-mono text-4xl sm:text-5xl font-black text-burgundy my-1">
                {calculatedScore} / {totalQuestions}
              </div>
              <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${
                passed 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}>
                {percentage}% — {passed ? 'Mastery Demonstrated' : 'Foundations Need Reinforcement'}
              </span>
            </div>

            {/* Dynamic Adaptive Recommendation Callout */}
            <div className="text-left bg-cream-off border border-burgundy-border rounded-2xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-burgundy-dark text-base">
                    How This Affects Your Next Retrieval:
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed mt-1">
                    {passed
                      ? `Because you scored ${percentage}% on ${assessment.topic_name}, our personalized ranker will now prioritize hands-on practice, coding challenges, and intermediate/advanced resources for this topic.`
                      : `Because your score on ${assessment.topic_name} was ${percentage}%, the system has added this to your "Areas to Improve" and will prioritize beginner-friendly conceptual explanations with step-by-step visual analogies.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (passed) {
                    onSearchTopic(`${assessment.topic_name} practice coding problems`);
                  } else {
                    onSearchTopic(`${assessment.topic_name} beginner explanation with visual examples`);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-bold shadow-doodle transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <span>Find Adaptive Follow-Up Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-burgundy-border hover:border-burgundy text-burgundy text-xs sm:text-sm font-bold shadow-sm transition-colors"
              >
                View Updated Profile
              </button>

              <button
                type="button"
                onClick={handleRetakeWithNewAttempt}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-cream-warm hover:bg-burgundy-light text-charcoal hover:text-burgundy transition-colors text-xs font-semibold"
                title="Retake Quiz with New Question Set"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Next Attempt (New Questions)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
