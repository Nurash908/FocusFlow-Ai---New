import { motion } from "motion/react";
import { ShieldAlert, Zap, Radio, Trophy, Monitor, Cpu, Sparkles, BookOpen } from "lucide-react";

export default function Solution() {
  const features = [
    {
      icon: Cpu,
      title: "AI Focus Tracking",
      desc: "Autonomously monitors study behavior, identifies personalized focus zones, and predicts distraction risks.",
      badge: "Self-Learning"
    },
    {
      icon: Radio,
      title: "Lock-In Focus Mode",
      desc: "A cognitive-isolated environment that minimizes distractions and optimizes mental flow.",
      badge: "Immersion"
    },
    {
      icon: ShieldAlert,
      title: "Brain Rot Meter",
      desc: "Measures and scores your daily digital diet against dopamine-damaging feeds (Shorts/TikToks).",
      badge: "Viral Feature"
    },
    {
      icon: Trophy,
      title: "Gamified Productivity",
      desc: "Turn study grinds into epic quests. Unlock badges, level up profiles, and build durable streaks.",
      badge: "Dopamine Shift"
    },
    {
      icon: Sparkles,
      title: "NEX Assistant",
      desc: "Our resident neural guide who triggers right when user discipline wavers, steering focus back.",
      badge: "Core Companion"
    },
    {
      icon: BookOpen,
      title: "Cognitive Gym",
      desc: "Daily training routines tailored to help modern students rebuild decimated attention spans.",
      badge: "Attention Rehab"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-cyan-400 uppercase">THE SYSTEM</div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight">
            Meet FocusFlow AI
          </h2>
          <p className="text-lg text-white/50 mt-4">
            An advanced cognitive operating system that adapts to student behaviors in real time, making deep work effortless and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="backdrop-blur-2xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/30 transition-all"
              >
                {/* Glowing subtle background reflection */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-[#4DA3FF]/10 to-[#9B6DFF]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#4DA3FF]/50 group-hover:bg-[#4DA3FF]/10 transition-colors">
                    <IconComponent className="w-6 h-6 text-white group-hover:text-[#4DA3FF] transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase border border-white/5 px-2.5 py-1 rounded-full bg-white/[0.01]">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-3 tracking-wide">{feat.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
