import { executeRagPipeline } from '../src/services/ragEngine';
import { understandLearningQuery } from '../src/services/topicUnderstanding';
import { getAssessmentForTopic } from '../src/data/assessmentsData';
import { UserProfile } from '../src/types';

// Mock test student profile
const mockStudent: UserProfile = {
  id: 'test-user-universal',
  username: 'universalStudent',
  learning_level: 'Beginner',
  preferred_format: 'Explanation',
  created_at: new Date().toISOString(),
  topics_mastery: {},
  recent_learning: [],
  areas_to_improve: [],
  assessment_history: []
};

async function runUniversalRetrieverTests() {
  console.log('========================================================');
  console.log('STARTING UNIVERSAL EDUCATIONAL RETRIEVER VERIFICATION');
  console.log('========================================================\n');

  let passes = 0;
  let failures = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passes++;
    } else {
      console.error(`[FAIL] ${testName} - ${detail || 'Condition not met'}`);
      failures++;
    }
  }

  // ----------------------------------------------------
  // TEST 1: C POINTERS
  // ----------------------------------------------------
  console.log('--- TEST 1: Query "C pointers" ---');
  const res1 = await executeRagPipeline('I am a beginner in C. Pointers are confusing. Explain them simply.', mockStudent);
  assert(res1.intent.topic === 'C Pointers', 'Test 1.1: Topic extracted as C Pointers', `Got: ${res1.intent.topic}`);
  assert(res1.intent.is_programming === true, 'Test 1.2: is_programming is TRUE for C Pointers');
  assert(res1.rankedResults.length > 0, 'Test 1.3: Results returned for C Pointers');
  assert(res1.rankedResults.every(r => r.resource.topic === 'C Pointers'), 'Test 1.4: STRICT TOPIC LOCK - All resources strictly C Pointers');
  
  const asmt1 = getAssessmentForTopic('C Pointers', 'Beginner', 1);
  assert(asmt1.topic_name === 'C Pointers', 'Test 1.5: Assessment topic is C Pointers');
  assert(asmt1.questions.some(q => q.question.toLowerCase().includes('pointer') || q.question.includes('&')), 'Test 1.6: Assessment questions test C Pointers');

  // ----------------------------------------------------
  // TEST 2: PHOTOSYNTHESIS (Biology / Science)
  // ----------------------------------------------------
  console.log('\n--- TEST 2: Query "Photosynthesis" ---');
  const res2 = await executeRagPipeline('Explain photosynthesis in simple language with examples', mockStudent);
  assert(res2.intent.topic === 'Photosynthesis', 'Test 2.1: Topic extracted as Photosynthesis', `Got: ${res2.intent.topic}`);
  assert(res2.intent.subject === 'Biology', 'Test 2.2: Subject identified as Biology', `Got: ${res2.intent.subject}`);
  assert(res2.intent.is_programming === false, 'Test 2.3: is_programming is FALSE for Photosynthesis');
  assert(res2.rankedResults.length > 0, 'Test 2.4: Results returned for Photosynthesis');
  assert(res2.rankedResults.every(r => r.resource.topic === 'Photosynthesis'), 'Test 2.5: STRICT TOPIC LOCK - All resources strictly Photosynthesis');
  
  // Non-programming Examples Format Check (No code, real-life scenarios)
  const res2Examples = await executeRagPipeline('Photosynthesis with examples', mockStudent, { format: 'Examples' });
  const topExampleRes = res2Examples.rankedResults[0]?.resource;
  assert(topExampleRes && topExampleRes.topic === 'Photosynthesis', 'Test 2.6: Examples format returned Photosynthesis');
  assert(topExampleRes.real_world_examples !== undefined && topExampleRes.real_world_examples.length > 0, 'Test 2.7: Non-programming topic has real_world_examples');
  assert(topExampleRes.code_snippets === undefined, 'Test 2.8: Non-programming topic contains NO code snippets');

  // Practice format 20 questions check
  const res2Practice = await executeRagPipeline('Photosynthesis practice questions', mockStudent, { format: 'Practice' });
  const practiceRes = res2Practice.rankedResults[0]?.resource;
  assert(practiceRes !== undefined, 'Test 2.9: Practice format retrieved resource');
  assert(practiceRes.practice_exercises?.length === 20, `Test 2.10: Practice format contains exactly 20 questions (Got: ${practiceRes.practice_exercises?.length})`);

  // Summary format check (unified single summary)
  const res2Summary = await executeRagPipeline('Photosynthesis revision cheat sheet', mockStudent, { format: 'Summary' });
  assert(res2Summary.rankedResults.length === 1, 'Test 2.11: Summary returns exactly 1 unified Master Summary card');
  assert(res2Summary.rankedResults[0].resource.format === 'Summary', 'Test 2.12: Master Summary format verified');
  assert(res2Summary.rankedResults[0].resource.full_content.includes('Photosynthesis'), 'Test 2.13: Master Summary teaches Photosynthesis');

  const asmt2 = getAssessmentForTopic('Photosynthesis', 'Beginner', 1);
  assert(asmt2.topic_name === 'Photosynthesis', 'Test 2.14: Assessment topic is Photosynthesis');
  assert(asmt2.questions.some(q => q.question.toLowerCase().includes('chloroplast') || q.question.toLowerCase().includes('photosynthesis')), 'Test 2.15: Assessment questions test Photosynthesis (NOT C Pointers!)');

  // ----------------------------------------------------
  // TEST 3: SQL JOINS (DBMS)
  // ----------------------------------------------------
  console.log('\n--- TEST 3: Query "SQL joins" ---');
  const res3 = await executeRagPipeline('Teach me SQL joins with examples', mockStudent);
  assert(res3.intent.topic === 'SQL Joins', 'Test 3.1: Topic extracted as SQL Joins', `Got: ${res3.intent.topic}`);
  assert(res3.intent.is_programming === true, 'Test 3.2: is_programming is TRUE for SQL Joins');
  assert(res3.rankedResults.every(r => r.resource.topic === 'SQL Joins'), 'Test 3.3: STRICT TOPIC LOCK - All resources strictly SQL Joins');

  const asmt3 = getAssessmentForTopic('SQL Joins', 'Intermediate', 1);
  assert(asmt3.topic_name === 'SQL Joins', 'Test 3.4: Assessment topic is SQL Joins');
  assert(asmt3.questions.some(q => q.question.toLowerCase().includes('join')), 'Test 3.5: Assessment questions test SQL Joins');

  // ----------------------------------------------------
  // TEST 4: NEWTON'S LAWS (Physics)
  // ----------------------------------------------------
  console.log("\n--- TEST 4: Query \"Newton's laws\" ---");
  const res4 = await executeRagPipeline("Explain Newton's laws of motion with real world examples", mockStudent);
  assert(res4.intent.topic === "Newton's Laws of Motion", 'Test 4.1: Topic extracted as Newton\'s Laws of Motion', `Got: ${res4.intent.topic}`);
  assert(res4.intent.subject === 'Physics', 'Test 4.2: Subject identified as Physics', `Got: ${res4.intent.subject}`);
  assert(res4.intent.is_programming === false, 'Test 4.3: is_programming is FALSE for Newton\'s Laws');
  assert(res4.rankedResults.every(r => r.resource.topic === "Newton's Laws of Motion"), 'Test 4.4: STRICT TOPIC LOCK - All resources strictly Newton\'s Laws');

  const asmt4 = getAssessmentForTopic("Newton's Laws of Motion", 'Beginner', 1);
  assert(asmt4.topic_name === "Newton's Laws of Motion", 'Test 4.5: Assessment topic is Newton\'s Laws of Motion');
  assert(asmt4.questions.some(q => q.question.toLowerCase().includes('inertia') || q.question.toLowerCase().includes('force')), 'Test 4.6: Assessment questions test Newton\'s Laws');

  // ----------------------------------------------------
  // TEST 5: PYTHON FUNCTIONS (Programming)
  // ----------------------------------------------------
  console.log('\n--- TEST 5: Query "Python functions" ---');
  const res5 = await executeRagPipeline('Teach me Python functions with line by line code examples', mockStudent, { format: 'Examples' });
  assert(res5.intent.topic === 'Python Functions', 'Test 5.1: Topic extracted as Python Functions', `Got: ${res5.intent.topic}`);
  assert(res5.intent.is_programming === true, 'Test 5.2: is_programming is TRUE for Python Functions');
  assert(res5.rankedResults.every(r => r.resource.topic === 'Python Functions'), 'Test 5.3: STRICT TOPIC LOCK - All resources strictly Python Functions');

  const pyExampleRes = res5.rankedResults[0]?.resource;
  assert(pyExampleRes !== undefined, 'Test 5.4: Retrieved Python Functions examples resource');
  assert(pyExampleRes.code_snippets !== undefined && pyExampleRes.code_snippets.length > 0, 'Test 5.5: Programming topic has code_snippets');
  
  // Verify LINE-BY-LINE EXPLANATION exists directly in code snippets
  const snip1 = pyExampleRes.code_snippets![0];
  assert(snip1.line_by_line !== undefined && snip1.line_by_line.length > 0, 'Test 5.6: Code snippet has line_by_line explanation');
  assert(snip1.line_by_line![0].line.length > 0 && snip1.line_by_line![0].explanation.length > 0, 'Test 5.7: line_by_line contains line text and clear explanation');

  const asmt5 = getAssessmentForTopic('Python Functions', 'Beginner', 1);
  assert(asmt5.topic_name === 'Python Functions', 'Test 5.8: Assessment topic is Python Functions');
  assert(asmt5.questions.some(q => q.question.toLowerCase().includes('def') || q.question.toLowerCase().includes('function')), 'Test 5.9: Assessment questions test Python Functions');

  // ----------------------------------------------------
  // TEST 6: STRICT TOPIC LOCK TRANSITION (Topic A -> Topic B)
  // ----------------------------------------------------
  console.log('\n--- TEST 6: Strict Topic Lock (Search C Pointers -> Search Photosynthesis) ---');
  // First search Topic A: C Pointers
  const searchA = await executeRagPipeline('C pointers', mockStudent);
  assert(searchA.intent.topic === 'C Pointers', 'Test 6.1: Search A topic is C Pointers');
  assert(searchA.rankedResults.every(r => !r.resource.title.toLowerCase().includes('photosynthesis')), 'Test 6.2: Search A contains ZERO Photosynthesis content');

  // Immediately search Topic B: Photosynthesis
  const searchB = await executeRagPipeline('Photosynthesis', mockStudent);
  assert(searchB.intent.topic === 'Photosynthesis', 'Test 6.3: Search B topic is Photosynthesis');
  assert(searchB.rankedResults.every(r => !r.resource.title.toLowerCase().includes('pointer')), 'Test 6.4: Search B contains ZERO C Pointers content');
  assert(searchB.rankedResults.every(r => !r.resource.title.toLowerCase().includes('linked list')), 'Test 6.5: Search B contains ZERO Linked List content');
  assert(searchB.rankedResults.every(r => !r.resource.title.toLowerCase().includes('sql')), 'Test 6.6: Search B contains ZERO SQL content');

  // ----------------------------------------------------
  // TEST 7: ASSESSMENT ATTEMPT ROTATION
  // ----------------------------------------------------
  console.log('\n--- TEST 7: Assessment Attempt Rotation (Photosynthesis Attempt 1 vs Attempt 2) ---');
  const asmtP1 = getAssessmentForTopic('Photosynthesis', 'Beginner', 1);
  const asmtP2 = getAssessmentForTopic('Photosynthesis', 'Beginner', 2);
  const q1Title = asmtP1.questions[0].question;
  const q2Title = asmtP2.questions[0].question;
  assert(q1Title !== q2Title, `Test 7.1: Attempt 1 Q1 (${q1Title}) != Attempt 2 Q1 (${q2Title})`);

  console.log('\n========================================================');
  console.log(`TEST RESULTS: ${passes} PASSED, ${failures} FAILED`);
  console.log('========================================================');

  if (failures > 0) {
    process.exit(1);
  }
}

runUniversalRetrieverTests().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
