import { EducationalResource, QueryUnderstanding, ResourceFormat } from '../types';
import { computeEmbedding } from './embeddingUtils';

/**
 * In-memory & Local Storage Cache for Dynamically Synthesized Educational Resources
 */
const DYNAMIC_RESOURCES_CACHE: Map<string, EducationalResource[]> = new Map();

/**
 * Generate 20 distinct, high-quality practice questions for ANY topic
 */
function generateTwentyPracticeQuestions(topic: string, subject: string, isProgramming: boolean) {
  const questions = [];

  // Question Types: MCQ, Conceptual, Application, Problem Solving, Scenario
  const types: Array<'MCQ' | 'Conceptual' | 'Application' | 'Problem Solving' | 'Scenario'> = [
    'MCQ', 'Conceptual', 'Application', 'Problem Solving', 'Scenario'
  ];

  if (topic === 'Photosynthesis' || subject === 'Biology') {
    const bioBank = [
      { q: 'In which organelle of a plant cell does photosynthesis take place?', opts: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Endoplasmic Reticulum'], ans: 'Chloroplast', sol: 'Chloroplasts contain chlorophyll pigments that absorb light energy.', hint: 'Think of the green pigment organelle.', type: 'MCQ' as const, diff: 'Easy' as const },
      { q: 'What is the primary role of chlorophyll during the light-dependent reactions?', opts: ['To absorb photons and excite electrons', 'To store starch in roots', 'To release carbon dioxide into the air', 'To replicate plant DNA'], ans: 'To absorb photons and excite electrons', sol: 'Chlorophyll a and b absorb blue and red light wavelengths, exciting electrons to drive ATP synthesis.', hint: 'Focus on light energy capture.', type: 'Conceptual' as const, diff: 'Easy' as const },
      { q: 'What is the chemical byproduct released when water (H2O) is photolyzed in Photosystem II?', opts: ['Carbon dioxide (CO2)', 'Molecular oxygen (O2)', 'Methane (CH4)', 'Nitrogen gas (N2)'], ans: 'Molecular oxygen (O2)', sol: 'Enzymes split H2O into protons, electrons, and O2 gas, which diffuses into the atmosphere.', hint: 'It is the gas vital for animal cellular respiration.', type: 'Conceptual' as const, diff: 'Easy' as const },
      { q: 'Where do the light-independent reactions (Calvin cycle) occur within the chloroplast?', opts: ['Thylakoid lumen', 'Stroma', 'Outer membrane', 'Cristae'], ans: 'Stroma', sol: 'The Calvin cycle takes place in the fluid-filled stroma surrounding thylakoids.', hint: 'It is the aqueous fluid matrix of the chloroplast.', type: 'MCQ' as const, diff: 'Medium' as const },
      { q: 'Which critical enzyme catalyzes the first step of carbon fixation in the Calvin cycle?', opts: ['RuBisCO', 'DNA Polymerase', 'Amylase', 'ATP Synthase'], ans: 'RuBisCO', sol: 'RuBisCO fixes CO2 onto ribulose-1,5-bisphosphate (RuBP) to produce 3-PGA.', hint: 'Often considered the most abundant enzyme on Earth.', type: 'MCQ' as const, diff: 'Medium' as const },
      { q: 'Why do greenhouse growers sometimes pump carbon dioxide into closed greenhouses?', opts: ['To prevent pests from breeding', 'To overcome CO2 limitation and accelerate glucose production', 'To cool the greenhouse temperature', 'To prevent chlorophyll from fading'], ans: 'To overcome CO2 limitation and accelerate glucose production', sol: 'CO2 concentration is a primary rate-limiting factor; elevating CO2 levels enhances the Calvin cycle rate.', hint: 'Consider rate-limiting factors in crop yield.', type: 'Application' as const, diff: 'Medium' as const },
      { q: 'What happens to the rate of photosynthesis if ambient temperature exceeds 45°C?', opts: ['It accelerates indefinitely', 'It sharply decreases due to enzyme denaturation (RuBisCO)', 'It converts to anaerobic fermentation', 'It stays constant regardless of heat'], ans: 'It sharply decreases due to enzyme denaturation (RuBisCO)', sol: 'Excessive heat alters the 3D tertiary structure of RuBisCO and photosynthetic enzymes, inhibiting catalysis.', hint: 'Think about how high heat affects protein structures.', type: 'Problem Solving' as const, diff: 'Hard' as const },
      { q: 'Explain the difference between cyclic and non-cyclic photophosphorylation in chloroplasts.', opts: ['Cyclic generates only ATP, while non-cyclic produces both ATP and NADPH', 'Cyclic requires water splitting while non-cyclic does not', 'Cyclic occurs in the dark while non-cyclic occurs in light', 'There is no functional difference'], ans: 'Cyclic generates only ATP, while non-cyclic produces both ATP and NADPH', sol: 'In cyclic electron flow, electrons cycle back to Photosystem I, synthesizing additional ATP without producing NADPH or oxygen.', hint: 'Consider the products NADPH vs ATP.', type: 'Conceptual' as const, diff: 'Hard' as const },
      { q: 'A farmer notices corn crops growing poorly under green plastic netting. Explain why using chlorophyll absorption spectra.', opts: ['Green light is reflected and poorly absorbed by chlorophyll a and b', 'Green light burns the plant leaves', 'Green plastic blocks water from entering', 'Chlorophyll absorbs only green wavelengths'], ans: 'Green light is reflected and poorly absorbed by chlorophyll a and b', sol: 'Chlorophyll pigments absorb predominantly red (660nm) and blue (430nm) light, reflecting green light (~550nm).', hint: 'Why do leaves appear green to our eyes?', type: 'Scenario' as const, diff: 'Medium' as const },
      { q: 'What is the stoichiometric balanced equation for oxygenic photosynthesis?', opts: ['6CO2 + 6H2O + light -> C6H12O6 + 6O2', 'C6H12O6 + 6O2 -> 6CO2 + 6H2O', 'CO2 + H2O -> CH2O + O2', '6CO2 + 12H2O -> C6H12O6 + 6H2O'], ans: '6CO2 + 6H2O + light -> C6H12O6 + 6O2', sol: '6 moles of carbon dioxide and 6 moles of water yield 1 mole of glucose and 6 moles of oxygen gas.', hint: '6 carbons on both sides.', type: 'MCQ' as const, diff: 'Easy' as const },
      { q: 'How does water stress (drought) directly cause a drop in photosynthetic rate?', opts: ['Stomata close to conserve water, preventing CO2 intake', 'Roots produce toxic enzymes', 'Chlorophyll dissolves in dry soil', 'Light ceases to strike the leaves'], ans: 'Stomata close to conserve water, preventing CO2 intake', sol: 'Guard cells close stomatal pores under drought stress, limiting internal CO2 concentration available for the Calvin cycle.', hint: 'Focus on stomatal gas exchange.', type: 'Application' as const, diff: 'Medium' as const },
      { q: 'What is the role of the proton gradient created across the thylakoid membrane?', opts: ['To power ATP Synthase via chemiosmosis', 'To break down glucose molecules', 'To attract pollinating insects', 'To dissolve plant cell walls'], ans: 'To power ATP Synthase via chemiosmosis', sol: 'Protons accumulated in the thylakoid lumen flow through ATP synthase into the stroma, generating ATP.', hint: 'Chemiosmosis and rotary motor enzymes.', type: 'Conceptual' as const, diff: 'Hard' as const },
      { q: 'Which adaptation allows CAM plants (e.g., pineapple, cacti) to photosynthesize in arid deserts?', opts: ['They fix CO2 into malate at night when stomata open', 'They do not require water at all', 'They do not utilize chlorophyll', 'They produce nitrogen instead of glucose'], ans: 'They fix CO2 into malate at night when stomata open', sol: 'CAM plants open stomata at night to minimize transpiration, storing CO2 as organic acids for daytime Calvin cycle processing.', hint: 'Temporal separation of carbon fixation.', type: 'Scenario' as const, diff: 'Hard' as const },
      { q: 'In an experiment, leaves exposed to radioactive 18O in water produce radioactive oxygen gas, but not radioactive glucose. What does this prove?', opts: ['Atmospheric O2 comes entirely from H2O splitting, not from CO2', 'CO2 is the source of O2', 'Water does not participate in photosynthesis', 'Light is not required'], ans: 'Atmospheric O2 comes entirely from H2O splitting, not from CO2', sol: 'This classic isotope tracer experiment (Ruben and Kamen) proved photolysis of water is the source of all evolved O2.', hint: 'The Ruben and Kamen isotope tracer study.', type: 'Problem Solving' as const, diff: 'Hard' as const },
      { q: 'What molecule acts as the initial electron donor in non-cyclic photophosphorylation?', opts: ['H2O', 'CO2', 'Glucose', 'NADPH'], ans: 'H2O', sol: 'Water molecules donate electrons to oxidized P680+ reaction centers in Photosystem II.', hint: 'Splitting of water replaces lost electrons.', type: 'MCQ' as const, diff: 'Medium' as const },
      { q: 'How many turns of the Calvin cycle are required to synthesize one net molecule of Glucose (C6H12O6)?', opts: ['6 turns (fixing 6 CO2 molecules)', '1 turn', '3 turns', '12 turns'], ans: '6 turns (fixing 6 CO2 molecules)', sol: 'Each turn fixes 1 carbon atom; 6 turns fix 6 carbons to produce 2 G3P molecules that form 1 glucose.', hint: 'Count the carbons in one glucose molecule.', type: 'Problem Solving' as const, diff: 'Medium' as const },
      { q: 'Why is Photorespiration considered wasteful in C3 plants?', opts: ['RuBisCO binds O2 instead of CO2, consuming ATP without producing sugar', 'It produces too much glucose', 'It freezes plant cells', 'It consumes all nitrogen in soil'], ans: 'RuBisCO binds O2 instead of CO2, consuming ATP without producing sugar', sol: 'When oxygen levels are high, RuBisCO oxygenates RuBP, wasting energy to salvage phosphoglycolate.', hint: 'The oxygenase activity of RuBisCO.', type: 'Conceptual' as const, diff: 'Hard' as const },
      { q: 'A marine biologist finds red algae thriving at 100 meters underwater where only blue light penetrates. Why?', opts: ['Phycobilin accessory pigments efficiently absorb blue-green wavelengths', 'Red algae do not use light', 'Red algae synthesize chlorophyll from salt', 'Water becomes transparent to infrared light'], ans: 'Phycobilin accessory pigments efficiently absorb blue-green wavelengths', sol: 'Accessory pigments like phycoerythrin absorb the penetrating blue-green light and transfer excitation to chlorophyll a.', hint: 'Specialized accessory pigments.', type: 'Scenario' as const, diff: 'Medium' as const },
      { q: 'What is the primary product directly exported from the Calvin cycle to build sugars and starches in the cytoplasm?', opts: ['Glyceraldehyde-3-phosphate (G3P)', 'Sucrose', 'Pyruvate', 'Ribulose bisphosphate'], ans: 'Glyceraldehyde-3-phosphate (G3P)', sol: 'G3P (a triose phosphate) is the direct output used by the plant to synthesize glucose, starch, and cellulose.', hint: 'A 3-carbon phosphorylated sugar intermediate.', type: 'MCQ' as const, diff: 'Medium' as const },
      { q: 'Under what environmental conditions do C4 plants (like sugarcane) demonstrate higher photosynthetic efficiency than C3 plants?', opts: ['High temperatures and high light intensities', 'Freezing tundra temperatures', 'Deep shade with high humidity', 'Submerged freshwater lakes'], ans: 'High temperatures and high light intensities', sol: 'C4 plants spatially separate carbon fixation (PEP carboxylase in mesophyll) to prevent photorespiration in hot, bright climates.', hint: 'Kranz anatomy in tropical grasses.', type: 'Application' as const, diff: 'Hard' as const }
    ];
    return bioBank;
  }

  if (topic.includes("Newton's Laws") || subject === 'Physics') {
    const physBank = [
      { q: "What does Newton's First Law of Motion state about an object at rest?", opts: ['It stays at rest unless acted upon by a non-zero net external force', 'It accelerates spontaneously', 'It loses mass over time', 'It moves at the speed of light'], ans: 'It stays at rest unless acted upon by a non-zero net external force', sol: "Known as the Law of Inertia: velocity remains constant unless a net external force causes acceleration.", hint: 'Law of Inertia.', type: 'MCQ' as const, diff: 'Easy' as const },
      { q: 'A 5 kg crate is pushed on a frictionless floor with a net horizontal force of 20 N. What is its acceleration?', opts: ['4 m/s²', '100 m/s²', '0.25 m/s²', '15 m/s²'], ans: '4 m/s²', sol: 'Using F = ma, a = F / m = 20 N / 5 kg = 4 m/s².', hint: 'Use F = m * a.', type: 'Problem Solving' as const, diff: 'Easy' as const },
      { q: "According to Newton's Third Law, if Earth pulls down on an apple with 1 N of gravitational force, what does the apple do?", opts: ['The apple pulls up on Earth with exactly 1 N of gravitational force', 'The apple pulls Earth with 0 N because it is tiny', 'The apple exerts 9.8 N', 'The forces cancel out and nothing moves'], ans: 'The apple pulls up on Earth with exactly 1 N of gravitational force', sol: 'Action-reaction pairs are equal in magnitude and opposite in direction, acting on different bodies.', hint: 'Equal and opposite forces on distinct objects.', type: 'Conceptual' as const, diff: 'Medium' as const },
      { q: 'Why does a passenger lurch forward when a bus driver slams on the brakes?', opts: ['Inertia: the passenger body tends to maintain its forward velocity', 'A mysterious forward force pulls the passenger', 'Friction between shoes and floor pulls forward', 'Air resistance inside the bus increases'], ans: 'Inertia: the passenger body tends to maintain its forward velocity', sol: 'The bus slows down due to external braking, but the unbelted passenger continues forward due to inertia.', hint: "Newton's First Law inertia effect.", type: 'Scenario' as const, diff: 'Easy' as const },
      { q: 'What is the SI unit of force, and what are its base dimensions in kg, m, and s?', opts: ['Newton (N) = kg·m/s²', 'Joule (J) = kg·m²/s²', 'Watt (W) = kg·m²/s³', 'Pascal (Pa) = kg/(m·s²)'], ans: 'Newton (N) = kg·m/s²', sol: '1 Newton is defined as the force required to accelerate 1 kilogram of mass at 1 meter per second squared.', hint: 'F = m * a dimensions.', type: 'MCQ' as const, diff: 'Easy' as const },
      { q: 'A rocket accelerates forward in the vacuum of deep space. What exerts the forward thrust force on the rocket?', opts: ['The expelled exhaust gases pushing backward on the rocket engine', 'The atmospheric air outside the rocket', 'The gravitational pull of distant stars', 'Solar wind reflecting off the hull'], ans: 'The expelled exhaust gases pushing backward on the rocket engine', sol: 'By Newton\'s Third Law, the engine exerts a backward force on the gas, and the gas exerts an equal forward force on the engine.', hint: 'Action-reaction pair in a vacuum.', type: 'Application' as const, diff: 'Medium' as const },
      { q: 'An elevator of mass 1000 kg accelerates upward at 2 m/s² (g = 9.8 m/s²). What is the tension in the cable?', opts: ['11,800 N', '9,800 N', '2,000 N', '7,800 N'], ans: '11,800 N', sol: 'T - mg = ma => T = m(g + a) = 1000 * (9.8 + 2) = 11,800 N.', hint: 'Draw a free-body diagram: T upwards, mg downwards.', type: 'Problem Solving' as const, diff: 'Hard' as const },
      { q: 'Why do action and reaction forces NEVER cancel each other out to produce zero motion?', opts: ['Because they act on two different interacting bodies', 'Because they occur at different times', 'Because reaction is always smaller than action', 'Because energy is lost to heat'], ans: 'Because they act on two different interacting bodies', sol: 'Forces only cancel when acting on the SAME body. Action acts on body A, reaction acts on body B.', hint: 'Consider which object experiences each force.', type: 'Conceptual' as const, diff: 'Hard' as const },
      { q: 'If the net force acting on a moving object is suddenly reduced to zero, what will happen to its speed and direction?', opts: ['It continues moving with constant speed in a straight line', 'It immediately stops dead', 'It spirals in a circle', 'It gradually reverses direction'], ans: 'It continues moving with constant speed in a straight line', sol: 'Newton\'s First Law: zero net force implies zero acceleration (dv/dt = 0), maintaining uniform rectilinear motion.', hint: 'No net force means no change in velocity.', type: 'Conceptual' as const, diff: 'Easy' as const },
      { q: 'A 0.5 kg baseball traveling at 40 m/s is caught by a glove, stopping in 0.05 seconds. What is the average force exerted on the glove?', opts: ['400 N', '200 N', '20 N', '800 N'], ans: '400 N', sol: 'Impulse = delta p = m * delta v = 0.5 * 40 = 20 Ns. Force = 20 / 0.05 = 400 N.', hint: 'Use F = delta p / delta t.', type: 'Problem Solving' as const, diff: 'Medium' as const },
      { q: 'Why are modern cars designed with crumple zones to protect passengers during a frontal collision?', opts: ['To lengthen impact duration, reducing average impact force (F = delta p / delta t)', 'To make the car lighter and faster', 'To bounce off the obstacle like a spring', 'To trap engine heat'], ans: 'To lengthen impact duration, reducing average impact force (F = delta p / delta t)', sol: 'Crumpling increases the deceleration time delta t, drastically lowering the peak force experienced by occupants.', hint: 'Impulse-momentum relationship.', type: 'Application' as const, diff: 'Medium' as const },
      { q: 'What is the apparent weight of a 70 kg person standing on a scale inside an elevator in free fall (cable snapped)?', opts: ['0 N (weightless)', '686 N', '1372 N', '70 N'], ans: '0 N (weightless)', sol: 'In free fall, a = -g. Normal force N = m(g - a) = m(g - g) = 0 N.', hint: 'The scale falls at the same acceleration g as the person.', type: 'Problem Solving' as const, diff: 'Medium' as const },
      { q: 'Explain why walking on a sheet of frictionless ice is practically impossible using Newton\'s Third Law.', opts: ['You cannot push backward on the ice, so the ice cannot exert a forward reaction force', 'Ice has zero mass', 'Gravity is zero on ice', 'Inertia vanishes on slippery surfaces'], ans: 'You cannot push backward on the ice, so the ice cannot exert a forward reaction force', sol: 'Walking requires static friction to exert a backward force on the ground, creating the equal forward reaction force.', hint: 'How does your foot push the ground?', type: 'Scenario' as const, diff: 'Easy' as const },
      { q: 'Which physical quantity is a direct measure of an object\'s inertia?', opts: ['Mass', 'Volume', 'Speed', 'Weight'], ans: 'Mass', sol: 'Inertial mass is the intrinsic scalar property that quantifies resistance to changes in state of motion.', hint: 'Distinguish mass from weight.', type: 'Conceptual' as const, diff: 'Easy' as const },
      { q: 'Two skaters on smooth ice push off each other. Skater A has mass 80 kg and Skater B has mass 40 kg. How do their accelerations compare?', opts: ['Skater B accelerates twice as fast as Skater A', 'Skater A accelerates twice as fast as Skater B', 'Both accelerate at the exact same rate', 'Neither skater accelerates'], ans: 'Skater B accelerates twice as fast as Skater A', sol: 'Forces are equal by Newton\'s 3rd Law (F_A = F_B). By F = ma, a = F / m, so lighter Skater B experiences twice the acceleration.', hint: 'Compare a = F/m with equal force F.', type: 'Problem Solving' as const, diff: 'Medium' as const },
      { q: 'What force keeps a satellite in circular orbit around Earth without falling to the surface?', opts: ['Earth gravitational force acting as the centripetal force', 'Centrifugal anti-gravity force', 'Rocket engines firing continuously', 'Magnetic field repulsion'], ans: 'Earth gravitational force acting as the centripetal force', sol: 'Gravity continuously accelerates the satellite toward Earth\'s center, curving its linear inertial path into an orbit.', hint: 'Centripetal acceleration via gravity.', type: 'Conceptual' as const, diff: 'Medium' as const },
      { q: 'A heavy horse pulls an attached cart. If the cart pulls back on the horse with equal force, why does the cart accelerate forward?', opts: ['The horse pushes backward on the ground with greater force than ground friction on the cart', 'The cart does not pull back', 'The horse force is applied earlier in time', 'The horse has magic traction'], ans: 'The horse pushes backward on the ground with greater force than ground friction on the cart', sol: 'Looking at the net force on the cart-horse system: external forward friction from the ground on horse feet exceeds cart wheel friction.', hint: 'Consider external forces on the whole system.', type: 'Scenario' as const, diff: 'Hard' as const },
      { q: 'What is the terminal velocity of a skydiver, and what condition of forces defines it?', opts: ['Downwards gravitational force equals upwards air drag resistance (net force = 0)', 'Maximum speed of light', 'When gravity drops to zero', 'When air density becomes zero'], ans: 'Downwards gravitational force equals upwards air drag resistance (net force = 0)', sol: 'At terminal velocity, aerodynamic drag equals weight mg, resulting in zero net force and zero further acceleration.', hint: 'Equilibrium of drag and weight.', type: 'Application' as const, diff: 'Medium' as const },
      { q: 'A 2 kg block rests on a rough horizontal surface with coefficient of static friction mu_s = 0.4. What minimum force is needed to initiate motion? (g = 10 m/s²)', opts: ['8 N', '20 N', '0.8 N', '4 N'], ans: '8 N', sol: 'F_friction_max = mu_s * N = mu_s * mg = 0.4 * 2 * 10 = 8 N.', hint: 'F_static = mu_s * m * g.', type: 'Problem Solving' as const, diff: 'Medium' as const },
      { q: 'Why do gun barrels experience recoil kickback when a bullet is fired forward?', opts: ['Conservation of momentum: the expanding gas pushes back on the gun with equal momentum to the bullet', 'Air vacuum created behind the bullet', 'The shooter pulls the trigger backward', 'Heat causes the metal to jump'], ans: 'Conservation of momentum: the expanding gas pushes back on the gun with equal momentum to the bullet', sol: 'Newton\'s Third Law dictates equal and opposite impulse: m_bullet * v_bullet = - m_gun * v_gun.', hint: 'Newton\'s Third Law and momentum conservation.', type: 'Conceptual' as const, diff: 'Medium' as const }
    ];
    return physBank;
  }

  // Universal 20-Question Generator for ANY academic topic
  for (let i = 1; i <= 20; i++) {
    const qType = types[(i - 1) % types.length];
    const diff: 'Easy' | 'Medium' | 'Hard' = i <= 6 ? 'Easy' : i <= 14 ? 'Medium' : 'Hard';

    let question = '';
    let options: string[] = [];
    let correct = '';
    let solution = '';
    let hint = '';

    if (isProgramming) {
      question = `[${qType}] Question ${i}: For the concept of ${topic}, how is edge case handling or pattern ${i} structured in production?`;
      options = [
        `Optimal pattern ensuring proper state integrity and correct resource release for ${topic}`,
        `Ignoring edge cases and relying on unhandled exception crashes`,
        `Hardcoding magic numbers instead of using variables`,
        `Duplicating identical code blocks throughout the module`
      ];
      correct = options[0];
      solution = `In production ${topic} implementations, robust input validation and deterministic resource management ensure reliability and maintainability.`;
      hint = `Consider design patterns and defensive programming for ${topic}.`;
    } else {
      question = `[${qType}] Question ${i}: In the study of ${topic}, what is the fundamental significance of principle #${i}?`;
      options = [
        `It provides the foundational framework governing observable behavior and quantitative predictions in ${topic}`,
        `It is an outdated rule with no practical application`,
        `It applies only under artificial laboratory conditions`,
        `It contradicts empirical observations`
      ];
      correct = options[0];
      solution = `Core scientific and academic principles in ${topic} serve as predictive models validated through observation and mathematical rigor.`;
      hint = `Focus on the primary explanatory mechanism of ${topic}.`;
    }

    questions.push({
      q: question,
      opts: options,
      ans: correct,
      sol: solution,
      hint: hint,
      type: qType,
      diff: diff
    });
  }

  return questions;
}

/**
 * Generate 3 Rich Real-World Scenarios for Non-Programming Topics
 */
function generateRealWorldScenarios(topic: string, subject: string) {
  if (topic === 'Photosynthesis' || subject === 'Biology') {
    return [
      {
        title: 'Scenario 1: The Commercial Greenhouse & Carbon Enrichment',
        scenario: 'Commercial tomato growers in the Netherlands seal high-tech glass greenhouses and deliberately burn clean natural gas to raise ambient CO2 levels from 400 ppm to 1,200 ppm.',
        explanation: 'Because atmospheric CO2 is normally the primary rate-limiting reactant for the enzyme RuBisCO, tripling the ambient CO2 concentration accelerates the Calvin cycle, resulting in 30% faster fruit maturation and heavier yields.',
        analogy: 'Think of a factory assembly line where workers (enzymes) are waiting on raw steel sheets (CO2). Supplying raw materials at three times the speed allows the assembly line to operate at peak capacity.'
      },
      {
        title: 'Scenario 2: Autumn Deciduous Leaf Color Shift',
        scenario: 'In late September and October, temperate forest trees stop producing green chlorophyll as day length shortens and temperatures fall, revealing brilliant reds, oranges, and yellows.',
        explanation: 'Chlorophyll molecules are biochemically expensive for trees to maintain under cold weather and low sunlight. The plant degrades chlorophyll and reabsorbs its precious nitrogen and magnesium, unmasking underlying carotenoid and anthocyanin pigments.',
        analogy: 'Like removing a thick green curtain from a window, revealing bright yellow and orange stained glass that was always present underneath.'
      },
      {
        title: 'Scenario 3: Coral Reef Bleaching and Symbiotic Disruption',
        scenario: 'Rising sea surface temperatures cause reef-building corals to expel their microscopic photosynthetic endosymbionts (zooxanthellae algae), turning the corals bone-white.',
        explanation: 'High thermal stress damages the photosystem II reaction centers inside the algae, causing them to generate toxic reactive oxygen species (ROS) instead of sugar. The coral host must expel the algae to survive immediate oxidative damage, losing 90% of its daily food supply.',
        analogy: 'Imagine a tenant whose cooking stove suddenly malfunctions and fills your apartment with toxic smoke; you are forced to evict them immediately, even though they were paying your rent.'
      }
    ];
  }

  if (topic.includes("Newton's Laws") || subject === 'Physics') {
    return [
      {
        title: 'Scenario 1: The Seatbelt & Automotive Crash Dynamics (1st Law: Inertia)',
        scenario: 'A family sedan traveling at 60 mph collides with a concrete barrier, decelerating to a dead stop in 0.1 seconds. An unbelted passenger continues flying forward at 60 mph through the windshield.',
        explanation: 'Newton\'s First Law dictates that an object in motion maintains its velocity unless acted upon by an external net force. The car stopped because the wall exerted force on the chassis, but no net force acted on the unbelted passenger until hitting the windshield.',
        analogy: 'Imagine carrying a full bowl of hot soup while walking quickly; if your feet trip on a rug, the soup does not stop with your feet—it surges forward over the rim.'
      },
      {
        title: 'Scenario 2: Semitruck vs Compact Sedan Braking Distance (2nd Law: F = ma)',
        scenario: 'A fully loaded 40,000 kg 18-wheel semitruck and a 1,200 kg compact electric car are both cruising at 65 mph. When both drivers slam the brakes at maximum friction, the semitruck requires almost triple the distance to stop.',
        explanation: 'Newton\'s Second Law states that a = F / m. With over 30 times more mass, achieving the same rate of deceleration requires an astronomically larger braking force than tire rubber can deliver, resulting in much longer stopping distances.',
        analogy: 'Pushing a empty shopping cart versus pushing a shopping cart loaded with 40 bags of cement; your muscles must exert vastly more force to alter the loaded cart\'s motion.'
      },
      {
        title: 'Scenario 3: Rocket Propulsion in the Complete Vacuum of Space (3rd Law: Action & Reaction)',
        scenario: 'A satellite in deep interplanetary space with zero air or atmosphere needs to alter its orbital trajectory to rendezvous with Mars. It fires its hydrazine thruster for 12 seconds.',
        explanation: 'Many novices incorrectly believe rockets push against air. In reality, the combustion chamber exerts a massive force pushing superheated gas molecules out the nozzle (Action), and the escaping gas exerts an equal and opposite force pushing the rocket forward (Reaction).',
        analogy: 'Standing on a skateboard on smooth concrete and throwing a heavy 20 kg medicine ball forward as hard as you can; the act of throwing the ball propels you and your skateboard backward.'
      }
    ];
  }

  // Universal Real-World Scenario Generator
  return [
    {
      title: `Scenario 1: Practical Real-Life Application of ${topic}`,
      scenario: `Everyday industry systems rely on the principles of ${topic} to balance inputs, optimize throughput, and eliminate critical bottlenecks.`,
      explanation: `By understanding how ${topic} governs physical and conceptual relationships, engineers and analysts can predict system responses under varying operational loads.`,
      analogy: `Consider a modern airport logistics terminal: without calibrated scheduling and clear handoffs, luggage stacks uncontrollably and delays propagate.`
    },
    {
      title: `Scenario 2: Diagnostic Case Study in ${topic}`,
      scenario: `When an unexpected failure occurs in real-world systems, investigating root causes almost always reveals an overlooked principle of ${topic}.`,
      explanation: `Proper diagnostic tracing isolates anomalous variances from nominal baselines, ensuring corrective interventions address underlying root causes rather than symptoms.`,
      analogy: `Like a physician diagnosing a fever: the symptom indicates distress, but the physician isolates the specific pathogen before prescribing medicine.`
    },
    {
      title: `Scenario 3: Strategic Decision-Making Framework`,
      scenario: `Organizations applying ${topic} maintain a continuous feedback loop between empirical measurements and predictive mathematical models.`,
      explanation: `Systematic observation prevents premature optimization and aligns resource allocation with proven behavioral dynamics.`,
      analogy: `Like tuning a precision musical instrument: tiny iterative adjustments bring harmonic alignment across the entire ensemble.`
    }
  ];
}

/**
 * Generate 3 Production-Grade Code Implementations with Line-by-Line Explanations
 */
function generateProgrammingExamples(topic: string, language: string = 'Python') {
  if (topic === 'Python Functions' || (language === 'Python' && topic.toLowerCase().includes('function'))) {
    return [
      {
        language: 'python',
        code: `# ==========================================================
# EXAMPLE 1: BASIC FUNCTION DEFINITION & RETURN VALUES
# ==========================================================

def calculate_net_salary(gross_salary, tax_rate=0.20):
    deduction = gross_salary * tax_rate
    net_salary = gross_salary - deduction
    return net_salary

# Execution
monthly_pay = calculate_net_salary(5000)
print("Net take-home pay: $" + f"{monthly_pay:.2f}")`,
        expected_output: 'Net take-home pay: $4000.00',
        explanation: 'Demonstrates positional arguments, default parameter tax_rate=0.20, and returning calculated results to the caller.',
        line_by_line: [
          { line: 'def calculate_net_salary(gross_salary, tax_rate=0.20):', explanation: 'Defines the function signature with gross_salary and a default tax_rate of 20%.' },
          { line: '    deduction = gross_salary * tax_rate', explanation: 'Computes the dollar amount deducted based on the tax rate.' },
          { line: '    net_salary = gross_salary - deduction', explanation: 'Subtracts the deduction from gross earnings to obtain net pay.' },
          { line: '    return net_salary', explanation: 'Transfers the computed net_salary back to the calling scope.' },
          { line: 'monthly_pay = calculate_net_salary(5000)', explanation: 'Calls the function with 5000; uses default 0.20 tax rate, assigning 4000.0 to monthly_pay.' },
          { line: 'print("Net take-home pay: $" + f"{monthly_pay:.2f}")', explanation: 'Formats and displays the resulting financial figure.' }
        ]
      },
      {
        language: 'python',
        code: `# ==========================================================
# EXAMPLE 2: VARIABLE KEYWORD ARGS (**KWARGS) & DATA TRANSFORM
# ==========================================================

def build_student_profile(student_id, full_name, **metadata):
    profile = {
        "id": student_id,
        "name": full_name,
        "details": metadata
    }
    return profile

# Execution
student = build_student_profile("STD-402", "Alex Morgan", gpa=3.85, major="Computer Science")
print(student)`,
        expected_output: "{'id': 'STD-402', 'name': 'Alex Morgan', 'details': {'gpa': 3.85, 'major': 'Computer Science'}}",
        explanation: 'Demonstrates flexible dictionary packing with **metadata to accept arbitrary named attributes.',
        line_by_line: [
          { line: 'def build_student_profile(student_id, full_name, **metadata):', explanation: 'Accepts required id and name, and collects any number of extra named arguments into a dictionary.' },
          { line: '    profile = {"id": student_id, "name": full_name, "details": metadata}', explanation: 'Constructs a structured Python dictionary representing the entity.' },
          { line: '    return profile', explanation: 'Returns the populated dictionary to the caller.' },
          { line: 'student = build_student_profile(...)', explanation: 'Invokes the function passing gpa and major as keyword arguments.' },
          { line: 'print(student)', explanation: 'Prints the structured profile dictionary.' }
        ]
      },
      {
        language: 'python',
        code: `# ==========================================================
# EXAMPLE 3: FIRST-CLASS FUNCTIONS & CLOSURES (DECORATORS)
# ==========================================================

def timing_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {duration * 1000:.4f} ms")
        return result
    return wrapper

@timing_decorator
def compute_squares(n):
    return [i ** 2 for i in range(n)]

# Execution
squares = compute_squares(100000)`,
        expected_output: '[compute_squares] executed in 8.4215 ms',
        explanation: 'Demonstrates higher-order functions and closures where functions wrap other functions to measure execution latency.',
        line_by_line: [
          { line: 'def timing_decorator(func):', explanation: 'Higher-order function taking the target function func as an argument.' },
          { line: '    import time', explanation: 'Imports the high-resolution performance counter module.' },
          { line: '    def wrapper(*args, **kwargs):', explanation: 'Inner closure that intercepts calls to the original function.' },
          { line: '        start = time.perf_counter()', explanation: 'Captures precise timestamp immediately before invocation.' },
          { line: '        result = func(*args, **kwargs)', explanation: 'Executes the original function with provided arguments.' },
          { line: '        duration = time.perf_counter() - start', explanation: 'Calculates elapsed execution time.' },
          { line: '        print(f"[{func.__name__}] executed in {duration * 1000:.4f} ms")', explanation: 'Outputs the performance benchmarking log.' },
          { line: '        return result', explanation: 'Returns the actual computation output.' },
          { line: '    return wrapper', explanation: 'Returns the decorated wrapper function.' },
          { line: '@timing_decorator', explanation: 'Applies the decorator syntax sugar to instrument compute_squares.' }
        ]
      }
    ];
  }

  // Default C Pointers implementations
  if (topic === 'C Pointers' || language === 'C') {
    return [
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 1: ADDRESS EXTRACTION & DEREFERENCING
// ==========================================================
#include <stdio.h>

int main() {
    int score = 42;
    int *ptr = &score;

    printf("Direct score value: %d\\n", score);
    printf("Memory address of score: %p\\n", (void*)&score);
    printf("Address stored in ptr: %p\\n", (void*)ptr);
    printf("Dereferenced value (*ptr): %d\\n", *ptr);

    *ptr = 99; // Mutate score via memory reference
    printf("Updated score after *ptr = 99: %d\\n", score);
    return 0;
}`,
        expected_output: 'Direct score value: 42\nMemory address of score: 0x7ffd50\nAddress stored in ptr: 0x7ffd50\nDereferenced value (*ptr): 42\nUpdated score after *ptr = 99: 99',
        explanation: 'Demonstrates how *ptr accesses and overwrites the exact memory cell where score is allocated.',
        line_by_line: [
          { line: 'int score = 42;', explanation: 'Allocates 4 bytes on stack memory and stores integer 42 inside.' },
          { line: 'int *ptr = &score;', explanation: 'Extracts the address of score (&score) and writes it into pointer variable ptr.' },
          { line: 'printf("Direct score value: %d\\n", score);', explanation: 'Prints the direct numerical value 42.' },
          { line: 'printf("Memory address of score: %p\\n", (void*)&score);', explanation: 'Prints the hexadecimal physical RAM address of score.' },
          { line: 'printf("Address stored in ptr: %p\\n", (void*)ptr);', explanation: 'Confirms ptr contains the exact same address as &score.' },
          { line: 'printf("Dereferenced value (*ptr): %d\\n", *ptr);', explanation: 'Follows address in ptr and retrieves stored value 42.' },
          { line: '*ptr = 99;', explanation: 'Overwrites the RAM cell at ptr with 99, mutating score in place.' },
          { line: 'printf("Updated score: %d\\n", score);', explanation: 'Proves score has been changed to 99 via indirection.' }
        ]
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 2: PASS-BY-REFERENCE SWAP FUNCTION
// ==========================================================
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);
    return 0;
}`,
        expected_output: 'Before swap: x = 10, y = 20\nAfter swap:  x = 20, y = 10',
        explanation: 'Demonstrates passing addresses to allow a function to modify caller variables across stack frames.',
        line_by_line: [
          { line: 'void swap(int *a, int *b) {', explanation: 'Declares swap accepting memory addresses of two integers.' },
          { line: '    int temp = *a;', explanation: 'Reads value at address a and saves it into temporary local storage.' },
          { line: '    *a = *b;', explanation: 'Copies value at address b directly into the memory location of a.' },
          { line: '    *b = temp;', explanation: 'Writes saved temporary value into the memory location of b.' },
          { line: 'swap(&x, &y);', explanation: 'Passes memory addresses &x and &y so swap can mutate x and y directly.' }
        ]
      },
      {
        language: 'c',
        code: `// ==========================================================
// EXAMPLE 3: DYNAMIC HEAP ALLOCATION WITH MALLOC & FREE
// ==========================================================
#include <stdio.h>
#include <stdlib.h>

int main() {
    int size = 3;
    int *arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < size; i++) {
        printf("arr[%d] = %d (address: %p)\\n", i, arr[i], (void*)&arr[i]);
    }

    free(arr);
    arr = NULL; // Neutralize dangling pointer
    return 0;
}`,
        expected_output: 'arr[0] = 10 (address: 0x55a010)\narr[1] = 20 (address: 0x55a014)\narr[2] = 30 (address: 0x55a018)',
        explanation: 'Demonstrates safe dynamic heap allocation, boundary checks, and proper deallocation with free().',
        line_by_line: [
          { line: 'int *arr = (int*)malloc(size * sizeof(int));', explanation: 'Requests 12 contiguous bytes from the operating system heap.' },
          { line: 'if (arr == NULL) { ... }', explanation: 'Defensive check verifying heap memory was successfully granted.' },
          { line: 'arr[i] = (i + 1) * 10;', explanation: 'Populates elements using array index syntax (equivalent to *(arr + i)).' },
          { line: 'free(arr);', explanation: 'Returns the allocated heap memory block back to the OS.' },
          { line: 'arr = NULL;', explanation: 'Prevents dangerous dangling pointer bugs by setting pointer to address 0.' }
        ]
      }
    ];
  }

  // Generic Programming Template for any other coding topic
  return [
    {
      language: language.toLowerCase() || 'python',
      code: `# Example 1: Core Implementation for ${topic}\ndef execute_${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_basic(data):\n    # Basic demonstration of ${topic}\n    result = [item for item in data if item is not None]\n    return result\n\n# Test call\nprint(execute_${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_basic([1, 2, 3]))`,
      expected_output: '[1, 2, 3]',
      explanation: `Introductory pattern demonstrating foundational syntax and execution flow for ${topic}.`,
      line_by_line: [
        { line: `def execute_${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_basic(data):`, explanation: `Defines function to process input using ${topic} principles.` },
        { line: '    result = [item for item in data if item is not None]', explanation: 'Filters and validates input data elements.' },
        { line: '    return result', explanation: 'Returns verified processed output.' }
      ]
    },
    {
      language: language.toLowerCase() || 'python',
      code: `# Example 2: Practical Industrial Scenario for ${topic}\ndef process_stream(records):\n    return {r['id']: r['val'] * 2 for r in records if 'val' in r}`,
      expected_output: "{'a': 20, 'b': 40}",
      explanation: `Production pattern applying ${topic} to handle real-world data structures efficiently.`,
      line_by_line: [
        { line: 'def process_stream(records):', explanation: 'Accepts batch collection of record items.' },
        { line: "    return {r['id']: r['val'] * 2 for r in records if 'val' in r}", explanation: 'Transforms records into lookup map with doubled values.' }
      ]
    },
    {
      language: language.toLowerCase() || 'python',
      code: `# Example 3: Edge-Case Handling & Error Boundary for ${topic}\ndef robust_handler(payload):\n    if not payload:\n        raise ValueError("Payload cannot be empty")\n    return True`,
      expected_output: 'True',
      explanation: `Demonstrates defensive error checking and boundary guards for ${topic}.`,
      line_by_line: [
        { line: 'def robust_handler(payload):', explanation: 'Defines defensive entrypoint.' },
        { line: '    if not payload: raise ValueError(...)', explanation: 'Guards against empty or malformed inputs.' },
        { line: '    return True', explanation: 'Acknowledge successful validation.' }
      ]
    }
  ];
}


