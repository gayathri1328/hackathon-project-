import React from 'react';

interface DiagramProps {
  className?: string;
  topic?: string;
  subject?: string;
}

/**
 * 1. High-Resolution SVG Diagram for Physical RAM Memory, Pointers, and Addresses
 */
export const MemoryAddressDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-burgundy-tint font-bold">
            Hardware Memory Architecture
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            RAM Stack Layout: How Pointers Reference Physical Addresses
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/40 text-burgundy-tint border border-burgundy/60">
          64-Bit Memory Model
        </span>
      </div>

      <svg viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-72">
        <rect x="20" y="20" width="660" height="260" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        <text x="50" y="50" fill="#E8CCD6" fontSize="11" fontFamily="monospace" fontWeight="bold">
          PHYSICAL RAM ADDRESS
        </text>
        <text x="310" y="50" fill="#E8CCD6" fontSize="11" fontFamily="monospace" fontWeight="bold">
          STORED VALUE / BITS
        </text>
        <text x="530" y="50" fill="#E8CCD6" fontSize="11" fontFamily="monospace" fontWeight="bold">
          VARIABLE ALIAS
        </text>

        {/* Slot 1: Variable score */}
        <rect x="40" y="70" width="220" height="50" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="60" y="100" fill="#FFFCFA" fontSize="14" fontFamily="monospace" fontWeight="bold">
          0x7ffeefbff568
        </text>

        <rect x="280" y="70" width="210" height="50" rx="8" fill="#481329" stroke="#E8CCD6" strokeWidth="2" />
        <text x="375" y="102" fill="#FFF8F3" fontSize="18" fontFamily="sans-serif" fontWeight="bold">
          42
        </text>

        <rect x="510" y="70" width="150" height="50" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="540" y="100" fill="#8B3A55" fontSize="13" fontFamily="monospace" fontWeight="bold">
          int score
        </text>

        {/* Slot 2: Pointer ptr */}
        <rect x="40" y="160" width="220" height="50" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="60" y="190" fill="#FFFCFA" fontSize="14" fontFamily="monospace" fontWeight="bold">
          0x7ffeefbff560
        </text>

        <rect x="280" y="160" width="210" height="50" rx="8" fill="#6D1F3A" stroke="#E8CCD6" strokeWidth="2" />
        <text x="298" y="190" fill="#FFF8F3" fontSize="14" fontFamily="monospace" fontWeight="bold">
          0x7ffeefbff568
        </text>

        <rect x="510" y="160" width="150" height="50" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="540" y="190" fill="#8B3A55" fontSize="13" fontFamily="monospace" fontWeight="bold">
          int *ptr
        </text>

        {/* Reference Arrow */}
        <path d="M 385 160 C 385 140 385 130 385 125" stroke="#FFD700" strokeWidth="3" strokeDasharray="5 5" />
        <polygon points="380,125 385,115 390,125" fill="#FFD700" />
        <text x="400" y="142" fill="#FFD700" fontSize="11" fontFamily="monospace" fontWeight="bold">
          *ptr (Dereference)
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. High-Resolution SVG Diagram for Photosynthesis (Light Reaction & Calvin Cycle)
 */
