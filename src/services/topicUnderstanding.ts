import { LearningLevel, QueryUnderstanding, ResourceFormat } from '../types';

/**
 * Universal Natural Language Topic Understanding Engine
 * Parses student queries across ANY educational domain:
 * - Programming (C, Python, Java, JS, etc.)
 * - Computer Science (DBMS, OS, Networks, Algorithms)
 * - Mathematics (Calculus, Probability, Matrices, Algebra)
 * - Science (Biology, Physics, Chemistry)
 * - Humanities & Social Sciences (Economics, History, Geography, Business)
 */
export function understandLearningQuery(
  rawQuery: string,
  userLevelOverride?: LearningLevel,
  userFormatOverride?: ResourceFormat
): QueryUnderstanding {
  const qClean = rawQuery.trim();
  const qLower = qClean.toLowerCase();

  // 1. Identify Subject Domain & Programming Flag
  let subject = 'General Academics';
  let language: string | undefined = undefined;
  let isProgramming = false;

  // Programming languages & paradigms
  if (/\b(c\b|pointers?|malloc|calloc|dereferenc|struct|segfault)/i.test(qLower) && !/\b(sql|css)\b/i.test(qLower)) {
    subject = 'Programming';
    language = 'C';
    isProgramming = true;
  } else if (/\b(python|def\b|lambda|dict|list comp|pandas|numpy|django)\b/i.test(qLower)) {
    subject = 'Programming';
    language = 'Python';
    isProgramming = true;
  } else if (/\b(java\b|jvm|oop|polymorphism|inheritance|encapsulation|spring)\b/i.test(qLower)) {
    subject = 'Programming';
    language = 'Java';
    isProgramming = true;
  } else if (/\b(javascript|js\b|promise|async|await|closure|dom|react|typescript)\b/i.test(qLower)) {
    subject = 'Programming';
    language = 'JavaScript';
    isProgramming = true;
  } else if (/\b(sql|database|query|joins?|table|normalization|foreign key|primary key|rdbms|dbms)\b/i.test(qLower)) {
    subject = 'DBMS';
    language = 'SQL';
    isProgramming = true;
  } else if (/\b(linked lists?|trees?|graphs?|stacks?|queues?|binary search|sorting|algorithm|recursion|dijkstra|data structures?)\b/i.test(qLower)) {
    subject = 'Computer Science';
    isProgramming = true;
  } else if (/\b(operating systems?|cpu scheduling|deadlock|semaphore|paging|virtual memory|process)\b/i.test(qLower)) {
    subject = 'Operating Systems';
    isProgramming = true;
  } else if (/\b(computer networks?|osi model|tcp|udp|http|dns|ip address|packet)\b/i.test(qLower)) {
    subject = 'Computer Networks';
    isProgramming = true;
  } 
  // Mathematics
  else if (/\b(calculus|differentiation|derivative|integral|integration|limit|matrix|matrices|probability|statistics|algebra|geometry|vector)\b/i.test(qLower)) {
    subject = 'Mathematics';
    isProgramming = false;
  }
  // Science - Biology
  else if (/\b(photosynthesis|cell|dna|rna|mitosis|evolution|chloroplast|genetics|respiration|plant|biology)\b/i.test(qLower)) {
    subject = 'Biology';
    isProgramming = false;
  }
  // Science - Physics
  else if (/\b(newton|motion|force|gravity|acceleration|velocity|inertia|momentum|thermodynamics|optics|quantum|physics|relativity)\b/i.test(qLower)) {
    subject = 'Physics';
    isProgramming = false;
  }
  // Science - Chemistry
  else if (/\b(chemical bonding|covalent|ionic|periodic table|molecule|atom|reaction|acid|base|organic chemistry)\b/i.test(qLower)) {
    subject = 'Chemistry';
    isProgramming = false;
  }
  // Humanities & Others
  else if (/\b(economics|inflation|gdp|supply and demand|market|monopoly|fiscal|macroeconomics|microeconomics)\b/i.test(qLower)) {
    subject = 'Economics';
    isProgramming = false;
  } else if (/\b(history|revolution|world war|renaissance|empire|civilization|constitution)\b/i.test(qLower)) {
    subject = 'History';
    isProgramming = false;
  } else if (/\b(geography|climate|tectonic|plate|atmosphere|ecosystem|map)\b/i.test(qLower)) {
    subject = 'Geography';
    isProgramming = false;
  }

  // 2. Extract Canonical Topic & Subtopic
  let topic = '';
  let subtopic: string | undefined = undefined;

  if (/\b(c pointers?|pointers? in c|pointer arithmetic|pointers)\b/i.test(qLower)) {
    topic = 'C Pointers';
    subtopic = qLower.includes('arithmetic') ? 'Pointer Arithmetic' : (qLower.includes('swap') ? 'Pass-by-Reference' : 'Memory Addresses');
  } else if (/\b(python functions?|functions? in python|python def|lambda)\b/i.test(qLower)) {
    topic = 'Python Functions';
    subtopic = qLower.includes('lambda') ? 'Lambda Expressions' : (qLower.includes('arg') ? 'Parameters & Scope' : 'Function Definitions');
  } else if (/\b(photosynthesis|chloroplast|calvin cycle|light reaction)\b/i.test(qLower)) {
    topic = 'Photosynthesis';
    subtopic = qLower.includes('calvin') ? 'Calvin Cycle (Dark Reactions)' : (qLower.includes('light') ? 'Light-Dependent Reactions' : 'Chloroplast Photochemistry');
  } else if (/\b(newton'?s? laws?|laws? of motion|inertia|f=ma|action and reaction)\b/i.test(qLower)) {
    topic = "Newton's Laws of Motion";
    subtopic = qLower.includes('first') || qLower.includes('inertia') ? 'First Law (Law of Inertia)' 
      : qLower.includes('second') || qLower.includes('acceleration') || qLower.includes('f=ma') ? 'Second Law (F = ma)' 
      : qLower.includes('third') || qLower.includes('action') ? 'Third Law (Action-Reaction)' 
      : 'Classical Mechanics Principles';
  } else if (/\b(sql joins?|joins? in sql|inner join|left join|outer join)\b/i.test(qLower)) {
    topic = 'SQL Joins';
    subtopic = qLower.includes('left') ? 'Outer Joins & Anti-Joins' : (qLower.includes('inner') ? 'Inner Equi-Joins' : 'Multi-Table Relational Queries');
  } else if (/\b(dbms normalization|database normalization|1nf|2nf|3nf|bcnf)\b/i.test(qLower)) {
    topic = 'Database Normalization';
    subtopic = qLower.includes('3nf') ? 'Third Normal Form (3NF)' : (qLower.includes('2nf') ? 'Second Normal Form (2NF)' : '1NF to 3NF Decomposition');
  } else if (/\b(linked lists?|singly linked list|doubly linked list)\b/i.test(qLower)) {
    topic = 'Singly Linked Lists';
    subtopic = qLower.includes('revers') ? 'In-Place Reversal' : 'Node Pointer Traversal';
  } else if (/\b(calculus|differentiation|integration|definite integral|derivative)\b/i.test(qLower)) {
    topic = qLower.includes('different') || qLower.includes('derivative') ? 'Calculus Differentiation' : 'Calculus Integration';
    subtopic = qLower.includes('definite') ? 'Definite Integrals & Riemann Sum' : 'Fundamental Theorem of Calculus';
  } else if (/\b(java oop|oop in java|object oriented programming)\b/i.test(qLower)) {
    topic = 'Java Object-Oriented Programming';
    subtopic = 'Encapsulation, Inheritance & Polymorphism';
  } else if (/\b(javascript promises?|promises? in js|async await)\b/i.test(qLower)) {
    topic = 'JavaScript Promises & Async';
    subtopic = 'Event Loop & Asynchronous Control';
  } else if (/\b(recursion|recursive)\b/i.test(qLower)) {
    topic = 'Recursion & Backtracking';
    subtopic = 'Call Stack & Base Cases';
  } else if (/\b(chemical bonding|covalent bond|ionic bond)\b/i.test(qLower)) {
    topic = 'Chemical Bonding';
    subtopic = 'Ionic vs Covalent Interactions';
  } else if (/\b(thermodynamics)\b/i.test(qLower)) {
    topic = 'Laws of Thermodynamics';
    subtopic = 'Enthalpy, Entropy & Energy Conservation';
  } else if (/\b(economics|supply and demand)\b/i.test(qLower)) {
    topic = 'Microeconomics: Supply & Demand';
    subtopic = 'Market Equilibrium & Elasticity';
  } else {
    // General Concept Extractor: Strip conversational filler and title-case the core phrase
    const cleaned = qClean
      .replace(/^(please\s+|can\s+you\s+|i\s+want\s+to\s+learn\s+|explain\s+|teach\s+me\s+|what\s+is\s+|what\s+are\s+|help\s+me\s+understand\s+|give\s+me\s+examples\s+of\s+|tell\s+me\s+about\s+)/i, '')
      .replace(/\s+(simply|in\s+simple\s+language|in\s+detail|with\s+examples|for\s+beginners|with\s+diagrams?|step\s+by\s+step|easily)\b/gi, '')
      .trim();

    if (cleaned.length >= 3) {
      topic = cleaned
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      subtopic = 'Core Foundations';
    } else {
      topic = 'Academic Foundations';
      subtopic = 'General Overview';
    }
  }

  // 3. Learning Level Detection
  let level: LearningLevel = userLevelOverride || 'Beginner';
  if (!userLevelOverride) {
    if (qLower.includes('advanced') || qLower.includes('deep dive') || qLower.includes('expert') || qLower.includes('edge case')) {
      level = 'Advanced';
    } else if (qLower.includes('intermediate') || qLower.includes('practical') || qLower.includes('hands-on')) {
      level = 'Intermediate';
    } else if (qLower.includes('beginner') || qLower.includes('simple') || qLower.includes('basic') || qLower.includes('confus') || qLower.includes('start')) {
      level = 'Beginner';
    }
  }

  // 4. Learning Goal Extraction
  let learningGoal = `Comprehensive understanding of ${topic}`;
  if (qLower.includes('summary') || qLower.includes('revision') || qLower.includes('cheat sheet')) {
    learningGoal = `Complete Master Summary and revision for ${topic}`;
  } else if (qLower.includes('practice') || qLower.includes('quiz') || qLower.includes('challenge') || qLower.includes('question')) {
    learningGoal = `20-question practice challenges and problem solving on ${topic}`;
  } else if (qLower.includes('example') || qLower.includes('code') || qLower.includes('scenario')) {
    learningGoal = isProgramming 
      ? `Real-world code implementations with line-by-line explanations for ${topic}`
      : `Real-life scenarios, practical situations, and analogies for ${topic}`;
  } else if (qLower.includes('visual') || qLower.includes('diagram') || qLower.includes('picture') || qLower.includes('chart')) {
    learningGoal = `Visual architecture and conceptual diagrams for ${topic}`;
  }

  // 5. Preferred Format
  let preferredFormat: ResourceFormat = userFormatOverride || 'Explanation';
  if (!userFormatOverride) {
    if (qLower.includes('summary') || qLower.includes('revision') || qLower.includes('cheat sheet')) {
      preferredFormat = 'Summary';
    } else if (qLower.includes('visual') || qLower.includes('diagram') || qLower.includes('picture') || qLower.includes('chart')) {
      preferredFormat = 'Visual Guides';
    } else if (qLower.includes('practice') || qLower.includes('quiz') || qLower.includes('challenge') || qLower.includes('question')) {
      preferredFormat = 'Practice';
    } else if (qLower.includes('example') || qLower.includes('code') || qLower.includes('scenario')) {
      preferredFormat = 'Examples';
    }
  }

  // 6. Keywords & Query Reformulation
  const keywords = Array.from(
    new Set(
      `${topic} ${subtopic || ''} ${subject} ${language || ''} ${level} ${learningGoal} ${rawQuery}`
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2)
    )
  );

  const reformulated = `${topic} ${subtopic || ''} ${subject} ${level} ${preferredFormat} ${keywords.slice(0, 6).join(' ')}`.trim();

  return {
    raw_query: rawQuery,
    topic,
    subtopic,
    subject,
    language,
    is_programming: isProgramming,
    level,
    current_knowledge: `${level} learner exploring ${topic}`,
    learning_goal: learningGoal,
    difficulty: level === 'Beginner' ? 'Easy' : level === 'Intermediate' ? 'Medium' : 'Hard',
    preferred_resource_type: preferredFormat,
    reformulated_query: reformulated,
    search_keywords: keywords.slice(0, 10),
    confidence: 0.98
  };
}