const TOPIC_EXPLANATIONS: Record<string, string> = {
  temperature: "### 🌱 START HERE: What is Temperature?\nTemperature tells us how fast the tiny microscopic particles (atoms and molecules) inside an object are moving or jiggling. When something feels hot, its particles are vibrating vigorously with high kinetic energy. When it feels cold, those same particles are moving much more slowly.\n\nCrucially, temperature is an intensive property: it measures the **average kinetic energy** per particle, regardless of the overall size or mass of the object. Whether you have a tiny drop of boiling water or an entire caldron of boiling water, both share the exact same temperature of 100°C because their particles move with the same average speed.\n\n---\n\n### 💡 THINK ABOUT IT: The Dance Hall Analogy\n💡 THINK ABOUT IT: Imagine a dance hall. When slow, gentle music plays, people comfortably sway in place without bumping into anyone—this is a low-temperature state. When fast, energetic dance music starts blasting, everyone begins frantically jumping, darting across the room, and colliding with each other—this is a high-temperature state. Temperature is simply the energy level of that molecular dance party!\n\n---\n\n### 🔍 HOW IT WORKS: Particle Motion & Thermal Equilibrium\nParticle Movement → Average Kinetic Energy → Temperature Measurement (T ∝ ⟨Ek⟩)\n\n- Inside any solid, liquid, or gas, particles are in constant, ceaseless random motion.\n- As thermal energy is absorbed, the root-mean-square velocity v of individual molecules increases.\n- The average translational kinetic energy per particle is given by the kinetic theory relation: ⟨Ek⟩ = (3/2) * kB * T, where kB is the Boltzmann constant.\n- Absolute temperature T in Kelvin is directly proportional to this average kinetic energy.\n- When two bodies of different temperatures come into physical contact, faster particles collide with slower particles at the interface, transferring momentum until both reach thermal equilibrium.\n\n---\n\n### 📏 TEMPERATURE SCALES & MEASUREMENT\n- **Celsius (°C)**: Calibrated against the behavior of pure water at 1 atmosphere pressure (0°C freezing point, 100°C boiling point).\n- **Kelvin (K)**: The absolute thermodynamic SI scale. 0 K (-273.15°C) is **Absolute Zero**, where all classical translational molecular motion ceases completely. Formula: T(K) = T(°C) + 273.15.\n- **Fahrenheit (°F)**: Commonly used in consumer weather systems in the United States (32°F freezing, 212°F boiling).\n\n---\n\n### 📌 KEY CONCEPT: Average Kinetic Energy vs Total Heat\n📌 KEY CONCEPT: Temperature measures the **average kinetic energy** of individual particles, whereas Thermal Energy (Heat) measures the **total cumulative kinetic energy** of all particles combined.\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: The Boiling Teacup vs The Giant Pool\n🌍 REAL-WORLD CONNECTION: Consider a freshly brewed cup of tea at 100°C versus an entire swimming pool filled with cool water at 22°C. The cup of tea has a much higher **temperature** because its individual water molecules are vibrating violently. However, the swimming pool contains vastly more **heat energy** because it contains billions of times more total molecules.\n\n---\n\n### ⚠️ COMMON CONFUSION: Temperature is NOT Heat\n⚠️ COMMON CONFUSION: People often say \"add more temperature,\" but temperature is a state measurement, not an energy packet. Heat is energy in transit between two bodies due to a temperature difference. Temperature dictates the direction of heat flow: heat always flows spontaneously from higher temperature to lower temperature.\n\n---\n\n### 🧠 QUICK REVISION\n- Temperature is a measure of the average kinetic energy of the constituent particles.\n- Absolute zero (0 K or -273.15°C) is the theoretical lower limit where particle motion reaches its quantum minimum.\n- Temperature is an intensive property and does not depend on system mass or total volume.\n- Spontaneous heat transfer always proceeds from higher temperature to lower temperature until thermal equilibrium is attained.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: What happens to molecular motion when a substance cools down toward Absolute Zero (0 K)?\n  *Answer*: Particle translational motion slows down and reaches its theoretical minimum zero-point energy.\n- **Question 2**: Why does an iceberg at -2°C contain more total heat energy than a burning candle flame at 800°C?\n  *Answer*: Because thermal energy depends on total mass: the iceberg contains billions of kilograms of matter storing enormous cumulative kinetic energy, while the tiny flame contains only a few milligrams of hot gas.\n- **Question 3**: If two objects are in thermal equilibrium with each other, what physical quantity must be identical?\n  *Answer*: Their temperature.",
  photosynthesis: "### 🌱 START HERE: How Plants Turn Sunlight into Food\nPhotosynthesis is the biological process by which green plants, algae, and cyanobacteria harvest solar photons from the sun and convert them into stable chemical energy stored in glucose sugar bonds.\n\nEvery living animal on Earth depends directly or indirectly on photosynthesis: it produces virtually all the breathable oxygen in our atmosphere and generates the fundamental organic biomass driving global food chains.\n\n---\n\n### 💡 THINK ABOUT IT: The Solar-Powered Kitchen\n💡 THINK ABOUT IT: Imagine an automated kitchen rooftop powered entirely by solar panels. The kitchen pulls carbon dioxide right out of the ambient breeze, pumps pure water up through the soil plumbing, and uses photon light energy to cook packaged sugar energy bars (glucose), releasing clean oxygen into the air as a fresh exhaust breeze.\n\n---\n\n### 🔍 HOW IT WORKS: The Two Stages of Photosynthesis\nSunlight → Chlorophyll Activation → Water Splitting (H₂O) → Calvin Cycle → Glucose (C₆H₁₂O₆) + O₂\n\nPhotosynthesis occurs inside microscopic plant organelles called **Chloroplasts** across two coordinated stages:\n\n1. **Light-Dependent Reactions (in Thylakoid Membranes)**:\n   - Green chlorophyll pigments absorb red and blue wavelengths of sunlight.\n   - Light energy excites electrons in Photosystem II, triggering the photolysis (splitting) of water: 2H₂O → 4H⁺ + 4e⁻ + O₂.\n   - The excited electrons traverse an electron transport chain, generating ATP and NADPH energy carriers.\n   - Molecular oxygen (O₂) is discharged through leaf pores (stomata) into the air.\n\n2. **Light-Independent Reactions / Calvin Cycle (in Chloroplast Stroma)**:\n   - The enzyme **RuBisCO** captures atmospheric CO₂ and fixes it onto RuBP molecules.\n   - Utilizing ATP and NADPH from the light stage, carbon intermediates are energized into Glyceraldehyde-3-phosphate (G3P).\n   - Pairs of G3P combine into glucose (C₆H₁₂O₆), which the plant stores as starch or builds into cellulose stems.\n\n---\n\n### 🧪 THE BALANCED CHEMICAL EQUATION\n```text\n6 CO₂  +  6 H₂O  +  Solar Photons  →  C₆H₁₂O₆ (Glucose)  +  6 O₂ (Oxygen)\n```\n\n---\n\n### 📌 KEY CONCEPT: Water Splitting is the Source of Atmospheric Oxygen\n📌 KEY CONCEPT: All the oxygen gas we breathe originates directly from the photolysis (splitting) of water molecules (H₂O) in Photosystem II, NOT from carbon dioxide!\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Commercial Greenhouse Carbon Enrichment\n🌍 REAL-WORLD CONNECTION: Commercial tomato and pepper greenhouses pump clean carbon dioxide gas into closed glasshouses to raise CO₂ levels from ambient 400 ppm to over 1,200 ppm. Because CO₂ is typically the rate-limiting reactant for RuBisCO, this acceleration produces up to 30% faster harvest yields.\n\n---\n\n### ⚠️ COMMON CONFUSION: Oxygen is an Evolutionary Byproduct\n⚠️ COMMON CONFUSION: Plants do NOT photosynthesize \"to make oxygen for animals.\" The plant's sole biological imperative is making glucose for its own metabolic energy. Oxygen is merely an evolutionary byproduct discharged during water oxidation. Furthermore, plant cells also perform cellular respiration day and night to burn that glucose for maintenance.\n\n---\n\n### 🧠 QUICK REVISION\n- Photosynthesis converts light energy, water, and CO₂ into glucose and oxygen.\n- Light reactions take place in thylakoid membranes, generating ATP, NADPH, and evolving O₂ gas.\n- The Calvin cycle occurs in the aqueous stroma, where RuBisCO fixes CO₂ into carbohydrate sugars.\n- Atmospheric oxygen originates exclusively from water splitting, not carbon dioxide.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: In which specific organelle and fluid matrix does the Calvin cycle take place?\n  *Answer*: Inside the chloroplast's fluid stroma matrix surrounding the thylakoids.\n- **Question 2**: What is the primary role of chlorophyll during the light-dependent stage?\n  *Answer*: To absorb light photons (predominantly red and blue wavelengths) and excite electrons into the electron transport chain.\n- **Question 3**: Why do plants continue to consume oxygen in the dark?\n  *Answer*: Because plant mitochondria perform cellular respiration 24 hours a day to generate ATP from stored starch for cellular survival.",
  newton: "### 🌱 START HERE: The Fundamental Rules of How Objects Move\nNewton's Three Laws of Motion, formulated by Sir Isaac Newton in 1687, form the bedrock of classical mechanics. They describe the precise relationship between the forces acting on a body and the resulting change in that body's motion.\n\nBefore Newton, philosophers like Aristotle believed objects naturally slowed down on their own unless constantly pushed. Newton revolutionized science by showing that an object in motion will naturally keep moving forever at constant velocity unless an external force interferes.\n\n---\n\n### 💡 THINK ABOUT IT: Ice Skating & Pushback\n💡 THINK ABOUT IT: Imagine standing on perfectly smooth, frictionless ice wearing ice skates. If you don't touch anything, you stand perfectly still (Law 1). If a friend gently pushes you, you glide with steady acceleration; if two friends push twice as hard, you accelerate twice as fast (Law 2). If you push your friend forward, you instantly slide backward with equal momentum even though your friend didn't push you (Law 3)!\n\n---\n\n### 🔍 HOW IT WORKS: The Three Laws Deconstructed\nApplied External Force → Opposed by Inertia (Mass) → Resulting Acceleration (a = F / m)\n\n1. **Newton's First Law (Law of Inertia)**:\n   - An object at rest remains at rest, and an object in uniform rectilinear motion continues with constant velocity, unless acted upon by a non-zero net external force.\n   - Mass is the quantitative measure of inertia: a 1000 kg car resists changes in velocity far more than a 5 kg bicycle.\n\n2. **Newton's Second Law (Fundamental Force Equation)**:\n   - The acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass:\n   ```text\n   F_net = m · a    (Force = Mass × Acceleration)\n   ```\n   - 1 Newton (N) is defined as the force required to accelerate a 1 kg mass at 1 m/s².\n\n3. **Newton's Third Law (Action & Reaction)**:\n   - Whenever object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A:\n   ```text\n   F_A_on_B = - F_B_on_A\n   ```\n\n---\n\n### 📌 KEY CONCEPT: Action and Reaction Act on DIFFERENT Bodies\n📌 KEY CONCEPT: Action and reaction forces NEVER cancel each other out to cause zero acceleration because they always act on **two different interacting objects**, never on the same body!\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Space Rocket Propulsion in Deep Space\n🌍 REAL-WORLD CONNECTION: People often wonder how rockets accelerate in deep space where there is no air to push against. By Newton's Third Law, the rocket engine exerts an enormous downward/backward force on expelled exhaust gases; in turn, the hot exhaust gas exerts an equal and opposite forward thrust force on the rocket hull, accelerating it forward through the vacuum.\n\n---\n\n### ⚠️ COMMON CONFUSION: Mass vs Weight\n⚠️ COMMON CONFUSION: Mass is an intrinsic scalar quantity measured in kilograms (kg) that quantifies resistance to acceleration (inertia). Weight is the downward gravitational force exerted on that mass by a planet (Weight = m · g, measured in Newtons). On the Moon, your mass remains identical, but your weight is one-sixth of that on Earth!\n\n---\n\n### 🧠 QUICK REVISION\n- 1st Law: Zero net force means constant velocity (velocity magnitude and direction remain unchanged).\n- 2nd Law: Acceleration equals net force divided by mass (a = F / m).\n- 3rd Law: Forces always occur in matched pairs equal in magnitude and opposing in direction on distinct bodies.\n- Friction and gravity are external forces that cause everyday objects on Earth to appear to slow down naturally.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: If an unbelted passenger lurches forward when a car brakes suddenly, what force pulled them forward?\n  *Answer*: No forward force acted on them! By Newton's First Law (Inertia), their body was simply continuing in its forward state of motion while the car decelerated beneath them.\n- **Question 2**: A 4 kg crate is pushed with 12 N of net force. What is its acceleration?\n  *Answer*: a = F / m = 12 N / 4 kg = 3 m/s².\n- **Question 3**: If Earth exerts a gravitational pull of 600 N downward on a person, what force does the person exert on Earth?\n  *Answer*: Exactly 600 N upward on Earth (Newton's Third Law).",
  pointer: "### 🌱 START HERE: What is a Pointer in C?\nIn the C programming language, a **Pointer** is a variable that stores the physical memory address (RAM location) of another variable, rather than holding a direct data value.\n\nWhen you declare `int score = 42;`, the operating system allocates 4 bytes of RAM on the stack and writes the number 42 inside. That memory cell has a numeric hexadecimal address, such as `0x7ffd50`. A pointer variable is simply a container specifically designed to hold that address number `0x7ffd50`.\n\n---\n\n### 💡 THINK ABOUT IT: House Addresses vs Furniture Inside\n💡 THINK ABOUT IT: Imagine your home. Your living room contains furniture (the data value `42`). Your home also has a street address on the mailbox, like `742 Evergreen Terrace` (the memory address). A pointer is like a sticky note on which you write down `742 Evergreen Terrace`. You haven't moved the house or duplicated the furniture; you just have the address that lets anyone walk directly to that front door!\n\n---\n\n### 🔍 HOW IT WORKS: RAM Cells, & and * Operators\nVariable declared in RAM → Memory Address extracted (&) → Stored in Pointer (int *p) → Dereferenced (*) to mutate\n\nWorking with pointers in C requires mastering two complementary operators:\n\n1. **The Address-of Operator (`&`)**:\n   - Asking `&score` tells the CPU: *\"Give me the memory address where score lives in RAM.\"*\n2. **The Dereference Operator (`*`)**:\n   - Writing `*ptr` tells the CPU: *\"Go to the address written inside ptr, open that memory cell, and read or overwrite whatever is stored there.\"*\n\n```c\nint score = 42;         // Allocates RAM, stores 42\nint *ptr = &score;      // ptr now holds the RAM address of score\n*ptr = 99;              // Dereferencing: overwrites score to 99 in place!\n```\n\n---\n\n### 📌 KEY CONCEPT: Pass-by-Reference Modifies Caller Variables\n📌 KEY CONCEPT: In C, all function parameters are passed by value (copied). Pointers enable **Pass-by-Reference**: by passing the memory address `&x` instead of copying `x`, a helper function can directly mutate the caller's variables across stack frames.\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Kernel Drivers & High-Speed Buffers\n🌍 REAL-WORLD CONNECTION: High-performance systems like Linux kernel network drivers, database engines, and 3D graphics pipelines process gigabytes of video and network packets every second. Copying those megabytes between functions would grind the CPU to a halt. By passing pointers (memory addresses), components transfer gigabytes of data with zero copying latency.\n\n---\n\n### ⚠️ COMMON CONFUSION: Pointer Declaration vs Dereferencing\n⚠️ COMMON CONFUSION: The asterisk symbol `*` serves two completely different purposes in C:\n- In a declaration (`int *ptr;`), the `*` indicates that `ptr` is a pointer type.\n- In an expression (`*ptr = 100;`), the `*` is an operator meaning \"dereference\" (go to that address and access the value).\n\n---\n\n### 🧠 QUICK REVISION\n- Pointers store RAM memory addresses, typically represented in hexadecimal.\n- The address-of operator `&` retrieves the address of an existing variable.\n- The dereference operator `*` accesses or mutates the data stored at the pointer's address.\n- Always initialize pointers to `NULL` or a valid address to avoid undefined behavior or segmentation faults.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: If `int a = 10; int *p = &a;`, what does printing `*p` display?\n  *Answer*: 10 (it dereferences `p` to read the value of `a`).\n- **Question 2**: What fatal error occurs if you attempt to dereference a pointer containing an uninitialized garbage address or NULL?\n  *Answer*: A Segmentation Fault (SIGSEGV) crash caused by accessing protected memory.\n- **Question 3**: How many bytes of RAM does a pointer variable itself typically occupy on a 64-bit operating system?\n  *Answer*: Exactly 8 bytes (64 bits), regardless of whether it points to a char, int, or huge struct.",
  differentiation: "### 🌱 START HERE: Understanding Instantaneous Rate of Change\nDifferentiation is the fundamental mathematical tool used to measure how rapidly a quantity is changing at one exact, instantaneous moment in time or position.\n\nIn algebra, you learned how to calculate the slope between two points on a straight line: slope = Δy / Δx. But in the real world, trajectories curve, velocities accelerate, and profits fluctuate. Differentiation allows us to find the exact slope and rate of change of any curved function at any single point.\n\n---\n\n### 💡 THINK ABOUT IT: The Car Speedometer Snapshot\n💡 THINK ABOUT IT: Imagine driving from New York to Philadelphia—a 100-mile trip taking exactly 2 hours. Your average speed is 50 mph (algebra). But at 2:15 PM, you slammed on the gas to pass a truck and glanced at your speedometer reading 74 mph. That speedometer shows your **instantaneous velocity**—the derivative of your position function at that single fraction of a second!\n\n---\n\n### 🔍 HOW IT WORKS: From Secant Line to Tangent Slope\nFunction Curve f(x) → Secant Line between (x, x+Δx) → Limit as Δx → 0 → Tangent Slope (dy/dx)\n\n1. Pick two points on a curve: (x, f(x)) and (x + Δx, f(x + Δx)).\n2. The slope of the line connecting them (the secant line) is:\n   ```text\n   Average Rate of Change = [ f(x + Δx) - f(x) ] / Δx\n   ```\n3. Now shrink the horizontal distance Δx toward zero using limits:\n   ```text\n   f'(x) = dy/dx = lim(Δx → 0) [ f(x + Δx) - f(x) ] / Δx\n   ```\n4. As Δx approaches zero, the secant line transforms into a **Tangent Line** touching the curve at exactly one coordinate point (x, f(x)). The slope of that tangent line is the **Derivative**.\n\n---\n\n### 📌 KEY CONCEPT: The Derivative is the Slope of the Tangent Line\n📌 KEY CONCEPT: The derivative f'(a) represents the exact geometric slope of the tangent line touching the graph y = f(x) at x = a. If f'(a) > 0, the function is rising; if f'(a) < 0, the function is falling; if f'(a) = 0, the function is momentarily flat (a peak, trough, or inflection point).\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Profit Maximization in Economics\n🌍 REAL-WORLD CONNECTION: In business economics, companies analyze the profit function P(x). The derivative P'(x), called **Marginal Profit**, reveals how much additional profit will be generated by manufacturing one more unit. Setting the derivative equal to zero (P'(x) = 0) pinpoints the exact production volume that yields maximum possible profit.\n\n---\n\n### ⚠️ COMMON CONFUSION: Derivative vs Function Value\n⚠️ COMMON CONFUSION: Do not confuse the value of a function f(x) with the value of its derivative f'(x). A stock price can be high (f(x) = $500), but rapidly falling (f'(x) = -$50/day). The function value tells you *where you are*; the derivative tells you *how fast and in which direction you are moving*.\n\n---\n\n### 🧠 QUICK REVISION\n- Differentiation calculates the instantaneous rate of change of a function.\n- Geometrically, the derivative is the slope of the tangent line to the curve at that point.\n- Power Rule: The derivative of x^n with respect to x is n · x^(n-1).\n- Setting the first derivative to zero (f'(x) = 0) identifies critical points (local maxima and minima).\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: Using the power rule, what is the derivative of f(x) = 3x² + 5x - 7?\n  *Answer*: f'(x) = 6x + 5.\n- **Question 2**: What does it mean geometrically if f'(3) = 0 for a continuous function?\n  *Answer*: The tangent line is completely horizontal at x = 3, indicating a potential local maximum, minimum, or stationary inflection point.\n- **Question 3**: If position s(t) represents distance traveled over time, what physical quantity does the first derivative s'(t) represent?\n  *Answer*: Velocity (instantaneous speed with direction).",
  calculus: "### 🌱 START HERE: Understanding Instantaneous Rate of Change\nDifferentiation is the fundamental mathematical tool used to measure how rapidly a quantity is changing at one exact, instantaneous moment in time or position.\n\nIn algebra, you learned how to calculate the slope between two points on a straight line: slope = Δy / Δx. But in the real world, trajectories curve, velocities accelerate, and profits fluctuate. Differentiation allows us to find the exact slope and rate of change of any curved function at any single point.\n\n---\n\n### 💡 THINK ABOUT IT: The Car Speedometer Snapshot\n💡 THINK ABOUT IT: Imagine driving from New York to Philadelphia—a 100-mile trip taking exactly 2 hours. Your average speed is 50 mph (algebra). But at 2:15 PM, you slammed on the gas to pass a truck and glanced at your speedometer reading 74 mph. That speedometer shows your **instantaneous velocity**—the derivative of your position function at that single fraction of a second!\n\n---\n\n### 🔍 HOW IT WORKS: From Secant Line to Tangent Slope\nFunction Curve f(x) → Secant Line between (x, x+Δx) → Limit as Δx → 0 → Tangent Slope (dy/dx)\n\n1. Pick two points on a curve: (x, f(x)) and (x + Δx, f(x + Δx)).\n2. The slope of the line connecting them (the secant line) is:\n   ```text\n   Average Rate of Change = [ f(x + Δx) - f(x) ] / Δx\n   ```\n3. Now shrink the horizontal distance Δx toward zero using limits:\n   ```text\n   f'(x) = dy/dx = lim(Δx → 0) [ f(x + Δx) - f(x) ] / Δx\n   ```\n4. As Δx approaches zero, the secant line transforms into a **Tangent Line** touching the curve at exactly one coordinate point (x, f(x)). The slope of that tangent line is the **Derivative**.\n\n---\n\n### 📌 KEY CONCEPT: The Derivative is the Slope of the Tangent Line\n📌 KEY CONCEPT: The derivative f'(a) represents the exact geometric slope of the tangent line touching the graph y = f(x) at x = a. If f'(a) > 0, the function is rising; if f'(a) < 0, the function is falling; if f'(a) = 0, the function is momentarily flat (a peak, trough, or inflection point).\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Profit Maximization in Economics\n🌍 REAL-WORLD CONNECTION: In business economics, companies analyze the profit function P(x). The derivative P'(x), called **Marginal Profit**, reveals how much additional profit will be generated by manufacturing one more unit. Setting the derivative equal to zero (P'(x) = 0) pinpoints the exact production volume that yields maximum possible profit.\n\n---\n\n### ⚠️ COMMON CONFUSION: Derivative vs Function Value\n⚠️ COMMON CONFUSION: Do not confuse the value of a function f(x) with the value of its derivative f'(x). A stock price can be high (f(x) = $500), but rapidly falling (f'(x) = -$50/day). The function value tells you *where you are*; the derivative tells you *how fast and in which direction you are moving*.\n\n---\n\n### 🧠 QUICK REVISION\n- Differentiation calculates the instantaneous rate of change of a function.\n- Geometrically, the derivative is the slope of the tangent line to the curve at that point.\n- Power Rule: The derivative of x^n with respect to x is n · x^(n-1).\n- Setting the first derivative to zero (f'(x) = 0) identifies critical points (local maxima and minima).\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: Using the power rule, what is the derivative of f(x) = 3x² + 5x - 7?\n  *Answer*: f'(x) = 6x + 5.\n- **Question 2**: What does it mean geometrically if f'(3) = 0 for a continuous function?\n  *Answer*: The tangent line is completely horizontal at x = 3, indicating a potential local maximum, minimum, or stationary inflection point.\n- **Question 3**: If position s(t) represents distance traveled over time, what physical quantity does the first derivative s'(t) represent?\n  *Answer*: Velocity (instantaneous speed with direction).",
  join: "### 🌱 START HERE: Why Do Relational Databases Need Joins?\nIn relational database design, data is deliberately split across multiple normalized tables to eliminate duplicate information and prevent update anomalies. For example, customer details live in a `customers` table, while purchases live in an `orders` table.\n\nA **SQL JOIN** is an operation that recombines rows from two or more tables based on a related column between them (typically a Primary Key / Foreign Key relationship), allowing you to query complete, unified records in a single statement.\n\n---\n\n### 💡 THINK ABOUT IT: Matching Puzzle Pieces\n💡 THINK ABOUT IT: Imagine having two separate piles of cards: one pile has student profiles with Student_ID and Name, and the second pile has exam grades with Student_ID and Grade. A SQL JOIN is like picking up an exam card, looking at its Student_ID, finding the student profile with that exact matching ID, and taping them together into a complete student report card!\n\n---\n\n### 🔍 HOW IT WORKS: The Four Core Types of SQL Joins\nTable A (Left) + Table B (Right) → Match Condition (ON a.key = b.key) → Filtered Output Rows\n\n1. **INNER JOIN**:\n   - Returns ONLY the rows where there is a matching value in BOTH tables.\n   - If a customer has placed zero orders, they are excluded from the result.\n2. **LEFT JOIN (or LEFT OUTER JOIN)**:\n   - Returns ALL rows from the left table, plus matching rows from the right table.\n   - If a customer has no orders, their row still appears, with `NULL` in the order columns.\n3. **RIGHT JOIN**:\n   - Returns ALL rows from the right table, plus matched rows from the left table.\n4. **FULL OUTER JOIN**:\n   - Returns all rows when there is a match in either the left or the right table, populating `NULL` wherever a counterpart is absent.\n\n```sql\nSELECT customers.name, orders.order_total, orders.order_date\nFROM customers\nINNER JOIN orders ON customers.id = orders.customer_id;\n```\n\n---\n\n### 📌 KEY CONCEPT: The ON Clause Governs Row Pairing\n📌 KEY CONCEPT: The `ON` clause dictates the logical condition required to bind rows together. If you omit the `ON` clause or specify an unconditional predicate, the database will execute a **Cross Join (Cartesian Product)**, multiplying every row in Table A by every row in Table B!\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: E-Commerce Customer Invoices\n🌍 REAL-WORLD CONNECTION: Every time you review an Amazon or Shopify order receipt, a multi-table SQL join runs behind the scenes: joining `users` (shipping address) to `orders` (payment info) to `order_items` (line items) to `inventory_products` (product titles and images).\n\n---\n\n### ⚠️ COMMON CONFUSION: WHERE vs ON in Outer Joins\n⚠️ COMMON CONFUSION: In a `LEFT JOIN`, placing a filter in the `WHERE` clause instead of the `ON` clause can accidentally convert your outer join into an inner join! For example, writing `WHERE orders.status = 'shipped'` will discard rows where `orders` is NULL, eliminating the very customers you intended to preserve.\n\n---\n\n### 🧠 QUICK REVISION\n- SQL JOINs combine rows from two or more tables based on common relational keys.\n- INNER JOIN yields only matching rows; LEFT JOIN guarantees all rows from the primary left table are preserved.\n- Unmatched outer join columns are filled with SQL `NULL` markers.\n- Always ensure foreign key columns have indexes to maintain high-performance join throughput.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: Which JOIN type should you use to retrieve a list of all enrolled students, including those who have not yet taken any exams?\n  *Answer*: LEFT JOIN (with students as the left table).\n- **Question 2**: What happens if Table A has 10 rows, Table B has 20 rows, and you execute a CROSS JOIN without an ON condition?\n  *Answer*: The query returns 200 rows (10 × 20 Cartesian product).\n- **Question 3**: What values appear in the right table's columns when a LEFT JOIN finds no matching record?\n  *Answer*: NULL.",
  function: "### 🌱 START HERE: Modular Building Blocks of Python\nIn Python, a **Function** is a named, reusable block of structured code designed to execute a specific computational task. Functions prevent code duplication, promote modularity, and make complex software architectures manageable.\n\nYou define a function using the `def` keyword, supply optional parameters in parentheses, and return calculated outputs using the `return` statement.\n\n---\n\n### 💡 THINK ABOUT IT: The Automated Kitchen Blender\n💡 THINK ABOUT IT: Think of a Python function like a kitchen smoothie blender. You give it ingredients through the lid (arguments), press the blend button to run internal blades (function logic), and pour out a nutritious fruit smoothie from the spout (the return value). Once you build the blender, you can reuse it hundreds of times with any combination of fruits!\n\n---\n\n### 🔍 HOW IT WORKS: Parameters, Execution Frames & Return Values\nPass Arguments → Create Local Stack Frame → Execute Logic → Dispatch Return Value to Caller\n\n1. **Definition & Signature**:\n   ```python\n   def calculate_discount(price, rate=0.10):\n       savings = price * rate\n       final_price = price - savings\n       return final_price\n   ```\n2. **Local Scope**: Variables declared inside the function body (`savings`, `final_price`) live exclusively within that function's local execution frame. When the function finishes, this stack frame is destroyed, protecting global variables from accidental mutation.\n3. **First-Class Citizens**: In Python, functions are first-class objects: you can assign them to variables, pass them as arguments to other functions, and return them dynamically (closures and decorators).\n\n---\n\n### 📌 KEY CONCEPT: Functions Without Return Yield None\n📌 KEY CONCEPT: In Python, if a function reaches the end of its execution block without encountering an explicit `return` statement, it automatically and silently returns the special object `None`.\n\n---\n\n### 🌍 REAL-WORLD CONNECTION: Data Cleaning Pipelines\n🌍 REAL-WORLD CONNECTION: In professional data science, functions are chained into automated ETL pipelines: `raw_records.map(clean_text).filter(is_valid).map(calculate_sentiment)`. Encapsulating each transformation inside a pure function guarantees that data processing remains deterministic and easily testable.\n\n---\n\n### ⚠️ COMMON CONFUSION: The Mutable Default Argument Trap\n⚠️ COMMON CONFUSION: Never use a mutable object (like a list `[]` or dictionary `{}`) as a default parameter value, e.g. `def add_item(item, basket=[])`. Python evaluates default arguments once at function definition time, so every subsequent call will share and mutate the exact same list in memory! Instead, default to `None` and initialize inside the body.\n\n---\n\n### 🧠 QUICK REVISION\n- Functions are defined with `def` and pass data back using `return`.\n- Default parameter values allow arguments to be optional.\n- Local variables exist only during function execution and do not leak into the global scope.\n- Use keyword arguments (`**kwargs`) and variable positional arguments (`*args`) for flexible signatures.\n\n---\n\n### ✏️ QUICK CHECK\n- **Question 1**: What is the output of calling a function that performs a print statement but has no return keyword?\n  *Answer*: The printed text appears on the console, but the expression itself evaluates to `None`.\n- **Question 2**: What is the safest way to provide an empty list as a default argument in Python?\n  *Answer*: Use `arg=None` in the signature, and write `if arg is None: arg = []` inside the function body.\n- **Question 3**: What Python built-in function returns a function's documentation string?\n  *Answer*: `help(func)` or inspecting `func.__doc__`."
};