export const PhotosynthesisDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            Chloroplast Photochemistry
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            Photosynthesis Mechanism: Light Reactions & Calvin Cycle
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-600">
          6 CO2 + 6 H2O ➔ C6H12O6 + 6 O2
        </span>
      </div>

      <svg viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-72">
        {/* Chloroplast Outer Boundary */}
        <rect x="20" y="20" width="660" height="260" rx="16" fill="#142419" stroke="#22543D" strokeWidth="2.5" />
        <text x="45" y="45" fill="#68D391" fontSize="12" fontFamily="monospace" fontWeight="bold">
          CHLOROPLAST (Stroma Matrix)
        </text>

        {/* Sunlight Vector */}
        <path d="M 60 70 L 130 110" stroke="#ECC94B" strokeWidth="3.5" strokeDasharray="6 3" />
        <polygon points="126,113 138,114 133,103" fill="#ECC94B" />
        <text x="40" y="80" fill="#ECC94B" fontSize="12" fontFamily="sans-serif" fontWeight="bold">☀️ Sunlight</text>

        {/* H2O Input */}
        <text x="65" y="170" fill="#63B3ED" fontSize="13" fontFamily="sans-serif" fontWeight="bold">💧 H2O (Water)</text>
        <path d="M 145 165 L 180 165" stroke="#63B3ED" strokeWidth="3" />
        <polygon points="175,160 185,165 175,170" fill="#63B3ED" />

        {/* Stage 1: Thylakoid Membrane Light Reactions */}
        <rect x="185" y="70" width="180" height="170" rx="12" fill="#1C4532" stroke="#48BB78" strokeWidth="2" />
        <text x="200" y="100" fill="#9AE6B4" fontSize="13" fontFamily="sans-serif" fontWeight="bold">LIGHT REACTIONS</text>
        <text x="210" y="125" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">Thylakoid Membrane</text>
        <text x="210" y="145" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">• Chlorophyll excitation</text>
        <text x="210" y="165" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">• Water photolysis</text>
        <text x="210" y="185" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">• ATP Synthase rotary</text>

        {/* Output O2 */}
        <path d="M 275 240 L 275 270" stroke="#4FD1C5" strokeWidth="3" />
        <polygon points="270,265 275,275 280,265" fill="#4FD1C5" />
        <text x="245" y="290" fill="#4FD1C5" fontSize="13" fontFamily="sans-serif" fontWeight="bold">💨 O2 (Oxygen Gas)</text>

        {/* Energy Carriers: ATP & NADPH -> Calvin Cycle */}
        <path d="M 365 110 C 400 90 420 90 455 110" stroke="#ECC94B" strokeWidth="2.5" />
        <polygon points="450,105 460,113 452,118" fill="#ECC94B" />
        <text x="380" y="85" fill="#ECC94B" fontSize="11" fontFamily="monospace" fontWeight="bold">ATP + NADPH</text>

        {/* Spent Carriers: ADP + NADP+ <- Calvin Cycle */}
        <path d="M 455 200 C 420 220 400 220 365 200" stroke="#A0AEC0" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="370,195 360,200 370,205" fill="#A0AEC0" />
        <text x="380" y="235" fill="#A0AEC0" fontSize="10" fontFamily="monospace">ADP + NADP+</text>

        {/* Stage 2: Calvin Cycle (Stroma) */}
        <circle cx="530" cy="155" r="75" fill="#22543D" stroke="#38A169" strokeWidth="2.5" />
        <text x="480" y="145" fill="#C6F6D5" fontSize="13" fontFamily="sans-serif" fontWeight="bold">CALVIN CYCLE</text>
        <text x="495" y="165" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">RuBisCO Enzyme</text>
        <text x="492" y="180" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif">Carbon Fixation</text>

        {/* CO2 Input */}
        <text x="500" y="45" fill="#FEB2B2" fontSize="13" fontFamily="sans-serif" fontWeight="bold">🌫️ CO2 Input</text>
        <path d="M 530 55 L 530 80" stroke="#FEB2B2" strokeWidth="3" />
        <polygon points="525,75 530,85 535,75" fill="#FEB2B2" />

        {/* Glucose Output */}
        <path d="M 605 155 L 635 155" stroke="#F6AD55" strokeWidth="3" />
        <polygon points="630,150 640,155 630,160" fill="#F6AD55" />
        <text x="590" y="270" fill="#F6AD55" fontSize="13" fontFamily="sans-serif" fontWeight="bold">🍬 C6H12O6 (Glucose)</text>
      </svg>
    </div>
  );
};

/**
 * 3. High-Resolution SVG Diagram for Newton's Laws of Motion
 */
