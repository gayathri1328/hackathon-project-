import React, { useState } from 'react';
import { 
  Sun, 
  Droplets, 
  Wind, 
  Sparkles, 
  Thermometer, 
  Flame, 
  Snowflake, 
  Cpu, 
  Layers, 
  ArrowRight, 
  ArrowDown, 
  Activity, 
  Table, 
  CheckCircle2, 
  Lightbulb, 
  Zap,
  Split,
  Eye,
  Workflow
} from 'lucide-react';
import { 
  MemoryAddressDiagram, 
  PhotosynthesisDiagram, 
  NewtonsLawsDiagram, 
  SqlJoinsDiagram, 
  CalculusIntegrationDiagram, 
  LinkedListDiagram, 
  GenericConceptMapDiagram 
} from './EducationalDiagrams';
import { 
  StarsDoodle, 
  LightBulbDoodle, 
  ArrowDoodle, 
  StickyNoteDoodle 
} from '../doodles';

interface VisualGuideCanvasProps {
  topic: string;
  category?: string;
  difficulty?: string;
}

export const VisualGuideCanvas: React.FC<VisualGuideCanvasProps> = ({
  topic,
  category = 'Educational Domain',
  difficulty = 'Beginner'
}) => {
  const tLower = topic.toLowerCase();
  const [activeVisualTab, setActiveVisualTab] = useState<number>(0);

  // 1. TEMPERATURE VISUAL GUIDE CANVAS
  if (tLower.includes('temperature')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Visual Guide Header Banner */}
        <div className="relative bg-gradient-to-r from-burgundy-dark to-burgundy rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
          <div className="absolute -top-4 right-8 opacity-20 pointer-events-none">
            <StarsDoodle className="w-24 h-24 text-cream-warm" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-cream-warm border border-white/30">
                VISUAL GUIDE • {category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40">
                Level: {difficulty}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: {topic}
            </h1>
            <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
              "Understand the topic visually — from molecular particle agitation to temperature scale benchmarks."
            </p>
          </div>
        </div>

        {/* SECTION 1: FLOWCHART OF TEMPERATURE */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cream-border">
            <Workflow className="w-4 h-4 text-burgundy" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-dark">
              Molecular Cause & Effect Flowchart
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-cream-warm border border-burgundy-border/60 text-center relative group hover:shadow-doodle-sm transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-burgundy-light text-burgundy flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-xs font-mono uppercase font-bold text-burgundy block mb-1">
                Thermal Energy Absorbed
              </span>
              <p className="text-xs text-charcoal leading-relaxed">
                Heat transfers into the substance, accelerating microscopic atomic vibration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-burgundy-light/60 border-2 border-burgundy/40 text-center relative group hover:shadow-doodle-sm transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-sm shadow-sm">
                2
              </div>
              <span className="text-xs font-mono uppercase font-bold text-burgundy-dark block mb-1">
                Average Kinetic Energy ⟨Ek⟩
              </span>
              <p className="text-xs text-charcoal leading-relaxed">
                Mean particle velocity squared increases: <strong className="font-mono text-burgundy font-bold">⟨Ek⟩ = (3/2) kB T</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-cream-warm border border-burgundy-border/60 text-center relative group hover:shadow-doodle-sm transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs font-mono uppercase font-bold text-emerald-800 block mb-1">
                Observable Temperature
              </span>
              <p className="text-xs text-charcoal leading-relaxed">
                Colliding molecules expand mercury columns or activate digital thermistor sensors.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: HOT VS COLD PARTICLE COMPARISON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* COLD STATE */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-blue-800">
              <Snowflake className="w-5 h-5 text-blue-500" />
              <h4 className="font-serif font-bold text-base">Low Temperature (Cold)</h4>
            </div>
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 mb-3 text-center">
              <div className="h-28 flex items-center justify-center gap-4">
                <span className="w-5 h-5 rounded-full bg-blue-400 opacity-80 animate-pulse" />
                <span className="w-5 h-5 rounded-full bg-blue-500 opacity-90" />
                <span className="w-5 h-5 rounded-full bg-blue-300 opacity-70 animate-pulse" />
                <span className="w-5 h-5 rounded-full bg-blue-600 opacity-80" />
              </div>
              <span className="text-[11px] font-mono text-blue-700 font-bold block">
                Particles gently sway at low velocity
              </span>
            </div>
            <ul className="text-xs text-charcoal space-y-1.5">
              <li>• Low translational kinetic energy</li>
              <li>• Minimal collision frequency with container walls</li>
              <li>• Fluid density is typically higher</li>
            </ul>
          </div>

          {/* HOT STATE */}
          <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-rose-800">
              <Flame className="w-5 h-5 text-rose-500" />
              <h4 className="font-serif font-bold text-base">High Temperature (Hot)</h4>
            </div>
            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 mb-3 text-center">
              <div className="h-28 flex items-center justify-center gap-4">
                <span className="w-6 h-6 rounded-full bg-rose-500 shadow-md animate-bounce" />
                <span className="w-6 h-6 rounded-full bg-amber-500 shadow-md animate-ping" />
                <span className="w-6 h-6 rounded-full bg-rose-600 shadow-md animate-bounce" />
                <span className="w-6 h-6 rounded-full bg-orange-500 shadow-md" />
              </div>
              <span className="text-[11px] font-mono text-rose-700 font-bold block">
                Particles frantic, rapidly colliding & bouncing
              </span>
            </div>
            <ul className="text-xs text-charcoal space-y-1.5">
              <li>• High translational kinetic energy</li>
              <li>• Frequent, energetic collisions transfer large momentum</li>
              <li>• Substances expand (thermal expansion)</li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: THERMAL SCALES BENCHMARKS */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cream-border">
            <Thermometer className="w-4 h-4 text-burgundy" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-dark">
              Universal Temperature Scale Reference Barometer
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-burgundy/20 text-burgundy font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-3">Physical State Benchmark</th>
                  <th className="py-2.5 px-3">Celsius (°C)</th>
                  <th className="py-2.5 px-3">Kelvin (K)</th>
                  <th className="py-2.5 px-3">Fahrenheit (°F)</th>
                  <th className="py-2.5 px-3">Molecular Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border font-sans">
                <tr className="bg-blue-50/40">
                  <td className="py-2.5 px-3 font-semibold text-charcoal-dark">Absolute Zero</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">-273.15 °C</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">0.00 K</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">-459.67 °F</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">All classical molecular motion ceases</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-charcoal-dark">Freezing Point of Water</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-charcoal">0.00 °C</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">273.15 K</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">32.00 °F</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">Molecules lock into crystalline ice lattice</td>
                </tr>
                <tr className="bg-amber-50/30">
                  <td className="py-2.5 px-3 font-semibold text-charcoal-dark">Comfortable Room Temp</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-charcoal">20.00 °C</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">293.15 K</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">68.00 °F</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">Gas molecules move at ~500 m/s in air</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-charcoal-dark">Human Body Temperature</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-charcoal">37.00 °C</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">310.15 K</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">98.60 °F</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">Optimum temperature for human enzyme activity</td>
                </tr>
                <tr className="bg-rose-50/40">
                  <td className="py-2.5 px-3 font-semibold text-charcoal-dark">Boiling Point of Water</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-700">100.00 °C</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-700">373.15 K</td>
                  <td className="py-2.5 px-3 font-mono text-charcoal">212.00 °F</td>
                  <td className="py-2.5 px-3 text-charcoal-muted">Molecules break hydrogen bonds to enter vapor phase</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 2. PHOTOSYNTHESIS VISUAL GUIDE CANVAS
  if (tLower.includes('photosynthesis')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
          <div className="absolute -top-4 right-8 opacity-25 pointer-events-none">
            <StarsDoodle className="w-24 h-24 text-emerald-200" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 border border-white/30">
                VISUAL GUIDE • BIOLOGY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/30 text-emerald-100 border border-emerald-300/40">
                Level: {difficulty}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: Photosynthesis
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-sans max-w-xl italic">
              "Understand plant energy capture visually — inputs, sunlight activation, and glucose generation."
            </p>
          </div>
        </div>

        {/* SECTION 1: MASTER INPUT-PROCESS-OUTPUT DIAGRAM */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-cream-border">
            <Sun className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-dark">
              Photochemical Energy Conversion Flowchart
            </h3>
          </div>

          {/* Centered Visual Cascade */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* 1. Sunlight */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center gap-3 text-amber-950 font-serif font-bold text-sm shadow-xs">
              <Sun className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span>☀️ SUNLIGHT (Photon Energy)</span>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* 2. Chlorophyll */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center gap-3 text-emerald-950 font-serif font-bold text-sm shadow-xs">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>🌿 CHLOROPHYLL (P680 / P700 Light Reaction Centers)</span>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* 3. Reactants Split (Water + CO2) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
                <span className="text-xs font-mono font-bold text-blue-800 uppercase block mb-1">
                  Water (H₂O)
                </span>
                <span className="text-[11px] text-blue-900/80">
                  Absorbed by roots → Photolyzed in PS II
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-50 border-2 border-purple-200 text-center">
                <span className="text-xs font-mono font-bold text-purple-800 uppercase block mb-1">
                  Carbon Dioxide (CO₂)
                </span>
                <span className="text-[11px] text-purple-900/80">
                  Diffuses through stomata → Calvin Cycle
                </span>
              </div>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* 4. The Core Photosynthesis Machine */}
            <div className="p-4 rounded-2xl bg-burgundy text-white text-center font-serif font-bold text-base shadow-doodle-sm">
              <span>PHOTOSYNTHESIS BIOCHEMICAL FACTORY</span>
              <span className="text-[11px] font-sans font-normal text-cream-warm/80 block mt-1">
                6 CO₂ + 6 H₂O + Photons ⟶ C₆H₁₂O₆ + 6 O₂
              </span>
            </div>

            <div className="flex justify-center text-emerald-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* 5. Products */}
            <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-center text-emerald-950 font-serif font-bold text-base">
              <span>🍃 GLUCOSE (C₆H₁₂O₆) + OXYGEN (O₂)</span>
              <span className="text-xs font-sans font-normal text-emerald-800 block mt-1">
                Chemical sugar energy stored for plant growth + oxygen released to atmosphere
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHAT GOES IN? WHAT COMES OUT? WHY? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-blue-800">
                <Droplets className="w-5 h-5 text-blue-500" />
                <h4 className="font-serif font-bold text-base uppercase tracking-wider">What Goes In?</h4>
              </div>
              <ul className="text-xs text-charcoal space-y-2">
                <li className="p-2 rounded-xl bg-blue-50/60 border border-blue-100">
                  <strong>Water (H₂O):</strong> Absorbed from soil via root capillary pressure.
                </li>
                <li className="p-2 rounded-xl bg-blue-50/60 border border-blue-100">
                  <strong>Carbon Dioxide (CO₂):</strong> Siphoned from ambient air via leaf stomata pores.
                </li>
                <li className="p-2 rounded-xl bg-blue-50/60 border border-blue-100">
                  <strong>Light Photons:</strong> Radiated from the sun to energize electrons.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-emerald-800">
                <Wind className="w-5 h-5 text-emerald-500" />
                <h4 className="font-serif font-bold text-base uppercase tracking-wider">What Comes Out?</h4>
              </div>
              <ul className="text-xs text-charcoal space-y-2">
                <li className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <strong>Glucose (C₆H₁₂O₆):</strong> Stable 6-carbon monosaccharide sugar used for ATP energy and cell walls.
                </li>
                <li className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <strong>Oxygen Gas (O₂):</strong> Direct byproduct of water photolysis, venting into the troposphere.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-burgundy rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-burgundy">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h4 className="font-serif font-bold text-base uppercase tracking-wider">Why Do Plants Do It?</h4>
              </div>
              <p className="text-xs text-charcoal leading-relaxed p-2.5 rounded-xl bg-burgundy-light/40 border border-burgundy/20">
                Plants are autotrophs: they cannot eat food. Photosynthesis is their biological mechanism to produce and package chemical energy from ambient air and sunlight to power cellular growth.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: EMBEDDED CHLOROPLAST ARCHITECTURE SVG */}
        <PhotosynthesisDiagram />
      </div>
    );
  }

  // 3. C POINTERS VISUAL GUIDE CANVAS
  if (tLower.includes('pointer')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-charcoal-dark to-charcoal rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden border-2 border-burgundy">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-burgundy text-white border border-burgundy-border">
                VISUAL GUIDE • C PROGRAMMING
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cream-warm border border-white/20">
                Memory Model
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: C Pointers & RAM Memory Boxes
            </h1>
            <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
              "Understand physical hardware memory addresses, pointer variables, and dereferencing visually."
            </p>
          </div>
        </div>

        {/* SECTION 1: POINTER MEMORY BOX VISUALIZER */}
        <MemoryAddressDiagram />

        {/* SECTION 2: DEREFERENCING WORKFLOW STEPS */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cream-border">
            <Layers className="w-4 h-4 text-burgundy" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-dark">
              Dereferencing Step-by-Step Sequence: *ptr = 99
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-cream-warm border border-burgundy-border/50 text-center">
              <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                1
              </span>
              <span className="font-mono font-bold text-burgundy block mb-1">Look up ptr</span>
              <p className="text-charcoal-muted text-[11px]">
                CPU reads the hexadecimal value stored inside <code className="text-burgundy">ptr</code> (e.g. <code className="text-charcoal">0x7ffd50</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-warm border border-burgundy-border/50 text-center">
              <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                2
              </span>
              <span className="font-mono font-bold text-burgundy block mb-1">Follow Address</span>
              <p className="text-charcoal-muted text-[11px]">
                Hardware address bus activates memory cell at RAM location <code className="text-charcoal">0x7ffd50</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-warm border border-burgundy-border/50 text-center">
              <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                3
              </span>
              <span className="font-mono font-bold text-burgundy block mb-1">Mutate Target</span>
              <p className="text-charcoal-muted text-[11px]">
                Writes the integer <code className="text-emerald-700 font-bold">99</code> directly into those 4 bytes on stack memory.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mx-auto mb-2">
                4
              </span>
              <span className="font-mono font-bold text-emerald-800 block mb-1">Caller Sees 99</span>
              <p className="text-emerald-900/90 text-[11px]">
                The original variable <code className="text-burgundy">score</code> now reads 99 without ever being passed directly!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. NEWTON'S LAWS VISUAL GUIDE CANVAS
  if (tLower.includes('newton')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-r from-burgundy-dark to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-cream-warm border border-white/30 block w-fit mb-2">
              VISUAL GUIDE • PHYSICS & MECHANICS
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: Newton's Three Laws of Motion
            </h1>
            <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
              "Understand inertia, force vectors, acceleration, and action-reaction pairs visually."
            </p>
          </div>
        </div>

        {/* 3-Law SVG Diagram */}
        <NewtonsLawsDiagram />

        {/* Visual Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase block">
              1st Law Visual
            </span>
            <h4 className="font-serif font-bold text-sm text-charcoal">F_net = 0 ⟹ v is Constant</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              An asteroid gliding in deep space vacuum travels in a straight line forever until a planet's gravity bends its trajectory.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border-2 border-rose-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-rose-800 uppercase block">
              2nd Law Visual
            </span>
            <h4 className="font-serif font-bold text-sm text-charcoal">F = m · a</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Pushing a 1,000 kg car takes 200 times more force than pushing a 5 kg shopping cart to achieve the same acceleration.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border-2 border-blue-200 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-blue-800 uppercase block">
              3rd Law Visual
            </span>
            <h4 className="font-serif font-bold text-sm text-charcoal">F_action = - F_reaction</h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              A swimmer pushes water backward with their hands; the water pushes the swimmer forward with equal force.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 5. SQL JOINS VISUAL GUIDE CANVAS
  if (tLower.includes('join') || tLower.includes('sql')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-r from-purple-950 to-burgundy-dark rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-cream-warm border border-white/30 block w-fit mb-2">
              VISUAL GUIDE • RELATIONAL DATABASES
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: SQL Relational Joins
            </h1>
            <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
              "Understand Venn set intersections, primary-to-foreign key matches, and NULL outer join behavior."
            </p>
          </div>
        </div>

        {/* Venn Diagram */}
        <SqlJoinsDiagram />

        {/* Visual Table Mapping */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-cream-border">
            <Table className="w-4 h-4 text-burgundy" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-burgundy-dark">
              Visual Relational Table Mapping: Customers ⟕ Orders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Table A */}
            <div className="p-4 rounded-2xl bg-cream-warm border border-burgundy-border/60">
              <span className="font-serif font-bold text-burgundy-dark text-sm block mb-2 font-sans">
                Table A: Customers
              </span>
              <div className="bg-white p-2.5 rounded-xl border border-cream-border space-y-1">
                <div className="flex justify-between font-bold text-charcoal border-b pb-1">
                  <span>id</span>
                  <span>name</span>
                </div>
                <div className="flex justify-between text-burgundy">
                  <span>1</span>
                  <span>Alice</span>
                </div>
                <div className="flex justify-between text-burgundy">
                  <span>2</span>
                  <span>Bob</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>3</span>
                  <span>Charlie (0 orders)</span>
                </div>
              </div>
            </div>

            {/* Table B */}
            <div className="p-4 rounded-2xl bg-cream-warm border border-burgundy-border/60">
              <span className="font-serif font-bold text-purple-900 text-sm block mb-2 font-sans">
                Table B: Orders
              </span>
              <div className="bg-white p-2.5 rounded-xl border border-cream-border space-y-1">
                <div className="flex justify-between font-bold text-charcoal border-b pb-1">
                  <span>order_id</span>
                  <span>customer_id</span>
                  <span>amount</span>
                </div>
                <div className="flex justify-between text-purple-800">
                  <span>101</span>
                  <span>1</span>
                  <span>$85.00</span>
                </div>
                <div className="flex justify-between text-purple-800">
                  <span>102</span>
                  <span>2</span>
                  <span>$140.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. DIFFERENTIATION / CALCULUS VISUAL GUIDE CANVAS
  if (tLower.includes('differentiation') || tLower.includes('calculus') || tLower.includes('derivative')) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="relative bg-gradient-to-r from-purple-900 to-burgundy-dark rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-cream-warm border border-white/30 block w-fit mb-2">
              VISUAL GUIDE • MATHEMATICS & CALCULUS
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Visual Guide: Differentiation & Tangent Slopes
            </h1>
            <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
              "Understand instantaneous rates of change, tangent slopes, and the limit of secants visually."
            </p>
          </div>
        </div>

        <CalculusIntegrationDiagram />
      </div>
    );
  }

  // 7. UNIVERSAL VISUAL GUIDE CANVAS FOR ANY OTHER TOPIC
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative bg-gradient-to-r from-burgundy-dark to-burgundy rounded-3xl p-6 sm:p-8 text-white shadow-doodle overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-cream-warm border border-white/30 block w-fit mb-2">
            VISUAL GUIDE • {category.toUpperCase()}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Visual Guide: {topic}
          </h1>
          <p className="text-xs sm:text-sm text-cream-warm/90 font-sans max-w-xl italic">
            "Understand the structural architecture, system inputs, transformations, and outcomes visually."
          </p>
        </div>
      </div>

      <GenericConceptMapDiagram topic={topic} subject={category} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white border-2 border-burgundy-border shadow-sm space-y-2">
          <span className="text-xs font-mono font-bold text-burgundy uppercase block">
            System Inputs
          </span>
          <h4 className="font-serif font-bold text-sm text-charcoal">Preconditions & Initial State</h4>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            The external inputs, initial conditions, or starting variables that initiate state transitions in {topic}.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-burgundy shadow-doodle-sm space-y-2">
          <span className="text-xs font-mono font-bold text-burgundy-dark uppercase block">
            Core Transformation
          </span>
          <h4 className="font-serif font-bold text-sm text-charcoal">Deterministic Operational Rules</h4>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            The governing laws and mechanisms of {topic} that transform inputs while preserving systemic invariants.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border-2 border-emerald-200 shadow-sm space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase block">
            Equilibrium Result
          </span>
          <h4 className="font-serif font-bold text-sm text-charcoal">Balanced Outputs</h4>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Measurable results, outputs, and systemic equilibrium achieved across real-world applications.
          </p>
        </div>
      </div>
    </div>
  );
};
