import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  TrendingUp,
  Zap,
  Clock,
  Activity,
  Flame,
  Target,
  Award,
  Compass,
  PieChart,
  Calendar,
  Shield,
  Grid,
  ArrowUpRight,
  Sparkles,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface DailyData {
  day: string;
  fullName: string;
  score: number;
  duration: string; // e.g. "4h 21m"
  hours: number;
  growth: string;
  distractions: string;
  bestWindow: string;
  insight: string;
}

interface HeatmapCell {
  day: string;
  hour: string;
  intensity: number; // 0 to 4
  focusRate: number; // percentage
}

interface DistractionItem {
  name: string;
  percentage: number;
  color: string;
  glow: string;
  icon: string;
}

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  xp: number;
  glow: string;
  unlocked: boolean;
  icon: string;
}

export default function AIAnalyticsDashboard() {
  // ------------------------------------------
  // IN-APP INTERACTIVE STATES
  // ------------------------------------------
  const [selectedDay, setSelectedDay] = useState<number>(3); // Defaulting to Thursday
  const [activeTab, setActiveTab] = useState<"overview" | "heatmap" | "distractions" | "forecast">("overview");
  const [isHoveredInsight, setIsHoveredInsight] = useState<number | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  const [heatmapTimeFilter, setHeatmapTimeFilter] = useState<"all" | "peak" | "low">("all");
  const [growthSim, setGrowthSim] = useState<number>(91); // Simulated Focus Score Counter
  const [achievementSort, setAchievementSort] = useState<boolean>(true);

  // Generate random particles for futuristic ambient stream background
  useEffect(() => {
    const list = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10,
    }));
    setParticles(list);
  }, []);

  // Soft incremental counter mock effect to showcase dynamic reactivity
  useEffect(() => {
    const interval = setInterval(() => {
      setGrowthSim(prev => {
        const offset = Math.random() > 0.5 ? 1 : -1;
        const next = prev + offset;
        return next > 95 ? 91 : next < 88 ? 91 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------
  // RICH DATASETS
  // ------------------------------------------
  const weeklyTrendData: DailyData[] = [
    {
      day: "Mon",
      fullName: "Monday",
      score: 72,
      duration: "3h 15m",
      hours: 3.25,
      growth: "+5%",
      distractions: "Moderate",
      bestWindow: "2:00 PM – 3:30 PM",
      insight: "Monday sluggishness detected. Visual context switching increased in the afternoon."
    },
    {
      day: "Tue",
      fullName: "Tuesday",
      score: 84,
      duration: "4h 05m",
      hours: 4.08,
      growth: "+11%",
      distractions: "Low",
      bestWindow: "10:00 AM – 11:30 AM",
      insight: "Morning focus session was exceptionally streamlined. Dopamine decay was minimal."
    },
    {
      day: "Wed",
      fullName: "Wednesday",
      score: 68,
      duration: "2h 50m",
      hours: 2.83,
      growth: "-4%",
      distractions: "High Leakage",
      bestWindow: "7:30 PM – 8:45 PM",
      insight: "Wednesday screen rot alert. Screen logs state 14 interruptions via short videos."
    },
    {
      day: "Thu",
      fullName: "Thursday (Today)",
      score: 91,
      duration: "4h 21m",
      hours: 4.35,
      growth: "+18%",
      distractions: "Low Focus Leak",
      bestWindow: "7:00 PM – 8:30 PM",
      insight: "Excellent prefrontal integration today. Completed 4 structured sessions successfully."
    },
    {
      day: "Fri",
      fullName: "Friday",
      score: 79,
      duration: "3h 40m",
      hours: 3.66,
      growth: "+7%",
      distractions: "Moderate",
      bestWindow: "1:00 PM – 2:30 PM",
      insight: "Consistency held solid. Evening wind-down triggered a brief screen drop."
    },
    {
      day: "Sat",
      fullName: "Saturday",
      score: 95,
      duration: "5h 15m",
      hours: 5.25,
      growth: "+22%",
      distractions: "Extremely Low",
      bestWindow: "9:00 AM – 11:30 AM",
      insight: "Mastery achievement. Long uninterrupted deep-concept blocks without device leakage."
    },
    {
      day: "Sun",
      fullName: "Sunday",
      score: 88,
      duration: "4h 45m",
      hours: 4.75,
      growth: "+15%",
      distractions: "Low",
      bestWindow: "6:00 PM – 7:30 PM",
      insight: "Great homework completion velocity. Active retrieval recall was exceptionally high."
    },
  ];

  // Most productive hours heatmap cells (6 AM -> 12 AM)
  const heatmapData: HeatmapCell[] = [
    // Morning 6 AM - 12 PM
    { day: "Mon", hour: "06:00 - 09:00", intensity: 1, focusRate: 45 },
    { day: "Mon", hour: "09:00 - 12:00", intensity: 3, focusRate: 75 },
    { day: "Tue", hour: "06:00 - 09:00", intensity: 2, focusRate: 58 },
    { day: "Tue", hour: "09:00 - 12:00", intensity: 4, focusRate: 92 },
    { day: "Wed", hour: "06:00 - 09:00", intensity: 1, focusRate: 35 },
    { day: "Wed", hour: "09:00 - 12:00", intensity: 2, focusRate: 60 },
    { day: "Thu", hour: "06:00 - 09:00", intensity: 3, focusRate: 80 },
    { day: "Thu", hour: "09:00 - 12:00", intensity: 4, focusRate: 94 },
    { day: "Fri", hour: "06:00 - 09:00", intensity: 2, focusRate: 64 },
    { day: "Fri", hour: "09:00 - 12:00", intensity: 3, focusRate: 78 },
    { day: "Sat", hour: "06:00 - 09:00", intensity: 4, focusRate: 96 },
    { day: "Sat", hour: "09:00 - 12:00", intensity: 4, focusRate: 98 },
    { day: "Sun", hour: "06:00 - 09:00", intensity: 3, focusRate: 82 },
    { day: "Sun", hour: "09:00 - 12:00", intensity: 4, focusRate: 90 },

    // Afternoon 12 PM - 6 PM
    { day: "Mon", hour: "12:00 - 15:00", intensity: 2, focusRate: 55 },
    { day: "Mon", hour: "15:00 - 18:00", intensity: 1, focusRate: 40 },
    { day: "Tue", hour: "12:00 - 15:00", intensity: 3, focusRate: 72 },
    { day: "Tue", hour: "15:00 - 18:00", intensity: 2, focusRate: 61 },
    { day: "Wed", hour: "12:00 - 15:00", intensity: 1, focusRate: 30 },
    { day: "Wed", hour: "15:00 - 18:00", intensity: 1, focusRate: 28 }, // Wednesday low
    { day: "Thu", hour: "12:00 - 15:00", intensity: 3, focusRate: 81 },
    { day: "Thu", hour: "15:00 - 18:00", intensity: 2, focusRate: 68 },
    { day: "Fri", hour: "12:00 - 15:00", intensity: 2, focusRate: 59 },
    { day: "Fri", hour: "15:00 - 18:00", intensity: 2, focusRate: 55 },
    { day: "Sat", hour: "12:00 - 15:00", intensity: 3, focusRate: 88 },
    { day: "Sat", hour: "15:00 - 18:00", intensity: 3, focusRate: 85 },
    { day: "Sun", hour: "12:00 - 15:00", intensity: 3, focusRate: 84 },
    { day: "Sun", hour: "15:00 - 18:00", intensity: 3, focusRate: 80 },

    // Evening 6 PM - 9 PM (PEAK!)
    { day: "Mon", hour: "18:00 - 21:00", intensity: 3, focusRate: 82 },
    { day: "Tue", hour: "18:00 - 21:00", intensity: 4, focusRate: 91 },
    { day: "Wed", hour: "18:00 - 21:00", intensity: 2, focusRate: 65 },
    { day: "Thu", hour: "18:00 - 21:00", intensity: 4, focusRate: 95 }, // Thursday peak
    { day: "Fri", hour: "18:00 - 21:00", intensity: 3, focusRate: 84 },
    { day: "Sat", hour: "18:00 - 21:00", intensity: 4, focusRate: 92 },
    { day: "Sun", hour: "18:00 - 21:00", intensity: 4, focusRate: 93 },

    // Late Night 9 PM - 12 AM
    { day: "Mon", hour: "21:00 - 00:00", intensity: 2, focusRate: 60 },
    { day: "Tue", hour: "21:00 - 00:00", intensity: 3, focusRate: 75 },
    { day: "Wed", hour: "21:00 - 00:00", intensity: 3, focusRate: 70 },
    { day: "Thu", hour: "21:00 - 00:00", intensity: 4, focusRate: 90 },
    { day: "Fri", hour: "21:00 - 00:00", intensity: 2, focusRate: 62 },
    { day: "Sat", hour: "21:00 - 00:00", intensity: 3, focusRate: 80 },
    { day: "Sun", hour: "21:00 - 00:00", intensity: 3, focusRate: 78 }
  ];

  // Distractions Data
  const distractionAnalysis: DistractionItem[] = [
    { name: "Social Media", percentage: 42, color: "from-purple-500 to-indigo-500", glow: "shadow-purple-500/20", icon: "📱" },
    { name: "Gaming", percentage: 18, color: "from-pink-500 to-rose-500", glow: "shadow-rose-500/20", icon: "🎮" },
    { name: "Random Browsing", percentage: 15, color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20", icon: "🌐" },
    { name: "Messaging Apps", percentage: 12, color: "from-teal-400 to-emerald-500", glow: "shadow-emerald-500/20", icon: "💬" },
    { name: "Other Interrupts", percentage: 13, color: "from-amber-400 to-orange-500", glow: "shadow-amber-500/20", icon: "⚠️" }
  ];

  // AI-Generated Insights
  const aiInsights = [
    { id: 1, text: "Your focus improved by 14% this week.", type: "achievement", highlight: "14%" },
    { id: 2, text: "Distractions are lowest during evening study sessions.", type: "tip", highlight: "evening" },
    { id: 3, text: "Completing one more focus session today could increase your productivity score.", type: "boost", highlight: "one more" },
    { id: 4, text: "Your consistency is improving steadily.", type: "trend", highlight: "steadily" }
  ];

  // Achievement Badges
  const badges: AchievementBadge[] = [
    { id: "b1", name: "Deep Work Elite", description: "Maintained >90% focus score for 5 consecutive blocks.", xp: 1000, glow: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20", unlocked: true, icon: "👑" },
    { id: "b2", name: "Dopamine Anchor", description: "Zero distraction leakage detected across a 3-hour stretch.", xp: 750, glow: "border-purple-500/30 text-purple-400 bg-purple-950/20", unlocked: true, icon: "⚓" },
    { id: "b3", name: "Circadian Master", description: "Studied consistently inside your target peak bio-windows.", xp: 600, glow: "border-indigo-500/30 text-indigo-400 bg-indigo-950/20", unlocked: true, icon: "🌅" },
    { id: "b4", name: "Synaptic Titan", description: "Achieved the highest global leaderboards rank this week.", xp: 1200, glow: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20", unlocked: false, icon: "⚡" },
    { id: "b5", name: "Prefrontal Shield", description: "Completed a 48H social media detox sequence.", xp: 500, glow: "border-amber-500/30 text-amber-400 bg-amber-950/20", unlocked: true, icon: "🛡️" },
    { id: "b6", name: "Epic Consistency", description: "Logged a consecutive 18-day study streak block.", xp: 1500, glow: "border-rose-500/30 text-rose-400 bg-rose-950/20", unlocked: true, icon: "🔥" }
  ];

  // Curating the focus score graph coordinates
  const graphWidth = 500;
  const graphHeight = 160;
  const paddingX = 40;
  const paddingY = 24;
  const chartPoints = weeklyTrendData.map((d, i) => {
    const segmentWidth = (graphWidth - paddingX * 2) / (weeklyTrendData.length - 1);
    const x = paddingX + i * segmentWidth;
    // Score mapped from 0-100 down to graph bounds
    const y = graphHeight - paddingY - (d.score / 100) * (graphHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const neonLinePath = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillCurvePath = `${neonLinePath} L ${chartPoints[chartPoints.length - 1].x} ${graphHeight} L ${chartPoints[0].x} ${graphHeight} Z`;

  // Filtered heatmap rendering
  const getFilteredCells = () => {
    switch (heatmapTimeFilter) {
      case "peak":
        return heatmapData.filter(c => c.focusRate >= 80);
      case "low":
        return heatmapData.filter(c => c.focusRate < 50);
      default:
        return heatmapData;
    }
  };

  return (
    <div id="analytics-core" className="py-12 relative overflow-hidden text-white w-full">
      {/* 🌌 Space Gradients and Neural Matrix Backgrounds */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-indigo-600/5 blur-[180px] pointer-events-none rounded-full animate-pulse" style={{ animationDuration: "14s" }}></div>
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute top-10 left-[-15%] w-[600px] h-[600px] bg-purple-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      {/* Floating Particles Sparkle Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400 opacity-20 animate-ping"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${12 + p.delay}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ==========================================
            🌌 SCREEN INTRO
            ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4DA3FF]">AUTOMATED BIOMETRIC CORRELATIONS</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4DA3FF] to-[#9B6DFF] drop-shadow-[0_0_20px_rgba(77,163,255,0.2)]">Analytics Dashboard</span>
          </h2>
          
          <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans font-medium">
            Understand your productivity like never before. Reconstruct cognitive flow cycles, audit attention leakage, and visualize predictions crafted by the active FocusFlow Operating System.
          </p>
        </div>

        {/* ==========================================
            🎯 MASTER WORKSPACE BENTO GRID LAYOUT
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ==========================================
              📱 LEFT SIDE: Luxury Glassmorphism Mobile Frame Mockup
              ========================================== */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center">
            
            <div className="relative w-full max-w-[395px] aspect-[9/19] bg-[#0A0E1A]/95 border-[8px] border-white/10 rounded-[3.2rem] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between" id="analytics-mobile-mockup">
              
              {/* Phone Status / Camera Notch bar */}
              <div className="relative z-20 px-8 pt-4 pb-2 flex justify-between items-center text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-1.5 font-bold">
                  <span>15:26</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></div>
                </div>
                {/* Simulated Notch Island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#030712] rounded-full border border-white/5 flex items-center justify-center">
                  <span className="text-[7.5px] font-mono font-extrabold text-[#4DA3FF] tracking-wider uppercase">CORE COGNITION</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>93% OS</span>
                  <div className="w-5 h-2.5 bg-cyan-500/20 border border-cyan-400/30 rounded p-0.5 flex">
                    <div className="h-full bg-cyan-400 w-[80%] rounded-xs"></div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Interface Tabs */}
              <div className="px-5 pt-3 shrink-0 relative bg-gradient-to-b from-white/[0.02] to-transparent">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-[8px] font-mono text-white/40 uppercase font-black">STUDENT IDENTITY CODE: #944N</span>
                    <h3 className="font-display text-lg font-black text-white leading-none">Nurash&apos;s OS Feed</h3>
                  </div>
                  <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                  </div>
                </div>

                {/* Sub tabs inside mobile screen */}
                <div className="flex gap-1.5 mt-3 border-b border-white/5 pb-2.5 overflow-x-auto scrollbar-none">
                  {[
                    { id: "overview", label: "Overview", icon: Calendar },
                    { id: "heatmap", label: "Heatmap", icon: Grid },
                    { id: "distractions", label: "Distractions", icon: PieChart },
                    { id: "forecast", label: "Forecast prediction", icon: TrendingUp }
                  ].map(tab => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-extrabold flex items-center gap-1.5 shrink-0 transition-all select-none cursor-pointer ${activeTab === tab.id ? "bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]" : "bg-white/[0.01] border border-transparent text-white/50 hover:text-white"}`}
                      >
                        <TabIcon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Core Render Viewport */}
              <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {/* TAB 1: PRODUCTIVITY OVERVIEW VIEWPORT */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      {/* Productivity Overview Title banner */}
                      <div className="bg-gradient-to-r from-[#4DA3FF]/10 to-[#9B6DFF]/10 border border-white/10 rounded-2xl p-4 relative overflow-hidden">
                        <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-cyan-400/5 blur-xl rounded-full"></div>
                        <span className="text-[8px] font-mono text-cyan-400 font-bold block mb-1">COGNITIVE RATIO DATA</span>
                        
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs font-semibold text-white/70">Today&apos;s Focus Score</h4>
                          <span className="text-xl font-black font-display text-white">{growthSim}%</span>
                        </div>
                        
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-2 border border-white/5">
                          <motion.div 
                            className="bg-gradient-to-r from-cyan-400 to-[#9B6DFF] h-full"
                            style={{ width: `${growthSim}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-[9px] font-mono text-white/40 mt-1.5 font-bold">
                          <span>SYSTEM GOAL: 90%</span>
                          <span className="text-cyan-400 flex items-center gap-0.5 font-black uppercase">Outstanding Progress <Flame className="w-3 h-3 text-orange-500 animate-pulse" /></span>
                        </div>
                      </div>

                      {/* Small Metric list widgets */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col justify-between h-20 hover:border-cyan-400/20 transition-all cursor-pointer">
                          <span className="text-[9px] font-mono text-white/40 uppercase">Productivity Health</span>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-lg font-bold font-display text-emerald-400">94%</span>
                            <span className="text-[8px] text-emerald-400/70 font-mono">+2%</span>
                          </div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col justify-between h-20 hover:border-[#9B6DFF]/20 transition-all cursor-pointer">
                          <span className="text-[9px] font-mono text-white/40 uppercase">Weekly Growth</span>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-lg font-bold font-display text-cyan-400">+18%</span>
                            <span className="text-[8px] text-cyan-400/70 font-mono">Steady</span>
                          </div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col justify-between h-20 hover:border-red-500/20 transition-all cursor-pointer">
                          <span className="text-[9px] font-mono text-white/40 uppercase">Distraction Drop</span>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-lg font-bold font-display text-pink-400">-22%</span>
                            <span className="text-[8px] text-pink-400/70 font-mono">Optimal</span>
                          </div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col justify-between h-20 hover:border-amber-400/20 transition-all cursor-pointer">
                          <span className="text-[9px] font-mono text-white/40 uppercase">Daily Streak</span>
                          <div className="flex items-baseline gap-1 mt-1.5">
                            <span className="text-lg font-bold font-display text-amber-400">18 Days</span>
                            <span className="text-[8px] text-amber-400/70 font-mono">Record</span>
                          </div>
                        </div>
                      </div>

                      {/* Small Quick-Trigger graph preview */}
                      <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-3 pb-1 shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono text-white/50 block font-bold uppercase">Weekly Trend Curve</span>
                          <span className="text-[8px] font-mono text-cyan-400">Thursday selected</span>
                        </div>
                        {/* Compact Spark Path SVG */}
                        <div className="h-14 w-full bg-black/30 rounded-xl overflow-hidden p-1 relative border border-white/5">
                          <svg className="w-full h-full text-white/10" viewBox="0 0 300 60" preserveAspectRatio="none">
                            <path
                              d="M 10 45 Q 60 40 100 20 T 200 35 T 290 10"
                              fill="none"
                              stroke="url(#sparkGrad)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            <circle cx="100" cy="20" r="3.5" fill="#4DA3FF" className="animate-ping" style={{ transformOrigin: "100px 20px" }} />
                            <circle cx="100" cy="20" r="2" fill="#fff" />
                            <defs>
                              <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#4DA3FF" />
                                <stop offset="100%" stopColor="#9B6DFF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        {/* Day letters row */}
                        <div className="flex justify-between text-[8px] font-mono text-white/30 pt-1">
                          {["M", "T", "W", "T", "F", "S", "S"].map((d, index) => (
                            <span key={index} className={index === selectedDay ? "text-cyan-400 font-bold" : ""}>{d}</span>
                          ))}
                        </div>
                      </div>

                      {/* AI Advice Center preview */}
                      <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-3.5 flex gap-2.5 items-start">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                        <div>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#4DA3FF] uppercase block">NEX COGNITIVE DECODER</span>
                          <p className="text-[10px] text-white/70 leading-normal font-sans font-medium mt-1">
                            &quot;Jordan, your highest productivity periods occurs between 6 PM and 8 PM. Revision metrics improve by 18% during these windows.&quot;
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: PRODUCTIVITY HEATMAP VIEWPORT */}
                  {activeTab === "heatmap" && (
                    <motion.div
                      key="heatmap"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center bg-black/40 p-2 border border-white/5 rounded-xl mb-1">
                        <span className="text-[9px] font-mono text-white/40 uppercase font-black">Peak bio-hourly map</span>
                        <div className="flex gap-1">
                          {(["all", "peak", "low"] as const).map(f => (
                            <button
                              key={f}
                              onClick={() => setHeatmapTimeFilter(f)}
                              className={`px-1.5 py-0.5 rounded text-[8px] font-mono capitalize tracking-tight select-none cursor-pointer ${heatmapTimeFilter === f ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold" : "text-white/40 hover:text-white"}`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Compact Heatgrid matrix */}
                      <div className="space-y-2 border border-white/5 bg-white/[0.01] p-3 rounded-2xl relative overflow-hidden">
                        <div className="grid grid-cols-5 gap-1.5 font-mono text-[8px] text-white/40 pb-1.5 border-b border-white/5 text-center font-bold">
                          <span>Day</span>
                          <span>06-09</span>
                          <span>09-12</span>
                          <span>12-15</span>
                          <span>18-21</span>
                        </div>

                        <div className="space-y-1.5 pt-1.5 text-center">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName, idx) => {
                            const cells = heatmapData.filter(c => c.day === dayName);
                            return (
                              <div key={dayName} className="grid grid-cols-5 gap-1.5 items-center font-mono">
                                <span className={`text-[9px] text-left font-bold ${idx === selectedDay ? "text-cyan-400 font-extrabold" : "text-white/50"}`}>{dayName}</span>
                                {cells.slice(0, 4).map((c, cellIdx) => {
                                  // Intensity settings for glows
                                  const colorClass = 
                                    c.intensity === 4 ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" :
                                    c.intensity === 3 ? "bg-[#4DA3FF] opacity-80" :
                                    c.intensity === 2 ? "bg-indigo-500/60" :
                                    "bg-indigo-950/40 border border-indigo-900/40";
                                  
                                  return (
                                    <div
                                      key={cellIdx}
                                      onClick={() => {
                                        setSelectedDay(idx);
                                        // Trigger small haptic alert or custom insight
                                      }}
                                      title={`Focus Rate: ${c.focusRate}%`}
                                      className={`h-4.5 rounded transition-all cursor-pointer hover:scale-110 flex items-center justify-center ${colorClass}`}
                                    >
                                      {c.intensity >= 3 && <span className="text-[6.5px] font-black text-black">⚡</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Legend explanation */}
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 pt-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-cyan-400"></div>
                          <span>Peak Flow (&gt;90%)</span>
                        </div>
                        <span className="italic">Click cells to sync trends</span>
                      </div>

                      {/* AI Heatmap Insight box */}
                      <div className="p-3 bg-gradient-to-r from-cyan-950/20 to-purple-950/15 border border-cyan-500/20 rounded-2xl shadow-xl">
                        <span className="text-[8px] font-mono text-cyan-400 font-black tracking-widest block uppercase">NEURAL BIO-FREQUENCY INSIGHT</span>
                        <p className="text-[10px] text-white/80 font-sans leading-normal mt-1 font-medium select-none">
                          Your biological consistency matches Thursday and Saturday peak circadian orbits. Your prefrontal core operates best above 40Hz sound cycles.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: DISTRACTION ANALYSIS VIEWPORT */}
                  {activeTab === "distractions" && (
                    <motion.div
                      key="distractions"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="space-y-4"
                    >
                      <span className="text-[9px] font-mono text-white/40 uppercase block font-bold mb-1">Top Distractions Audit logs:</span>
                      
                      {/* Concordant circular ring representing distraction shares */}
                      <div className="flex items-center justify-center py-1 mt-1">
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          {/* Simulated SVG concentric segment rings */}
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100 animate-pulse">
                            {/* Base track */}
                            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.02)" strokeWidth="6" fill="none" />
                            {/* Layer 1 (Social Media 42%) */}
                            <circle cx="50" cy="50" r="40" stroke="#a855f7" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="145.7" strokeLinecap="round" />
                            {/* Layer 2 (Gaming 18%) */}
                            <circle cx="50" cy="50" r="32" stroke="#ec4899" strokeWidth="7" fill="none" strokeDasharray="201.0" strokeDashoffset="164.8" strokeLinecap="round" />
                            {/* Layer 3 (Random Browsing 15%) */}
                            <circle cx="50" cy="50" r="24" stroke="#3b82f6" strokeWidth="6" fill="none" strokeDasharray="150.7" strokeDashoffset="128.1" strokeLinecap="round" />
                          </svg>
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-[8px] font-mono text-white/40 block">TOTAL LEAK</span>
                            <span className="text-sm font-black text-purple-400 font-display">42% Max</span>
                          </div>
                        </div>
                      </div>

                      {/* Small list details */}
                      <div className="space-y-2 pt-1">
                        {distractionAnalysis.slice(0, 4).map((distItem, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2 rounded-xl text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{distItem.icon}</span>
                              <span className="text-white/70 font-semibold">{distItem.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${distItem.color}`} style={{ width: `${distItem.percentage}%` }}></div>
                              </div>
                              <span className="font-extrabold text-white text-[10px]">{distItem.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-pink-500/5 p-3 rounded-xl border border-pink-500/25 flex gap-2 items-center text-left">
                        <span className="text-base text-pink-400 shrink-0">🚨</span>
                        <p className="text-[9.5px] leading-normal font-sans text-pink-200 font-medium">
                          <strong>Wednesday Distraction Spike:</strong> TikTok app requests increased by 23% following study logs math sequences.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: FORECAST PREDICTIONS VIEWPORT */}
                  {activeTab === "forecast" && (
                    <motion.div
                      key="forecast"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="space-y-4"
                    >
                      <div className="bg-gradient-to-r from-cyan-950/20 to-[#9B6DFF]/15 border border-white/10 rounded-2xl p-4 text-center select-none relative">
                        <div className="absolute top-2 left-2">
                          <Cpu className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                        </div>
                        <span className="text-[8px] font-mono text-[#4DA3FF] font-black tracking-widest block uppercase">PREDICTIVE STREAMS PROJECTION</span>
                        
                        <div className="text-3xl font-display font-black text-white mt-1.5">95% score</div>
                        <span className="text-[9px] font-mono text-emerald-400 tracking-wider">EXPECTED NEXT WEEK AT MOMENTUM STABLE</span>

                        <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[9px] text-white/50 text-left">
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl">
                            <span className="block text-[7.5px] uppercase">Est. study time</span>
                            <strong className="text-white text-xs mt-0.5 block">24.5 Hours</strong>
                          </div>
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl">
                            <span className="block text-[7.5px] uppercase font-bold text-emerald-400 flex items-center gap-0.5">Risk Vector 🛡️</span>
                            <strong className="text-white text-xs mt-0.5 block">Extremely Low</strong>
                          </div>
                        </div>
                      </div>

                      {/* Forecast interactive items list */}
                      <div className="space-y-2 font-mono text-[10px]">
                        {[
                          { parameter: "Dopamine Resilience Index", status: "Nominal", value: "+12.4%", col: "text-emerald-400" },
                          { parameter: "Memory Retention Index", status: "Increasing", value: "+8%", col: "text-cyan-400" },
                          { parameter: "Melatonin Circadian Deficit", status: "None", value: "Optimal", col: "text-purple-400" }
                        ].map((proj, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                            <span className="text-white/60">{proj.parameter}</span>
                            <div className="text-right">
                              <span className={`font-semibold ${proj.col} block`}>{proj.value}</span>
                              <span className="text-[8.5px] text-white/30 block mt-0.5">{proj.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[9px] font-mono text-center text-white/40 uppercase">
                        Predicted matches 98.4% compared against cumulative database averages
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Mobile device bottom bar area */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 backdrop-blur-md shrink-0 relative z-20">
                <div className="flex justify-around items-center text-white/50">
                  <div className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-white ${activeTab === 'overview' ? 'text-[#4DA3FF]' : ''}`} onClick={() => setActiveTab('overview')}>
                    <Calendar className="w-4 h-4" />
                    <span className="text-[8px] font-mono">Overview</span>
                  </div>
                  <div className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-white ${activeTab === 'heatmap' ? 'text-[#4DA3FF]' : ''}`} onClick={() => setActiveTab('heatmap')}>
                    <Grid className="w-4 h-4" />
                    <span className="text-[8px] font-mono">Heatmap</span>
                  </div>
                  <div className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-white ${activeTab === 'distractions' ? 'text-[#4DA3FF]' : ''}`} onClick={() => setActiveTab('distractions')}>
                    <PieChart className="w-4 h-4" />
                    <span className="text-[8px] font-mono">Leakage</span>
                  </div>
                  <div className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-white ${activeTab === 'forecast' ? 'text-[#4DA3FF]' : ''}`} onClick={() => setActiveTab('forecast')}>
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[8px] font-mono">Forecast</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              📊 RIGHT SIDE: Full desktop-bento grid system of insights & forecasts
              ========================================== */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Row 1: Large interactive Focus Trend Graph */}
            <div className="backdrop-blur-3xl bg-[#090D1A]/60 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden" id="analytics-master-graph-card">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#4DA3FF]/5 blur-2xl rounded-full"></div>
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5 border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#4DA3FF] font-black uppercase tracking-wider block">INTERACTIVE HISTORICAL COGNITION COMPASS</span>
                  <h4 className="font-display font-bold text-xl text-white mt-1">Focus Trend Graph Chart</h4>
                </div>
                
                <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-xl text-center select-none shrink-0">
                  <span className="text-[8px] font-mono text-white/45 block">Selected Day Metric</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {weeklyTrendData[selectedDay].fullName} (Score: {weeklyTrendData[selectedDay].score}%)
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Plotting chart with complete precision */}
              <div className="relative h-44 w-full bg-black/35 rounded-2xl border border-white/5 p-3 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="40" y1="24" x2="460" y2="24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3;" />
                  <line x1="40" y1="80" x2="460" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="40" y1="136" x2="460" y2="136" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Gradient Back Fill */}
                  <path d={fillCurvePath} fill="url(#coreAreaGrad)" opacity={0.12} />

                  {/* Plot curve */}
                  <path
                    d={neonLinePath}
                    fill="none"
                    stroke="url(#coreLineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_4px_12px_rgba(77,163,255,0.4)]"
                  />

                  {/* Interactive Day plots dots */}
                  {chartPoints.map((item, idx) => (
                    <circle
                      key={idx}
                      cx={item.x}
                      cy={item.y}
                      r={idx === selectedDay ? "6.5" : "4"}
                      className={`transition-all cursor-pointer ${idx === selectedDay ? "fill-cyan-400 stroke-[#0D1222] stroke-2" : "fill-white/20 hover:fill-[#4DA3FF]"}`}
                      onClick={() => setSelectedDay(idx)}
                    />
                  ))}

                  {/* SVG Gradient specifications */}
                  <defs>
                    <linearGradient id="coreLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4DA3FF" />
                      <stop offset="50%" stopColor="#9B6DFF" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="coreAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4DA3FF" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Selected point absolute info tooltip */}
                <div 
                  className="absolute p-2 rounded-xl backdrop-blur-md bg-indigo-950/80 border border-cyan-500/30 font-mono text-[9px] pointer-events-none transition-all hidden sm:block"
                  style={{
                    left: `${Math.min(360, Math.max(30, chartPoints[selectedDay].x - 60))}px`,
                    top: `${Math.min(100, Math.max(10, chartPoints[selectedDay].y - 45))}px`
                  }}
                >
                  <div className="text-white font-bold">{weeklyTrendData[selectedDay].fullName}</div>
                  <div className="text-cyan-400">Duration: {weeklyTrendData[selectedDay].duration}</div>
                  <div className="text-pink-400">Leak: {weeklyTrendData[selectedDay].distractions}</div>
                </div>
              </div>

              {/* Day trigger indicators block row */}
              <div className="grid grid-cols-7 gap-1.5 text-center mt-3 border-t border-white/5 pt-3">
                {weeklyTrendData.map((d, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`py-1.5 rounded-xl font-mono text-xs transition-all font-semibold cursor-pointer ${index === selectedDay ? "bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.1)]" : "text-white/40 hover:text-white"}`}
                  >
                    <div>{d.day}</div>
                    <div className="text-[10px] mt-0.5 font-bold">{d.score}%</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: AI Insights Center & Consistency Streaks Tracker (Divided columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Insight Center Column */}
              <div className="backdrop-blur-3xl bg-[#090D1A]/60 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono text-[#9B6DFF] font-black uppercase tracking-widest block">AI RECOMMENDATION CENTRE</span>
                    <Info className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <h4 className="font-display font-medium text-white text-base mb-3.5">Cognitive Insights</h4>
                  
                  <div className="space-y-2.5">
                    {aiInsights.map((ins, index) => (
                      <div
                        key={ins.id}
                        onMouseEnter={() => setIsHoveredInsight(index)}
                        onMouseLeave={() => setIsHoveredInsight(null)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-2.5 items-start ${isHoveredInsight === index ? "bg-[#9B6DFF]/10 border-[#9B6DFF]/30 translate-x-1" : "bg-white/[0.01] border-white/5"}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <p className="text-xs font-sans font-medium text-white/80 leading-normal">
                          {ins.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-[8px] font-mono text-white/30 block tracking-widest uppercase">LAST DECODER CYCLE RUN: 2 MINS AGO</span>
                </div>
              </div>

              {/* Study Consistency & Goal Progress Dashboard column */}
              <div className="backdrop-blur-3xl bg-[#090D1A]/60 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute left-[-20%] bottom-[-20%] w-32 h-32 bg-purple-600/5 blur-xl rounded-full"></div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono text-[#4DA3FF] font-black uppercase tracking-widest block font-bold">CIRCADIAN SYNC PATTERNS</span>
                    <Target className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>
                  
                  <h4 className="font-display font-bold text-white text-base mb-3.5">Study Goal Performance</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Circle progress element */}
                    <div className="flex flex-col items-center justify-center relative">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="48" cy="48" r="38" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                          <circle cx="48" cy="48" r="38" stroke="#4DA3FF" strokeWidth="7" strokeDasharray="238.6" strokeDashoffset="42.9" fill="transparent" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(77,163,255,0.3)]" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-black font-display text-white">82%</span>
                          <span className="text-[7.5px] font-mono text-white/40 block">COMPLETED</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats details side */}
                    <div className="space-y-2.5 font-mono text-[10px]">
                      <div className="bg-white/[0.01] p-1.5 rounded-lg border border-white/5">
                        <span className="text-white/40 text-[8px] block">THIS WEEK TARGET</span>
                        <strong className="text-white text-xs">20.0 Hours</strong>
                      </div>
                      <div className="bg-white/[0.01] p-1.5 rounded-lg border border-white/5">
                        <span className="text-[#4DA3FF] text-[8px] block">COMPLETED WORK</span>
                        <strong className="text-cyan-400 text-xs">16.5 Hours</strong>
                      </div>
                    </div>

                  </div>

                  <p className="mt-4 text-[11px] text-white/50 leading-relaxed font-sans font-medium text-center bg-white/[0.01] p-2.5 rounded-xl border border-white/5">
                    💡 Nex Goal Assistant prediction: One final 3.5 hour sequence completes your target week.
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/5 flex justify-between text-[10px] font-mono text-white/45 font-bold">
                  <span>Current Streak: 18D</span>
                  <span>Record: 31D</span>
                </div>
              </div>

            </div>

            {/* Row 3: Achievement Analytics & Holographic Badges */}
            <div className="backdrop-blur-3xl bg-[#090D1A]/60 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-3 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase block tracking-wider">HOLOGRAPHIC BADGE COLLECTION</span>
                  <p className="text-xs text-white/45 block font-medium mt-0.5">Toggle filter sorting to browse unlocked status</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setAchievementSort(true)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold capitalize select-none cursor-pointer ${achievementSort ? "bg-[#9B6DFF]/15 text-[#9B6DFF] border border-[#9B6DFF]/20" : "bg-white/[0.01] border border-transparent text-white/40 hover:text-white"}`}
                  >
                    All Badges
                  </button>
                  <button
                    onClick={() => setAchievementSort(false)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold capitalize select-none cursor-pointer ${!achievementSort ? "bg-[#9B6DFF]/15 text-[#9B6DFF] border border-[#9B6DFF]/20" : "bg-white/[0.01] border border-transparent text-white/40 hover:text-white"}`}
                  >
                    Power Perks Filter
                  </button>
                </div>
              </div>

              {/* Badges Cards array */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {badges
                  .filter(b => achievementSort ? true : b.unlocked)
                  .map((badge, idx) => (
                    <div
                      key={badge.id}
                      onMouseEnter={() => setHoveredBadge(badge.id)}
                      onMouseLeave={() => setHoveredBadge(null)}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden ${badge.unlocked ? "bg-white/[0.01] hover:bg-white/[0.03] border-white/10" : "opacity-35 bg-black/40 border-dashed border-white/10"} ${hoveredBadge === badge.id && badge.unlocked ? "scale-[1.02] border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]" : ""}`}
                    >
                      {/* Gradient Ambient overlay inside badge cards */}
                      {badge.unlocked && (
                        <div className="absolute -right-6 -bottom-6 w-14 h-14 bg-cyan-400/5 blur-xl rounded-full"></div>
                      )}

                      <div className="flex justify-between items-start mb-2.5">
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-[8px] font-black text-amber-400">
                          +{badge.xp} XP
                        </span>
                      </div>

                      <h5 className="text-xs font-bold font-display text-white mb-1">{badge.name}</h5>
                      <p className="text-[10px] text-white/50 leading-relaxed font-sans font-medium line-clamp-2">{badge.description}</p>
                      
                      <div className="mt-2 text-[9px] font-mono text-[#4DA3FF] flex items-center justify-between font-black uppercase text-[8.5px]">
                        <span>{badge.unlocked ? "UNLOCKED 🏆" : "LOCKED 🔒"}</span>
                        {badge.unlocked && <span className="text-white/20">PERK SYNCED</span>}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