export const NewtonsLawsDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Classical Mechanics Principles
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            Newton's Three Laws of Motion: Inertia, Force & Reaction
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-600">
          F_net = m · a
        </span>
      </div>

      <svg viewBox="0 0 700 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-72">
        <rect x="15" y="15" width="670" height="250" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        {/* Panel 1: 1st Law (Inertia) */}
        <rect x="35" y="35" width="195" height="210" rx="10" fill="#252124" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="50" y="65" fill="#E8CCD6" fontSize="12" fontFamily="sans-serif" fontWeight="bold">1ST LAW: INERTIA</text>
        <circle cx="130" cy="120" r="30" fill="#481329" stroke="#ECC94B" strokeWidth="2" />
        <text x="115" y="125" fill="#FFFFFF" fontSize="12" fontFamily="monospace" fontWeight="bold">v = const</text>
        <path d="M 160 120 L 200 120" stroke="#ECC94B" strokeWidth="2.5" />
        <polygon points="195,116 205,120 195,124" fill="#ECC94B" />
        <text x="50" y="180" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">If Net Force = 0,</text>
        <text x="50" y="195" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">object maintains constant</text>
        <text x="50" y="210" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">speed in a straight line.</text>

        {/* Panel 2: 2nd Law (F = ma) */}
        <rect x="250" y="35" width="195" height="210" rx="10" fill="#252124" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="265" y="65" fill="#ECC94B" fontSize="12" fontFamily="sans-serif" fontWeight="bold">2ND LAW: F = m · a</text>
        <rect x="290" y="95" width="55" height="50" rx="6" fill="#6D1F3A" stroke="#FFD700" strokeWidth="2" />
        <text x="305" y="125" fill="#FFFFFF" fontSize="12" fontFamily="monospace" fontWeight="bold">m</text>
        <path d="M 345 120 L 415 120" stroke="#E53E3E" strokeWidth="3.5" />
        <polygon points="410,114 425,120 410,126" fill="#E53E3E" />
        <text x="360" y="110" fill="#E53E3E" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Force F</text>
        <text x="265" y="180" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">Acceleration is proportional</text>
        <text x="265" y="195" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">to net force and inversely</text>
        <text x="265" y="210" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">proportional to mass (a = F/m).</text>

        {/* Panel 3: 3rd Law (Action - Reaction) */}
        <rect x="465" y="35" width="200" height="210" rx="10" fill="#252124" stroke="#6D1F3A" strokeWidth="1.5" />
        <text x="480" y="65" fill="#63B3ED" fontSize="12" fontFamily="sans-serif" fontWeight="bold">3RD LAW: ACTION-REACTION</text>
        <circle cx="525" cy="120" r="24" fill="#2C5282" stroke="#63B3ED" strokeWidth="2" />
        <text x="515" y="125" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Body A</text>
        <circle cx="615" cy="120" r="24" fill="#742A2A" stroke="#E53E3E" strokeWidth="2" />
        <text x="605" y="125" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Body B</text>
        {/* Opposing vectors */}
        <path d="M 549 110 L 590 110" stroke="#63B3ED" strokeWidth="2.5" />
        <polygon points="585,107 595,110 585,113" fill="#63B3ED" />
        <path d="M 590 130 L 550 130" stroke="#E53E3E" strokeWidth="2.5" />
        <polygon points="555,127 545,130 555,133" fill="#E53E3E" />
        <text x="480" y="180" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">Forces always come in</text>
        <text x="480" y="195" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">equal and opposite pairs</text>
        <text x="480" y="210" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">acting on different objects.</text>
      </svg>
    </div>
  );
};

/**
 * 4. High-Resolution SVG Diagram for SQL Joins (Venn Diagram)
 */
