import { motion } from "motion/react";
import NeuralOrb from "./NeuralOrb";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-28 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-left flex flex-col justify-center"
        >
          <div className="mb-6 px-3.5 py-1 w-fit rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-[#4DA3FF] text-[10px] uppercase tracking-[0.25em] font-bold font-mono">
              Next-Gen Cognitive OS
          </div>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl leading-[1.05] font-bold tracking-tighter mb-6 font-display text-white">
            FOCUS<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/45">FLOW AI</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-[540px] mb-8 font-sans">
            Turning screen addiction into <span className="text-white font-semibold">peak human performance.</span> A futuristic neural interface for the modern student.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#9B6DFF] font-bold text-sm tracking-widest uppercase text-white shadow-[0_10px_30px_rgba(77,163,255,0.25)] hover:brightness-110 transition-all cursor-pointer"
            >
              Start Deep Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all cursor-pointer text-white"
            >
              The Science
            </motion.button>
          </div>

          {/* Statistics Info Row */}
          <div className="flex gap-10 items-center">
            {[
              { val: "42%", label: "Focus Increase" },
              { val: "1.2M", label: "Deep Sessions" },
              { val: "9.8", label: "Avg. Score" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-10">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display">{stat.val}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1 font-mono font-bold">{stat.label}</div>
                </div>
                {i < 2 && <div className="w-[1px] h-8 bg-white/10 shrink-0"></div>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic, interactive Neural Orb wrapper with particle sparkles */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Subtle surrounding backdrop radial glow */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#4DA3FF]/10 to-[#9B6DFF]/10 blur-[130px] rounded-full pointer-events-none"></div>
          
          <div className="relative w-full flex flex-col items-center">
            <NeuralOrb />
            
            {/* Direct caption explaining interactive sparkles */}
            <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.2em] text-center mt-20 max-w-xs leading-relaxed pointer-events-none">
              ✦ Hover or touch to ignite neural synapse sparkle trails ✦
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