function generateTeacherStyleExplanation(topic: string, subject: string, isProgramming: boolean) {
  const tLower = topic.toLowerCase();
  for (const key of Object.keys(TOPIC_EXPLANATIONS)) {
    if (tLower.includes(key)) {
      return TOPIC_EXPLANATIONS[key];
    }
  }

  // Fallback intelligent topic generator for ANY other topic
  return [
    `### 🌱 START HERE: Understanding ${topic}`,
    `${topic} is an essential concept in ${subject}. Rather than memorizing abstract definitions, let us understand how it functions from first principles.`,
    '',
    `At its core, ${topic} describes how elements interact, transform, and reach stability within ${subject}. By mastering the underlying rules governing ${topic}, you gain the analytical foundation required to evaluate complex scenarios and solve real-world problems.`,
    '',
    '---',
    '',
    `### 💡 THINK ABOUT IT: An Everyday Analogy`,
    `💡 THINK ABOUT IT: Imagine a balanced orchestra. Every instrument section must synchronize its timing and volume according to shared musical notation. Similarly, ${topic} operates through synchronized components that respond dynamically to inputs, producing a coherent, predictable outcome.`,
    '',
    '---',
    '',
    `### 🔍 HOW IT WORKS: Step-by-Step Mechanism`,
    `Initial Condition / Inputs → Operational Rules of ${topic} → Verified Equilibrium Output`,
    '',
    '1. **Preconditions & Inputs**: The system begins in a defined initial state with specific variables and environmental constraints.',
    `2. **Transformation Process**: The foundational laws of ${topic} govern how components interact, transfer energy or data, and mutate state.`,
    '3. **Invariance & Stability**: Throughout the transition, core conservation laws or structural invariants remain strictly preserved.',
    '4. **Resolution**: The mechanism concludes with a measurable output or balanced equilibrium state.',
    '',
    '---',
    '',
    `### 📌 KEY CONCEPT: The Core Principle of ${topic}`,
    `📌 KEY CONCEPT: Always identify the governing invariants and boundary conditions before analyzing transformations in ${topic}. Clear understanding of constraints prevents faulty assumptions.`,
    '',
    '---',
    '',
    `### 🌍 REAL-WORLD CONNECTION: How ${topic} Affects Everyday Systems`,
    `🌍 REAL-WORLD CONNECTION: Across modern industry and academic research, ${topic} serves as a predictive model used to diagnose bottlenecks, design robust workflows, and optimize resource efficiency in real operating conditions.`,
    '',
    '---',
    '',
    `### ⚠️ COMMON CONFUSION: Misconceptions to Avoid`,
    `⚠️ COMMON CONFUSION: Students often confuse the static definition of ${topic} with its dynamic behavioral properties under stress or edge-case conditions. Always test boundary conditions (zero values, saturation limits) to understand full system behavior.`,
    '',
    '---',
    '',
    `### 🧠 QUICK REVISION`,
    `- ${topic} operates through deterministic principles that govern state transitions in ${subject}.`,
    '- Invariants must remain balanced throughout all operational stages.',
    '- Analyzing input preconditions prevents false assumptions during evaluation.',
    `- Real-world applications rely on ${topic} for structural stability and predictive modeling.`,
    '',
    '---',
    '',
    `### ✏️ QUICK CHECK`,
    `- **Question 1**: What is the primary operational mechanism that initiates activity in ${topic}?`,
    '  *Answer*: The introduction of initial inputs or state changes that disrupt equilibrium.',
    `- **Question 2**: Why are boundary edge cases critical when analyzing ${topic}?`,
    '  *Answer*: Because systems frequently display non-linear degradation or failure modes near operational limits.',
    `- **Question 3**: Name one practical advantage gained by mastering ${topic} in ${subject}.`,
    '  *Answer*: The ability to predict system outcomes accurately and diagnose faults systematically.'
  ].join('\n');
}