export const SqlJoinsDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-burgundy-tint font-bold">
            Relational Algebra & Set Theory
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            Venn Model: INNER, LEFT, & FULL OUTER Joins
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/40 text-burgundy-tint border border-burgundy/60">
          Key Matching Logic
        </span>
      </div>

      <svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-64">
        <rect x="10" y="10" width="680" height="220" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        {/* Set A (Left Table) */}
        <circle cx="280" cy="120" r="85" fill="#6D1F3A" fillOpacity="0.45" stroke="#8B3A55" strokeWidth="3" />
        <text x="215" y="125" fill="#FFF8F3" fontSize="14" fontFamily="sans-serif" fontWeight="bold">
          Table A (Customers)
        </text>

        {/* Set B (Right Table) */}
        <circle cx="420" cy="120" r="85" fill="#2E1B4E" fillOpacity="0.45" stroke="#795290" strokeWidth="3" />
        <text x="445" y="125" fill="#FFF8F3" fontSize="14" fontFamily="sans-serif" fontWeight="bold">
          Table B (Orders)
        </text>

        {/* Intersection (INNER JOIN) */}
        <text x="325" y="115" fill="#FFD700" fontSize="12" fontFamily="monospace" fontWeight="bold">
          MATCH
        </text>
        <text x="322" y="135" fill="#FFD700" fontSize="10" fontFamily="monospace">
          A.id = B.cid
        </text>

        {/* Callouts */}
        <text x="30" y="45" fill="#E8CCD6" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
          LEFT JOIN: All Table A + Matching B
        </text>
        <text x="30" y="200" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">
          Unmatched orders on right produce NULL columns.
        </text>
      </svg>
    </div>
  );
};

/**
 * 5. High-Resolution SVG Diagram for Singly Linked Lists
 */
export const LinkedListDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-burgundy-tint font-bold">
            Dynamic Data Structures
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            Singly Linked List: Pointer Chaining in Dynamic Heap Memory
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/40 text-burgundy-tint border border-burgundy/60">
          O(1) Insertions
        </span>
      </div>

      <svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-64">
        <rect x="10" y="10" width="680" height="220" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        {/* HEAD Pointer */}
        <rect x="30" y="90" width="70" height="40" rx="6" fill="#6D1F3A" stroke="#E8CCD6" strokeWidth="1.5" />
        <text x="45" y="115" fill="#FFF8F3" fontSize="12" fontFamily="monospace" fontWeight="bold">HEAD</text>
        <path d="M 100 110 L 135 110" stroke="#FFD700" strokeWidth="3" />
        <polygon points="135,106 145,110 135,114" fill="#FFD700" />

        {/* Node 1 */}
        <rect x="150" y="75" width="70" height="70" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="2" />
        <text x="175" y="117" fill="#FFFFFF" fontSize="18" fontFamily="monospace" fontWeight="bold">10</text>
        <text x="165" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Data</text>

        <rect x="220" y="75" width="45" height="70" rx="8" fill="#481329" stroke="#6D1F3A" strokeWidth="2" />
        <circle cx="242" cy="110" r="5" fill="#FFD700" />
        <text x="228" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Next</text>

        {/* Arrow Node 1 -> Node 2 */}
        <path d="M 245 110 L 315 110" stroke="#FFD700" strokeWidth="3" />
        <polygon points="315,106 325,110 315,114" fill="#FFD700" />

        {/* Node 2 */}
        <rect x="330" y="75" width="70" height="70" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="2" />
        <text x="355" y="117" fill="#FFFFFF" fontSize="18" fontFamily="monospace" fontWeight="bold">20</text>
        <text x="345" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Data</text>

        <rect x="400" y="75" width="45" height="70" rx="8" fill="#481329" stroke="#6D1F3A" strokeWidth="2" />
        <circle cx="422" cy="110" r="5" fill="#FFD700" />
        <text x="408" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Next</text>

        {/* Arrow Node 2 -> Node 3 */}
        <path d="M 425 110 L 495 110" stroke="#FFD700" strokeWidth="3" />
        <polygon points="495,106 505,110 495,114" fill="#FFD700" />

        {/* Node 3 (Tail) */}
        <rect x="510" y="75" width="70" height="70" rx="8" fill="#2A2227" stroke="#6D1F3A" strokeWidth="2" />
        <text x="535" y="117" fill="#FFFFFF" fontSize="18" fontFamily="monospace" fontWeight="bold">30</text>
        <text x="525" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Data</text>

        <rect x="580" y="75" width="55" height="70" rx="8" fill="#252124" stroke="#6D1F3A" strokeWidth="2" />
        <text x="590" y="115" fill="#FF6B6B" fontSize="12" fontFamily="monospace" fontWeight="bold">NULL</text>
        <text x="592" y="93" fill="#8B3A55" fontSize="10" fontFamily="sans-serif">Next</text>
      </svg>
    </div>
  );
};

