import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, TrendingDown, RefreshCw, Zap, ShieldAlert, Sparkles } from "lucide-react";

export default function Problem() {
  // Slider states for Brain Rot Meter calculations
  const [shortVideoHours, setShortVideoHours] = useState(3.5); // tiktok/shorts hours
  const [studyMins, setStudyMins] = useState(45); // study minutes
  const [unlocks, setUnlocks] = useState(65); // phone unlocks list

  // Derived calculations
  const scoreRaw = Math.max(0, Math.min(100, Math.round(100 - (shortVideoHours * 15) - (unlocks * 0.4) + (studyMins * 0.5))));
  const focusHealthScore = scoreRaw;
  
  let brainRotLevel = "Mindful Explorer";
  let brainRotColor = "text-green-400";
  let brainRotBg = "bg-green-500/10 border-green-500/30";
  let diagnosisMsg = "Minimal cognitive damage. Keep loading deep-work blocks.";

  if (focusHealthScore < 30) {
    brainRotLevel = "Extreme Dopamine Flooding (Severe)";
    brainRotColor = "text-rose-500";
    brainRotBg = "bg-rose-500/10 border-rose-500/30";
    diagnosisMsg = "Critical neural fatigue. Constant short-form feeds have saturated attention circuitry.";
  } else if (focusHealthScore < 60) {
    brainRotLevel = "Distracted Mind (Moderate)";
    brainRotColor = "text-amber-400";
    brainRotBg = "bg-amber-500/10 border-amber-500/30";
    diagnosisMsg = "Significant attention volatility. Dopamine receptors require immediate resetting.";
  } else if (focusHealthScore >= 80) {
    brainRotLevel = "Flow State Sage (Legendary)";
    brainRotColor = "text-cyan-400";
    brainRotBg = "bg-cyan-500/10 border-cyan-500/30";
    diagnosisMsg = "Superb neural fortitude. Absolute clarity achieved. Continue flow sessions!";
  }

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070B14] to-[#0A0F1E] border-y border-white/5">
      {/* Decorative neon blobs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-rose-400 uppercase">THE COGNITIVE SPILL</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight leading-none">
            The Interactive Brain Rot Diagnosis
          </h2>
          <p className="text-lg text-white/50 mt-4 leading-relaxed font-sans">
            Addicted feed algorithms (shorts, swipe counters, triggers) hijack your reward loop. Drag the sliders underneath to estimate your raw focus health in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Sliders Input Panel (Left) */}
          <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#4DA3FF]" /> Enter Daily Screen Patterns
            </h3>

            <div className="space-y-8">
              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/70">
                  <span>TikTok / Shorts Daily Spend</span>
                  <span className="text-[#FF4D4D] font-bold">{shortVideoHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={shortVideoHours}
                  onChange={(e) => setShortVideoHours(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF4D4D]"
                />
                <span className="text-[10px] text-white/40 block">Algorithm targets visual synapses every 4-8 seconds.</span>
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/70">
                  <span>Daily Unlocks (Micro-checks)</span>
                  <span className="text-amber-400 font-bold">{unlocks} times</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={unlocks}
                  onChange={(e) => setUnlocks(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="text-[10px] text-white/40 block">Unconscious device checks indicate attention span volatility.</span>
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/70">
                  <span>Deep Non-Interrupted Study Time</span>
                  <span className="text-green-400 font-bold">{studyMins} min</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={studyMins}
                  onChange={(e) => setStudyMins(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-400"
                />
                <span className="text-[10px] text-white/40 block">Continuous study sessions expand durable neural networks.</span>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-6 flex justify-between items-center text-xs text-white/40 font-mono">
              <span>COPPA & Privacy compliant tracking math</span>
              <button 
                onClick={() => { setShortVideoHours(1); setStudyMins(90); setUnlocks(20); }} 
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset to Safe State
              </button>
            </div>
          </div>

          {/* Interactive Diagnosis Response Panel (Right) */}
          <div className="lg:col-span-6 backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative">
            <div className={`absolute top-4 right-4 text-[10px] font-mono border px-2.5 py-1 rounded-full uppercase tracking-widest font-bold ${brainRotBg}`}>
              {focusHealthScore < 50 ? "Distconnected Alert" : "System Balanced"}
            </div>

            <div>
              <span className="text-[10px] font-mono text-white/40 block uppercase tracking-widest mb-1.5 font-bold">BIOLOGICAL RATING</span>
              <h3 className="font-display text-2xl font-bold text-white leading-tight">Focus Analyzer Outputs</h3>

              {/* Big focus score display */}
              <div className="flex items-baseline gap-4 my-6">
                <span className="text-7xl font-mono font-bold tracking-tight text-white">{focusHealthScore}</span>
                <div>
                  <span className="text-[11px] font-mono text-[#4DA3FF] uppercase block tracking-wider font-semibold">Focus Health Index</span>
                  <span className="text-xs text-white/40 block">Max optimal target: 100</span>
                </div>
              </div>

              {/* Progress Bar Visual to show limits */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6">
                <motion.div 
                  className={`h-full ${focusHealthScore < 30 ? "bg-rose-500" : focusHealthScore < 60 ? "bg-amber-400" : "bg-cyan-400"}`}
                  animate={{ width: `${focusHealthScore}%` }}
                  transition={{ duration: 0.4 }}
                ></motion.div>
              </div>

              {/* Diagnosis box */}
              <div className={`p-4 rounded-2xl border ${brainRotBg} space-y-2`}>
                <div className="flex items-center gap-2">
                  <ShieldAlert className={`w-4 h-4 ${brainRotColor}`} />
                  <span className={`text-xs font-mono font-bold tracking-wide uppercase ${brainRotColor}`}>{brainRotLevel}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">{diagnosisMsg}</p>
              </div>
            </div>

            {/* Daily Improvement Trends + Custom Alert warnings */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest block">Daily Improvement Trend</span>
                <span className="text-sm font-semibold text-white/90 flex items-center gap-1 mt-1">
                  {focusHealthScore < 50 ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />
                      -14% cognitive degradation
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      +28% optimal neural balance
                    </>
                  )}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest block">Distraction Alert level</span>
                {focusHealthScore < 40 ? (
                  <span className="text-sm font-semibold text-rose-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> Focus Deprivation
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-green-400 flex items-center gap-1 mt-1">
                    <Zap className="w-4 h-4 shrink-0" /> Absolute Flow State
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
