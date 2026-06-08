import { motion } from "motion/react";
import { BadgeCheck, Sparkles } from "lucide-react";

export default function BusinessModel() {
  const tiers = [
    {
      name: "Free Tier",
      price: "$0",
      desc: "Perfect for students reclaiming baseline daily discipline.",
      features: [
        "Core Mobile & Desktop Focus Tools",
        "Standard Session Audio Visualizers",
        "XP Points & Silver Achievement Ranks",
        "Limited Weekly NEX Assistant Chat Insights"
      ],
      popular: false
    },
    {
      name: "Pro Premium",
      price: "$4.99",
      period: "/ mo",
      desc: "Comprehensive deep work toolkit for peak conceptual execution.",
      features: [
        "Unlimited Immersive Lock-In Sprints",
        "Biometric Bio-Feedback Integration",
        "Unlimited Custom Prompt Coach NEX AI",
        "Holographic Metallic Rare badges & Gold Leaderboards",
        "Exportable high-yield attention score records"
      ],
      popular: true
    },
    {
      name: "Districts & Schools",
      price: "Custom",
      desc: "For entire classroom setups and district-wide attention metrics.",
      features: [
        "Enterprise Classroom Portals for Teachers",
        "Unified Student attention and volatility alerts",
        "COPPA & FERPA secure database models",
        "Custom administrative reporting & training support",
        "24/7 dedicated school coordinator concierge"
      ],
      popular: false
    }
  ];

  return (
    <section id="billing" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#101827]/40">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4DA3FF]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-[#9B6DFF] uppercase">PRODUCT STRUCTURE</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight">
            Subscription Models
          </h2>
          <p className="text-lg text-white/50 mt-4 font-sans">
            Whether you are an independent student fighting cognitive lag or a school looking to secure classroom discipline, we have custom tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`backdrop-blur-2xl bg-white/[0.02] border rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${tier.popular ? "border-[#4DA3FF]/50 bg-gradient-to-b from-[#4DA3FF]/5 to-[#9B6DFF]/5" : "border-white/5"}`}
            >
              {/* Highlight badge for popular plans */}
              {tier.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#4DA3FF]/20 text-[#4DA3FF] border border-[#4DA3FF]/40 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" />
                  PEAK VALUE
                </div>
              )}

              <div>
                <span className="text-sm font-semibold tracking-wide text-white/50 uppercase font-mono block mb-2">{tier.name}</span>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-bold font-display text-white">{tier.price}</span>
                  {tier.period && <span className="text-xs text-white/40">{tier.period}</span>}
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans mb-8">
                  {tier.desc}
                </p>

                <div className="w-full h-[1px] bg-white/5 mb-8"></div>

                <div className="space-y-4">
                  {tier.features.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <BadgeCheck className="w-4 h-4 text-[#4DA3FF] shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 font-sans leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${tier.popular ? "bg-[#4DA3FF] hover:bg-[#4DA3FF]/90 text-black shadow-[0_4px_25px_rgba(77,163,255,0.4)]" : "bg-white/5 hover:bg-white/10 text-white border border-white/5"}`}>
                  {tier.price === "Custom" ? "Contact District Coordinator" : "Acquire Access Module"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