/**
 * 6. High-Resolution SVG Diagram for Calculus Integration (Area Under Curve)
 */
export const CalculusIntegrationDiagram: React.FC<DiagramProps> = ({ className = "w-full" }) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
            Infinitesimal Calculus & Analysis
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            Definite Integral: Riemann Sum & Continuous Area Under Curve
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-600">
          ∫[a to b] f(x) dx
        </span>
      </div>

      <svg viewBox="0 0 700 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-68">
        <rect x="15" y="15" width="670" height="230" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        {/* Axes */}
        <path d="M 60 210 L 640 210" stroke="#718096" strokeWidth="2" />
        <path d="M 80 230 L 80 40" stroke="#718096" strokeWidth="2" />
        <text x="645" y="215" fill="#A0AEC0" fontSize="12" fontFamily="sans-serif">x</text>
        <text x="75" y="35" fill="#A0AEC0" fontSize="12" fontFamily="sans-serif">f(x)</text>

        {/* Shaded Area Under Curve */}
        <path d="M 180 210 L 180 140 C 240 80 340 70 420 120 C 470 150 510 170 540 210 Z" fill="#6D1F3A" fillOpacity="0.4" />

        {/* Continuous Curve f(x) */}
        <path d="M 100 180 C 200 60 350 50 450 140 C 500 185 580 190 620 195" stroke="#FFD700" strokeWidth="3" />
        <text x="320" y="60" fill="#FFD700" fontSize="14" fontFamily="sans-serif" fontWeight="bold">y = f(x)</text>

        {/* Boundary a and b */}
        <line x1="180" y1="210" x2="180" y2="135" stroke="#9F7AEA" strokeWidth="2" strokeDasharray="4 4" />
        <text x="175" y="228" fill="#D6BCFA" fontSize="13" fontFamily="sans-serif" fontWeight="bold">x = a</text>

        <line x1="540" y1="210" x2="540" y2="175" stroke="#9F7AEA" strokeWidth="2" strokeDasharray="4 4" />
        <text x="535" y="228" fill="#D6BCFA" fontSize="13" fontFamily="sans-serif" fontWeight="bold">x = b</text>

        {/* Differential slice dx */}
        <rect x="330" y="98" width="22" height="112" fill="#E8CCD6" fillOpacity="0.25" stroke="#E8CCD6" strokeWidth="1" />
        <text x="332" y="225" fill="#E8CCD6" fontSize="11" fontFamily="monospace">dx</text>
        <text x="310" y="160" fill="#FFF8F3" fontSize="13" fontFamily="serif" fontWeight="bold">Area = ∫ f(x) dx</text>
      </svg>
    </div>
  );
};

/**
 * 7. Universal Concept Map / Flowchart Diagram for ANY Arbitrary Topic
 */
