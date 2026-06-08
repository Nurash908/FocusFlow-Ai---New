import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Trophy, 
  Award, 
  Zap, 
  Lock, 
  Unlock, 
  Users, 
  CheckCircle2, 
  Brain, 
  Sparkles, 
  Gem, 
  ArrowRight, 
  Volume2, 
  Bookmark, 
  Clock 
} from "lucide-react";

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  rarity: "Standard" | "Rare" | "Holographic" | "Legendary";
  icon: string;
  color: string;
  shadowColor: string;
}

interface RankProgress {
  rank: string;
  requiredXpToReach: number;
  unlocked: boolean;
  tag: string;
}

interface ActiveMission {
  id: string;
  name: string;
  progress: number;
  total: number;
  unit: string;
  xpReward: number;
}

export default function Gamification() {
  // Gamification metrics
  const [playerXp, setPlayerXp] = useState<number>(4850);
  const targetXpForNextLevel = 5000;
  
  // Custom states for interactiveness
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>("ach-1");
  const [redeemedVaultId, setRedeemedVaultId] = useState<string[]>(["v-1"]);
  const [isXpGainSimulated, setIsXpGainSimulated] = useState<boolean>(false);

  // Simulated Streak and statistics
  const currentStreak = 14;
  const longestStreak = 32;
  const weeklyConsistency = 92;

  // Achievement Badge options
  const achievementBadges: AchievementBadge[] = [
    { id: "ach-1", name: "First Focus Session", description: "Successfully clocked 45 minutes of uninterrupted brain study.", rarity: "Standard", icon: "🌱", color: "#22c55e", shadowColor: "rgba(34,197,94,0.3)" },
    { id: "ach-2", name: "7-Day Focus Streak", description: "Maintained a cumulative focus session for 7 consecutive calendar dates.", rarity: "Rare", icon: "⚡", color: "#a855f7", shadowColor: "rgba(168,85,247,0.3)" },
    { id: "ach-3", name: "Productivity Master", description: "Acquired a Focus Stability Index of 95% inside the deep work simulator.", rarity: "Holographic", icon: "🧠", color: "#3b82f6", shadowColor: "rgba(59,130,246,0.3)" },
    { id: "ach-4", name: "Deep Work Ninja", description: "Maintained active study telemetry feedback for over 3 hours straight.", rarity: "Holographic", icon: "⚔️", color: "#ec4899", shadowColor: "rgba(236,72,153,0.3)" },
    { id: "ach-5", name: "Focus Champion", description: "Eradicated all incoming social media distractions for 4 whole hours.", rarity: "Legendary", icon: "🏆", color: "#eab308", shadowColor: "rgba(234,179,8,0.3)" }
  ];

  // Daily active missions progression
  const [dailyMissions, setDailyMissions] = useState<ActiveMission[]>([
    { id: "m-1", name: "Study for 60 Minutes", progress: 40, total: 60, unit: "mins", xpReward: 120 },
    { id: "m-2", name: "Complete 3 Focus Assignments", progress: 2, total: 3, unit: "tasks", xpReward: 150 },
    { id: "m-3", name: "Avoid Social Media for 2 Hours", progress: 1.5, total: 2, unit: "hours", xpReward: 200 },
    { id: "m-4", name: "Earn 100 overall platform XP", progress: 65, total: 100, unit: "XP", xpReward: 100 }
  ]);

  // Rank progress definitions
  const rankLadder: RankProgress[] = [
    { rank: "🌱 Focus Rookie", requiredXpToReach: 500, unlocked: true, tag: "Level 1" },
    { rank: "📖 Study Explorer", requiredXpToReach: 1500, unlocked: true, tag: "Level 5" },
    { rank: "⚡ Productivity Achiever", requiredXpToReach: 3000, unlocked: true, tag: "Level 12" },
    { rank: "🧠 Neural Performer", requiredXpToReach: 4500, unlocked: true, tag: "Level 20" },
    { rank: "🔥 Deep Work Elite", requiredXpToReach: 4850, unlocked: true, tag: "Level 27" },
    { rank: "🚀 Focus Champion", requiredXpToReach: 8000, unlocked: false, tag: "Level 40" },
    { rank: "👑 Cognitive Master", requiredXpToReach: 15000, unlocked: false, tag: "Level 60" }
  ];

  // Interactive Live leaderboards
  const leaderboardEntries = [
    { rank: 1, name: "Alex Rover", xp: 15200, streak: 21, score: 98, isMe: false },
    { rank: 2, name: "Sarah Connor", xp: 14850, streak: 18, score: 96, isMe: false },
    { rank: 3, name: "Ethan Hunt", xp: 12100, streak: 16, score: 92, isMe: false },
    { rank: 4, name: "You", xp: 4850, streak: 14, score: 94, isMe: true }
  ];

  // Reward Vault listing
  const rewardVaultItems = [
    { id: "v-1", name: "Cosmic Nebula Theme Skin", desc: "Unlock beautiful space background layouts in focus room.", cost: "Unlocked", isRedeemed: true },
    { id: "v-2", name: "AI Assistant Skin: JARVIS Style", desc: "Equips cybernetic HUD styling for the NEX coach module.", cost: "150 Focus Score", isRedeemed: false },
    { id: "v-3", name: "Special Profile Gold Border Badge", desc: "Unlocks elegant golden highlights around profile card.", cost: "Level 30 Req.", isRedeemed: false },
    { id: "v-4", name: "Exclusive Cognitive Rank Effects", desc: "Holographic ripple waves on center study timer UI.", cost: "250 Achievements", isRedeemed: false }
  ];

  const handleSimulateStudySession = () => {
    setIsXpGainSimulated(true);
    setPlayerXp(prev => {
      const nextXp = prev + 50;
      if (nextXp >= targetXpForNextLevel) {
        return nextXp - targetXpForNextLevel + 100; // Reset level progression rollover mock
      }
      return nextXp;
    });

    setDailyMissions(prev => 
      prev.map(m => m.id === "m-4" ? { ...m, progress: Math.min(m.total, m.progress + 15) } : m)
    );

    setTimeout(() => {
      setIsXpGainSimulated(false);
    }, 1800);
  };

  const handleRedeemVault = (id: string) => {
    if (id === "v-1") return; // always unlocked in demo
    setRedeemedVaultId(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const playerProgressBarPct = (playerXp / targetXpForNextLevel) * 100;

  return (
    <section id="gamification" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070B14] to-[#0A0F1E] border-t border-white/5">
      {/* Visual background details */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#9B6DFF]/10 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 to-transparent blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B6DFF]/10 border border-[#9B6DFF]/30 backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-[#9B6DFF]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9B6DFF]">Premium Leveling Engine</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Turn Focus into levels with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-[#9B6DFF]">Gamified RPG Progression</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans">
            Become the hero of your own syllabus. Earn XP, collect premium holographic badges, and scale historical cognitive rank hierarchies as you crush distraction loops.
          </p>
        </div>

        {/* Bento Dashboard grid configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: Large Profile progression & Streak info (Left - 4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full">
            
            {/* Player Progression HUD Card */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#9B6DFF]/20 transition-all duration-300">
              {/* Highlight background lines */}
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#9B6DFF]/10 blur-2xl rounded-full"></div>

              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-mono text-[#9B6DFF] uppercase tracking-widest font-black block">STUDENT PROFILE AVATAR</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  ID: NEX-2704
                </span>
              </div>

              {/* Player profile core stats */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9B6DFF] via-indigo-500 to-blue-400 p-[1.5px] shadow-lg shadow-[#9B6DFF]/15">
                  <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center font-display text-2xl font-black text-white">
                    🚀
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#9B6DFF] border-2 border-[#070B14] text-[10px] font-mono font-bold text-white flex items-center justify-center">
                    27
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-black text-lg text-white">Deep Work Elite</h4>
                  <span className="text-[10px] font-mono text-white/40 uppercase block mt-0.5">CURRENT RANK LEVEL</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                    <span className="text-xs text-white/70 font-semibold font-mono">Top 10% Weekly Baseline</span>
                  </div>
                </div>
              </div>

              {/* Progress bar details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60">XP Progress to Next Rank Tier</span>
                  <strong className="text-white font-bold">{playerXp} / {targetXpForNextLevel} XP</strong>
                </div>
                
                <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${playerProgressBarPct}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-[#9B6DFF] rounded-full shadow-[0_0_15px_rgba(155,109,255,0.4)]"
                  />
                </div>
                
                <p className="text-[10px] font-medium text-white/35 italic">
                  Complete assignments or focus blocks to rollover onto Level 28.
                </p>
              </div>

              {/* XP simulated triggers */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <button
                  onClick={handleSimulateStudySession}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 and via-indigo-600 to-[#9B6DFF] font-black font-display text-xs tracking-widest uppercase text-white shadow-xl hover:scale-[1.01] transition-all cursor-pointer select-none"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
                    {isXpGainSimulated ? "✦ SYNCING STUDY BLOCK XP (+50 XP) ✦" : "SIMULATE FOCUS COMPLETION"}
                  </span>
                </button>
              </div>
            </div>

            {/* Streak & Consistency indicators with animated fire icon */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-black block mb-4">PRODUCTIVITY STREAK CLUSTER</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl text-center relative overflow-hidden">
                  <span className="absolute -top-10 -right-10 w-20 h-20 bg-orange-500/5 blur-xl rounded-full"></span>
                  <div className="mx-auto w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-[#070B14] hidden">STRK</span>
                  <span className="text-2xl font-black font-mono text-white tracking-tighter block">{currentStreak} Days</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block mt-1">CURRENT STREAK</span>
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl text-center relative overflow-hidden">
                  <span className="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/5 blur-xl rounded-full"></span>
                  <div className="mx-auto w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-black font-mono text-white tracking-tighter block">{longestStreak} Days</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block mt-1">LONGEST STREAK</span>
                </div>
              </div>

              {/* Consistency bar indicator overlay */}
              <div className="mt-4 p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-white/40 block">WEEKLY CONSISTENCY SCORE</span>
                  <span className="text-sm font-black text-white block mt-0.5">{weeklyConsistency}% Match Average</span>
                </div>
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-orange-400">
                  92%
                </div>
              </div>
            </div>

            {/* NEX AI Coach advice block */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <span className="text-[9px] font-mono text-[#4DA3FF] uppercase tracking-widest font-black block mb-3">NEX MOTIVATION DISPATCH</span>
              
              <div className="flex gap-3.5 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 flex items-center justify-center p-[1px] shrink-0">
                  <Brain className="w-5 h-5 text-[#4DA3FF]" />
                </div>
                <p className="text-xs text-white/75 font-mono leading-relaxed">
                  "Only <strong className="text-[#9B6DFF] font-bold">150 XP</strong> remaining until Level 28. Accomplishing one daily task today will instantly promote you onto the next performance ladder!"
                </p>
              </div>
            </div>

          </div>

          {/* COLUMN 2: Milestone badges & daily missions list (Center - 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center bg-[#070B14]/80 border border-white/10 rounded-[3.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* HUD Status design */}
            <div className="w-full flex justify-between items-center z-10 font-mono">
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                Daily Missions Dashboard
              </span>
              <span className="text-[9px] text-white/30 font-semibold uppercase">
                EXP SYSTEM
              </span>
            </div>

            {/* Active missions with visual progress sliders */}
            <div className="w-full z-10 my-6 space-y-4">
              {dailyMissions.map((item) => {
                const itemPercent = (item.progress / item.total) * 100;
                return (
                  <div key={item.id} className="backdrop-blur-sm bg-white/[0.01] border border-white/5 rounded-2xl p-4.5 group hover:border-[#9B6DFF]/15 hover:bg-white/[0.03] transition-all">
                    <div className="flex justify-between items-start mb-2.5">
                      <div>
                        <h5 className="font-display font-medium text-white text-xs">{item.name}</h5>
                        <p className="text-[9px] font-mono text-white/40 mt-0.5">
                          Progress status: {item.progress} / {item.total} {item.unit}
                        </p>
                      </div>

                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full shrink-0">
                        +{item.xpReward} XP
                      </span>
                    </div>

                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${itemPercent}%` }}
                        className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive achievement badge layout */}
            <div className="w-full z-10 pt-4 border-t border-white/5 text-left">
              <span className="text-[9px] font-mono text-[#9B6DFF] uppercase tracking-widest font-black block mb-4">
                HOLOGRAPHIC ACHIEVEMENT BADGES
              </span>

              {/* Achievements flex scroll container */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
                {achievementBadges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedAchievement(badge.id)}
                    className={`py-3 px-4.5 rounded-2xl border text-center transition-all cursor-pointer shrink-0 min-w-[130px] flex flex-col justify-center items-center ${
                      selectedAchievement === badge.id 
                        ? "bg-white/10 border-white/30 scale-[1.03] shadow-lg shadow-black/40" 
                        : "bg-white/[0.01] border-white/5 opacity-60 hover:opacity-100 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div 
                      className="w-13 h-13 rounded-full flex items-center justify-center text-3xl mb-2 transition-transform duration-300"
                      style={{ 
                        background: `radial-gradient(circle, ${badge.color}3a 0%, transparent 70%)`,
                        boxShadow: selectedAchievement === badge.id ? `0 0 20px ${badge.shadowColor}` : "none"
                      }}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-white block truncate w-24 font-display">{badge.name}</span>
                    <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest mt-0.5 block">{badge.rarity}</span>
                  </button>
                ))}
              </div>

              {/* Selected achievement panel rendering */}
              <AnimatePresence mode="wait">
                {selectedAchievement && (
                  <motion.div
                    key={selectedAchievement}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/[0.01] flex gap-3.5 items-center"
                  >
                    {(() => {
                      const selBadge = achievementBadges.find(b => b.id === selectedAchievement);
                      if (!selBadge) return null;
                      return (
                        <>
                          <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 text-2xl flex items-center justify-center shrink-0">
                            {selBadge.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h6 className="font-display font-medium text-white text-xs">{selBadge.name}</h6>
                              <span 
                                className="text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: selBadge.color + "22", color: selBadge.color }}
                              >
                                {selBadge.rarity}
                              </span>
                            </div>
                            <p className="text-[11px] text-white/50 leading-relaxed font-sans mt-0.5">
                              {selBadge.description}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* COLUMN 3: Productivity Rank & Leaderboards & reward Vault (Right - 3 columns) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6 h-full">

            {/* Rank progression visualizer vertical ladder */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <span className="text-[9px] font-mono text-[#9B6DFF] uppercase tracking-widest font-black block mb-4">PRODUCTIVITY RANKS LADDER</span>
              
              <div className="relative border-l border-white/5 pl-4 space-y-3 font-mono text-xs">
                {rankLadder.map((item, idx) => (
                  <div key={idx} className="relative flex justify-between items-center py-0.5">
                    {/* Circle checkpoint */}
                    <span className={`absolute -left-[20.5px] w-2 h-2 rounded-full border ${
                      item.unlocked 
                        ? "bg-[#9B6DFF] border-[#9B6DFF] shadow-[0_0_8px_#9B6DFF]" 
                        : "bg-[#070B14] border-white/20"
                    }`}></span>

                    <span className={`font-semibold ${item.unlocked ? "text-white" : "text-white/30"}`}>
                      {item.rank}
                    </span>
                    
                    <span className="text-[8px] opacity-45 px-1.5 py-0.5 rounded bg-white/5 shrink-0">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily leaderboard system list */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <span className="text-[9px] font-mono text-[#4DA3FF] uppercase tracking-widest font-black block mb-4">TOP COGNITIVE PERFORMERS (WEEKLY)</span>
              
              <div className="space-y-2">
                {leaderboardEntries.map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      user.isMe 
                        ? "bg-[#9B6DFF]/10 border-[#9B6DFF]/25 shadow-lg shadow-[#9B6DFF]/15 scale-[1.01]" 
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold leading-none w-5 h-5 flex items-center justify-center rounded-lg leading-none ${
                        user.rank === 1 ? "bg-amber-400 text-black" : user.rank === 2 ? "bg-white/15 text-white/80" : "text-white/40"
                      }`}>
                        #{user.rank}
                      </span>
                      <span className={`text-xs font-semibold ${user.isMe ? "text-[#4DA3FF]" : "text-white"}`}>
                        {user.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-white/40 block">🔥 {user.streak}d</span>
                      <strong className="text-white font-black">{user.xp.toLocaleString()} XP</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reward Vault unlocks showcase drawer */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-black block mb-4 font-bold">REWARD VAULT UNLOCKS</span>
                
                <div className="space-y-2.5">
                  {rewardVaultItems.map((vt) => {
                    const isRedeemed = redeemedVaultId.includes(vt.id);
                    return (
                      <div
                        key={vt.id}
                        onClick={() => handleRedeemVault(vt.id)}
                        className={`p-2.5 border rounded-2xl cursor-pointer hover:bg-white/5 transition-all flex justify-between items-center ${
                          isRedeemed 
                            ? "bg-[#9B6DFF]/5 border-[#9B6DFF]/25 opacity-70" 
                            : "bg-white/[0.01] border-white/5"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-white block truncate w-32 font-display">{vt.name}</span>
                          </div>
                          <span className="text-[9px] text-white/40 block leading-relaxed mt-0.5 truncate w-40">{vt.desc}</span>
                        </div>

                        <span className={`text-[10px] font-mono font-bold tracking-wider shrink-0 px-2 py-0.5 rounded-full ${
                          isRedeemed ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                        }`}>
                          {isRedeemed ? "ACTIVE" : vt.cost}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status details overlay */}
              <div className="bg-[#9B6DFF]/5 border border-[#9B6DFF]/15 p-3 rounded-2xl flex items-center justify-between mt-4">
                <div>
                  <span className="text-[8px] font-mono text-white/30 block uppercase font-bold">ACHIEVEMENTS PROGRESS</span>
                  <span className="text-xs font-black text-white mt-0.5">5 Holographic Items Collected</span>
                </div>
                <Gem className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