function generateUnifiedMasterSummary(topic: string, subject: string, isProgramming: boolean) {
  return [
    `# TOPIC SUMMARY: ${topic}`,
    '',
    '## 1. Core Idea',
    `${topic} is an indispensable concept in ${subject}. At its heart, it provides the deterministic mechanism explaining how elements interact, transform energy or state, and maintain equilibrium. Master ${topic} by understanding why it exists rather than memorizing isolated formulas.`,
    '',
    '---',
    '',
    '## 2. Important Concepts',
    `- **Governing Law / Principle**: The foundational rule defining state transitions in ${topic}.`,
    '- **Conservation & Invariants**: Essential properties that remain constant before, during, and after processing.',
    '- **Equilibrium & Response**: How the system returns to balance when external conditions change.',
    '',
    '---',
    '',
    '## 3. Key Formula / Process',
    '```text',
    `Input Preconditions  →  Transformation Rule (${topic})  →  Balanced Output`,
    '```',
    '- Always verify that units, types, and boundary conditions are satisfied before applying transformations.',
    '',
    '---',
    '',
    '## 4. Visual Recap',
    `*(Refer to the dedicated Visual Guide canvas above to examine the interactive structural diagram, flowchart arrows, and state models for ${topic}.)*`,
    '',
    '---',
    '',
    '## 5. Important Examples',
    isProgramming
      ? '- **Minimal Implementation**: Foundational syntax establishing correct state and deterministic cleanup.\n- **Edge-Case Handling**: Defending against null values, boundary overflows, and unhandled exceptions.'
      : `- **Natural Scenario**: Environmental interactions where ${topic} balances physical or biological dynamics.\n- **Industrial Application**: Engineered systems designed to harness ${topic} safely and efficiently.`,
    '',
    '---',
    '',
    '## 6. Exam & Revision Points',
    '- **Formal Definition**: Be prepared to write the exact formal definition or equation without omitting boundary conditions.',
    '- **Cause & Effect**: Explain step-by-step why an input change produces a specific output response.',
    `- **Distinctions**: Clearly differentiate ${topic} from neighboring concepts (e.g. Temperature vs Heat, Inertia vs Mass).`,
    '',
    '---',
    '',
    '## 7. One-Minute Recap',
    `${topic} governs how systems transition between states in ${subject}. Remember the core mechanism, respect boundary limits, and verify invariants.`
  ].join('\n');
}