export const GenericConceptMapDiagram: React.FC<DiagramProps> = ({ 
  className = "w-full", 
  topic = "Educational Concept",
  subject = "Academic Domain"
}) => {
  return (
    <div className={`bg-charcoal-dark border-2 border-burgundy rounded-2xl p-5 sm:p-6 text-cream-warm shadow-doodle ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-burgundy-tint font-bold">
            {subject} Concept Model
          </span>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white">
            {topic}: Structural System Architecture & Relationship Flow
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy/40 text-burgundy-tint border border-burgundy/60">
          Core Principles Flow
        </span>
      </div>

      <svg viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-64">
        <rect x="15" y="15" width="670" height="210" rx="12" fill="#1C181B" stroke="#481329" strokeWidth="2" />

        {/* Node 1: Inputs / Foundations */}
        <rect x="40" y="80" width="160" height="80" rx="10" fill="#2A2227" stroke="#6D1F3A" strokeWidth="2" />
        <text x="60" y="110" fill="#E8CCD6" fontSize="12" fontFamily="sans-serif" fontWeight="bold">1. Foundations & Inputs</text>
        <text x="60" y="130" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">• Initial Variables</text>
        <text x="60" y="145" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">• Preconditions & Scope</text>

        {/* Connector 1 -> 2 */}
        <path d="M 200 120 L 255 120" stroke="#FFD700" strokeWidth="3" />
        <polygon points="255,116 265,120 255,124" fill="#FFD700" />

        {/* Node 2: Core Mechanism (CURRENT_TOPIC) */}
        <rect x="265" y="65" width="180" height="110" rx="12" fill="#481329" stroke="#FFD700" strokeWidth="2.5" />
        <text x="280" y="95" fill="#FFD700" fontSize="11" fontFamily="monospace" fontWeight="bold">CORE PROCESS</text>
        <text x="280" y="120" fill="#FFF8F3" fontSize="13" fontFamily="sans-serif" fontWeight="bold">{topic}</text>
        <text x="280" y="145" fill="#E8CCD6" fontSize="10" fontFamily="sans-serif">• Dynamic Transitions</text>
        <text x="280" y="160" fill="#E8CCD6" fontSize="10" fontFamily="sans-serif">• Rule Preservation</text>

        {/* Connector 2 -> 3 */}
        <path d="M 445 120 L 500 120" stroke="#FFD700" strokeWidth="3" />
        <polygon points="500,116 510,120 500,124" fill="#FFD700" />

        {/* Node 3: Outputs / Applications */}
        <rect x="510" y="80" width="160" height="80" rx="10" fill="#2A2227" stroke="#6D1F3A" strokeWidth="2" />
        <text x="525" y="110" fill="#9AE6B4" fontSize="12" fontFamily="sans-serif" fontWeight="bold">3. Outputs & Impact</text>
        <text x="525" y="130" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">• Measurable Results</text>
        <text x="525" y="145" fill="#A0AEC0" fontSize="10" fontFamily="sans-serif">• System Equilibrium</text>
      </svg>
    </div>
  );
};

/**
 * Universal Topic Diagram Selector
 * Dynamically selects and renders the exact diagram tailored to the current topic
 */
export const TopicDiagramSelector: React.FC<{ topic: string; subject?: string }> = ({ topic, subject = '' }) => {
  const tLower = topic.toLowerCase();

  if (tLower.includes('pointer') || tLower.includes('memory address')) {
    return <MemoryAddressDiagram />;
  } else if (tLower.includes('photosynthesis') || tLower.includes('chloroplast')) {
    return <PhotosynthesisDiagram />;
  } else if (tLower.includes('newton') || tLower.includes('motion') || tLower.includes('inertia')) {
    return <NewtonsLawsDiagram />;
  } else if (tLower.includes('join') || tLower.includes('sql')) {
    return <SqlJoinsDiagram />;
  } else if (tLower.includes('linked list') || tLower.includes('singly')) {
    return <LinkedListDiagram />;
  } else if (tLower.includes('calculus') || tLower.includes('integral') || tLower.includes('derivative')) {
    return <CalculusIntegrationDiagram />;
  }

  // Fallback to dynamic concept map architecture for arbitrary topics
  return <GenericConceptMapDiagram topic={topic} subject={subject || 'Academic'} />;
};
