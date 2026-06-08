import { motion } from "motion/react";
import { BookOpen, HelpCircle, Heart, Globe } from "lucide-react";

export default function SDGImpact() {
  const metrics = [
    { metric: "14.2%", label: "Average Grade Uplift" },
    { metric: "2.1 Hrs", label: "Reclaimed Time Daily" },
    { metric: "18+", label: "Distressed Habit Removals" }
  ];

  return (
    <section id="impact" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#070B14]">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#4DA3FF]/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-[#9B6DFF] uppercase">SOCIAL IMPACT</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight leading-none">
            Creating Better Learning Habits
          </h2>
          <p className="text-lg text-white/50 mt-4">
            We are dedicated to combating systemic digital exhaustion. Real wellness means restoring human capacity and enabling equitable potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* SDG block */}
          <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#9B6DFF]/10 blur-3xl rounded-full"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-[#9B6DFF] flex items-center justify-center p-[1px] shadow-lg">
                <div className="w-full h-full rounded-2xl bg-[#070B14] flex items-center justify-center">
                  <Globe className="w-7 h-7 text-[#9B6DFF]" />
                </div>
              </div>
              <div>
                <span className="text-[#9B6DFF] font-mono text-xs tracking-wider uppercase">GLOBAL INITIATIVE</span>
                <h3 className="font-display text-xl font-bold mt-1">SDG 4 — Quality Education</h3>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-sans mb-6">
              Education isn't purely about curriculums — it's about student capacity. Cognitive damage caused by short-form Dopamine cycles is creating an unprecedented barrier to learning equity. By restoring attention spans, FocusFlow directly fuels the UN’s Sustainable Development Goal 4.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-bold text-white">{m.metric}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Benefits Cards */}
          <div className="flex flex-col gap-6">
            {[
              { 
                icon: BookOpen, 
                title: "Cognitive Fortitude", 
                desc: "Rebuild durable neural connections lost to addictive feed algorithms, restoring the ability to hold complex conceptual thoughts." 
              },
              { 
                icon: Heart, 
                title: "Digital Wellness Centerpiece", 
                desc: "An safe, structured framework where students regain absolute confidence in their intellectual autonomy without constant screen shame." 
              }
            ].map((benefit, i) => {
              const IconComp = benefit.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-6 hover:border-white/15 transition-all">
                  <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-sans text-base text-white">{benefit.title}</h4>
                    <p className="text-xs text-white/55 leading-relaxed mt-2">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