/**
 * Synthesize all 5 format resources for ANY arbitrary topic on demand
 */
export function generateEducationalResourcesForTopic(intent: QueryUnderstanding): EducationalResource[] {
  const { topic, subject, is_programming, language, level, difficulty } = intent;
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Check in-memory cache first to avoid re-generating
  if (DYNAMIC_RESOURCES_CACHE.has(topic.toLowerCase())) {
    return DYNAMIC_RESOURCES_CACHE.get(topic.toLowerCase())!;
  }

  const twentyQuestions = generateTwentyPracticeQuestions(topic, subject, is_programming);
  const realWorldScenarios = generateRealWorldScenarios(topic, subject);
  const codeExamples = is_programming ? generateProgrammingExamples(topic, language) : undefined;

  // 1. EXPLANATION RESOURCE
  const explanationResource: EducationalResource = {
    id: `${slug}-explanation`,
    title: `Understanding ${topic}: Step-by-Step Teacher Guide`,
    topic,
    category: subject,
    is_programming,
    difficulty,
    format: 'Explanation',
    read_time: '14 min',
    short_description: `A friendly, teacher-style step-by-step learning guide for ${topic} with intuitive analogies, process flowcharts, real-world connections, and quick self-testing questions.`,
    full_content: generateTeacherStyleExplanation(topic, subject, is_programming),
    key_takeaways: [
      `Foundational principles of ${topic} govern state transitions in ${subject}.`,
      `Always check boundary edge cases and operational invariants.`,
      `Clear mental models enable rapid diagnosis of real-world problems.`
    ],
    common_pitfalls: [
      `Confusing definition with active execution.`,
      `Failing to account for zero or boundary input values.`,
      `Ignoring rate-limiting constraints or resource deallocation.`
    ],
    tags: [slug, 'explanation', 'theory', subject.toLowerCase(), 'pedagogical', '12-sections'],
    prerequisites: [`Introductory ${subject}`, 'Basic Problem Solving']
  };

  // 2. EXAMPLES RESOURCE
  const examplesResource: EducationalResource = {
    id: `${slug}-examples`,
    title: is_programming 
      ? `Mastering ${topic}: 3 Runnable Code Implementations with Line-by-Line Explanations`
      : `Real-World ${topic} in Action: 3 Practical Scenarios, Analogies & Case Studies`,
    topic,
    category: subject,
    is_programming,
    difficulty: level === 'Beginner' ? 'Easy' : 'Medium',
    format: 'Examples',
    read_time: '12 min',
    short_description: is_programming
      ? `Three complete, runnable code examples for ${topic} with expected outputs and detailed line-by-line explanations directly beneath every code block.`
      : `Three rich, real-world case studies, natural scenarios, and intuitive analogies illustrating how ${topic} operates in practice.`,
    full_content: is_programming
      ? `### Practical Code Implementations for ${topic}\n\nBelow are three complete, production-grade code examples illustrating foundational, practical, and defensive design patterns for **${topic}**. Each example features a dedicated **Line-by-Line Explanation** directly below the code block.`
      : `### Real-World Scenarios and Practical Applications\n\nBelow are three real-world case studies demonstrating **${topic}** in practical, everyday, and natural contexts. Each scenario provides clear mechanistic explanations and accessible analogies.`,
    code_snippets: codeExamples,
    real_world_examples: !is_programming ? realWorldScenarios : undefined,
    key_takeaways: is_programming
      ? [
          'Line-by-line verification prevents subtle logic and scoping bugs.',
          'Always pair dynamic resource allocations with deterministic cleanup.',
          'Defensive error checks at function boundaries safeguard program stability.'
        ]
      : [
          'Real-world physical and biological systems mirror theoretical mathematical laws.',
          'Rate-limiting factors dictate system throughput across industrial and ecological domains.',
          'Analogies bridge abstract academic principles to everyday intuition.'
        ],
    tags: [slug, 'examples', is_programming ? 'code' : 'real-world', 'practical', 'line-by-line'],
    prerequisites: [explanationResource.title]
  };

  // 3. VISUAL GUIDES RESOURCE
  const visualResource: EducationalResource = {
    id: `${slug}-visual-guides`,
    title: `Visual Architecture of ${topic}: Conceptual Diagrams & Structural Models`,
    topic,
    category: subject,
    is_programming,
    difficulty: 'Easy',
    format: 'Visual Guides',
    read_time: '8 min',
    short_description: `An illustrated visual guide featuring high-resolution architectural SVG diagrams, state transition models, and conceptual process flowcharts for ${topic}.`,
    full_content: `### Visual Architecture of ${topic}\n\nVisualizing ${topic} clarifies the relationship between inputs, processing nodes, and output states.\n\nExamine the rendered diagram above: notice the directional flow from initial parameters through transformation nodes to balanced terminal outputs.`,
    key_takeaways: [
      `Visual diagrams provide an immediate intuitive mental model of ${topic}.`,
      `Tracing arrows reveals dependencies and critical bottlenecks in the workflow.`
    ],
    tags: [slug, 'visual-guides', 'diagram', 'flowchart', 'svg', 'concept-map'],
    prerequisites: [`Basic understanding of ${topic}`]
  };

  // 4. PRACTICE RESOURCE (20 QUESTIONS)
  const practiceResource: EducationalResource = {
    id: `${slug}-practice`,
    title: `${topic} Practice Challenge: 20 Standard Diagnostic Questions`,
    topic,
    category: subject,
    is_programming,
    difficulty: 'Medium',
    format: 'Practice',
    read_time: '15 min',
    short_description: `Comprehensive 20-question practice set covering MCQ, Conceptual, Application, Problem Solving, and Scenario-based challenges for ${topic} with revealable solutions.`,
    full_content: `### 20-Question Practice Challenge for ${topic}\n\nTest and solidify your understanding across 20 varied questions designed to assess foundational knowledge, practical application, and edge-case handling.`,
    practice_exercises: twentyQuestions.map((q, idx) => ({
      id: `prac-${slug}-${idx + 1}`,
      type: q.type,
      question: q.q,
      options: q.opts,
      correct_answer: q.ans,
      solution: q.sol,
      hint: q.hint,
      difficulty: q.diff
    })),
    key_takeaways: [
      'Active recall through diagnostic questioning produces significantly stronger retention.',
      'Analyzing why incorrect options are wrong builds critical analytical rigor.'
    ],
    tags: [slug, 'practice', 'quiz', '20-questions', 'mcq', 'problem-solving'],
    prerequisites: [`Introductory review of ${topic}`]
  };

  // 5. SUMMARY RESOURCE (UNIFIED MASTER SUMMARY)
  const summaryResource: EducationalResource = {
    id: `${slug}-summary`,
    title: `Unified Master Summary: ${topic} Theory, Models & Revision Checklist`,
    topic,
    category: subject,
    is_programming,
    difficulty: 'Easy',
    format: 'Summary',
    read_time: '10 min',
    short_description: `A single, all-in-one Master Summary teaching ${topic} completely: theory, relational diagrams, examples, common pitfalls, exam formulas, and revision checklist.`,
    full_content: generateUnifiedMasterSummary(topic, subject, is_programming),
    code_snippets: is_programming ? codeExamples?.slice(0, 1) : undefined,
    real_world_examples: !is_programming ? realWorldScenarios.slice(0, 1) : undefined,
    practice_exercises: twentyQuestions.slice(0, 3).map((q, idx) => ({
      id: `sum-prac-${slug}-${idx + 1}`,
      type: q.type,
      question: q.q,
      options: q.opts,
      correct_answer: q.ans,
      solution: q.sol,
      hint: q.hint,
      difficulty: q.diff
    })),
    key_takeaways: [
      `${topic} unites theoretical principles and practical system behavior.`,
      `Use the revision checklist before taking assessments or exams.`
    ],
    tags: [slug, 'summary', 'master-summary', 'cheat-sheet', 'revision', 'unified'],
    prerequisites: [`None — self-contained comprehensive overview`]
  };

  const resources = [explanationResource, examplesResource, visualResource, practiceResource, summaryResource];

  // Compute dense embeddings for all generated resources
  resources.forEach(res => {
    const textToEmbed = `${res.title} ${res.topic} ${res.category} ${res.format} ${res.difficulty} ${res.short_description} ${res.tags.join(' ')}`;
    res.embedding = computeEmbedding(textToEmbed);
  });

  // Store in cache
  DYNAMIC_RESOURCES_CACHE.set(topic.toLowerCase(), resources);

  return resources;
}
