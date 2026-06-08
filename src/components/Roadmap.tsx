import { motion } from "motion/react";
import { Milestone, Sparkles, Trophy, Cpu, Eye, Cloud } from "lucide-react";

export default function Roadmap() {
  const steps = [
    { phase: "Phase 1", title: "Student productivity platform", desc: "Core mobile & client focus interfaces with NEX behavioral matching engine.", icon: Trophy, status: "Active Deployment" },
    { phase: "Phase 2", title: "Teacher ecosystem", desc: "Integrated AP dashboards with instant retention alerts and parent notification system.", icon: Cpu, status: "Alpha Beta" },
    { phase: "Phase 3", title: "School analytics platform", desc: "District-level secure portals highlighting attention deficits across departments.", icon: Sparkles, status: "Planned H2 2026" },
    { phase: "Phase 4", title: "AI wearable focus tracker", desc: "EEG-equipped headband tracing focus rhythms at a raw biological level.", icon: Milestone, status: "Conceptual Phase" },
    { phase: "Phase 5", title: "VR focus environments", desc: "Spatial mental environments created in Vision Pro to isolate extreme distractions.", icon: Eye, status: "Conceptual Phase" },
    { phase: "Phase 6", title: "Global productivity ecosystem", desc: "Comprehensive, multi-district network matching students to flow-peers universally.", icon: Cloud, status: "Global Vision" },
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#101827]/30 to-transparent">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#9B6DFF]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-cyan-400 uppercase">THE SCALING PHASE</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight">
            Future Roadmap
          </h2>
          <p className="text-lg text-white/50 mt-4 font-sans">
            A comprehensive multidimensional strategy to transition FocusFlow from an individual micro-tool to a comprehensive educational infrastructure.
          </p>
        </div>

        {/* Chronological Timeline Grid */}
        <div className="relative mt-20">
          {/* Central Vertical Connector Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                  {/* Even/Odd Alignment Grid */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:text-right md:order-1" : "md:order-2"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="backdrop-blur-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#4DA3FF]/40 rounded-3xl p-8 shadow-2xl transition-all relative text-left"
                    >
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#4DA3FF] uppercase mb-1 block">
                        {step.phase}
                      </span>
                      <h4 className="font-display font-bold text-xl text-white mb-2 leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed font-sans mb-4">
                        {step.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-[10px] text-white/40 uppercase font-mono font-bold tracking-wider">
                          {step.status}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Visual */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[50%] -translate-y-[50%] hidden md:flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-[#070B14] border border-white/10 group-hover:border-[#4DA3FF] flex items-center justify-center transition-colors">
                      <IconComp className="w-5 h-5 text-white/40 group-hover:text-[#4DA3FF] transition-colors" />
                    </div>
                  </div>

                  <div className="w-full md:w-[45%] hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
