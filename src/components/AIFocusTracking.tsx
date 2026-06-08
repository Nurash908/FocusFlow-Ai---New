import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Brain, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Flame, 
  ShieldAlert, 
  PieChart, 
  Compass, 
  LineChart, 
  Layers,
  HelpCircle,
  Lightbulb
} from "lucide-react";

// Types for personalized student focus profiles
interface FocusPersonality {
  id: string;
  emoji: string;
  name: string;
  tag: string;
  description: string;
  colorClass: string;
  gradient: string;
  insights: string[];
}

export default function AIFocusTracking() {
  // Interactive variables
  const [activeDayIndex, setActiveDayIndex] = useState<number>(3); // Defaulting to Thursday
  const [activeRingState, setActiveRingState] = useState<"focused" | "deep" | "distracted">("focused");
  const [soundFrequency, setSoundFrequency] = useState<number>(40); // 40Hz default
  
  // Custom states for interactive values
  const [focusTimeHrs, setFocusTimeHrs] = useState<number>(4);
  const [focusTimeMins, setFocusTimeMins] = useState<number>(12);
  const [studySessions, setStudySessions] = useState<number>(6);
  const [distractions, setDistractions] = useState<number>(3);
  const [tasksCompleted, setTasksCompleted] = useState<number>(12);

  // Focus personalities array
  const personalities: FocusPersonality[] = [
    {
      id: "deep-worker",
      emoji: "🔥",
      name: "Deep Worker",
      tag: "Peak Flow Mastery",
      description: "You perform best during long uninterrupted study sessions and maintain excellent consistency throughout the week.",
      colorClass: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      gradient: "from-amber-400 via-orange-500 to-rose-600",
      insights: [
        "Uncapped baseline neural focus capacity of 95 mins",
        "Prone to intense fatigue after hour three without breaks",
        "Perfect compliance when coupled with low frequencies"
      ]
    },
    {
      id: "sprint-learner",
      emoji: "⚡",
      name: "Sprint Learner",
      tag: "Rapid Interval Burst",
      description: "You excel at highly dense blocks with recurring quick rests, resetting attention with rapid response precision.",
      colorClass: "text-[#4DA3FF] border-[#4DA3FF]/20 bg-[#4DA3FF]/5",
      gradient: "from-[#4DA3FF] via-blue-600 to-indigo-700",
      insights: [
        "Flawless integration with 25/5 Pomodoro patterns",
        "Quick mental reset decreases cognitive decay vectors",
        "Best matched with alpha biometrical soundscapes"
      ]
    },
    {
      id: "consistent-achiever",
      emoji: "🏆",
      name: "Consistent Achiever",
      tag: "Rhythmic Flow Harmony",
      description: "Your daily focus scores describe a beautiful sine wave with minimal variance, representing balanced baseline behavior.",
      colorClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      insights: [
        "Very low distraction spikes during standard hours",
        "Task-by-task execution pattern eliminates clutter",
        "Sustains excellent digital hygiene ratings"
      ]
    },
    {
      id: "night-owl-scholar",
      emoji: "🌙",
      name: "Night Owl Scholar",
      tag: "Lunar Synapse Surge",
      description: "Your cognitive peak triggers exclusively while the sun goes down, holding extreme focus duration during quiet hours.",
      colorClass: "text-[#9B6DFF] border-[#9B6DFF]/20 bg-[#9B6DFF]/5",
      gradient: "from-[#9B6DFF] via-purple-600 to-fuchsia-700",
      insights: [
        "Optimal focus window coordinates: 10:00 PM - 2:00 AM",
        "Prone to melatonin mismatch if screen intensity is raw",
        "Excellent at synthesizing deep philosophical concepts"
      ]
    },
    {
      id: "strategic-thinker",
      emoji: "🧬",
      name: "Strategic Thinker",
      tag: "Complex Conceptual Grid",
      description: "You map tasks extensively prior to focus lock-in. You love high complexity and operate at maximum precision when analyzing patterns.",
      colorClass: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      gradient: "from-cyan-400 via-teal-400 to-blue-600",
      insights: [
        "Highly analytical approach reduces task friction",
        "Focus index scales linearly with problem difficulty",
        "Enjoys gamified XP badges and leaderboard benchmarks"
      ]
    }
  ];

  const [activePersonalityIndex, setActivePersonalityIndex] = useState<number>(0);

  // Daily parameters based on active day clicked on trend chart
  const weeklyData = [
    { day: "Mon", score: 72, focusHours: 3.2, sessions: 4, distractions: 6, completed: 8 },
    { day: "Tue", score: 81, focusHours: 4.0, sessions: 5, distractions: 4, completed: 10 },
    { day: "Wed", score: 65, focusHours: 2.8, sessions: 3, distractions: 9, completed: 5 },
    { day: "Thu", score: 87, focusHours: 4.2, sessions: 6, distractions: 3, completed: 12 }, // default
    { day: "Fri", score: 79, focusHours: 3.8, sessions: 5, distractions: 5, completed: 9 },
    { day: "Sat", score: 92, focusHours: 5.5, sessions: 8, distractions: 1, completed: 15 },
    { day: "Sun", score: 88, focusHours: 5.0, sessions: 7, distractions: 2, completed: 13 },
  ];

  const handleDaySelect = (index: number) => {
    setActiveDayIndex(index);
    const selected = weeklyData[index];
    // Deconstruct hours
    const hrs = Math.floor(selected.focusHours);
    const mins = Math.round((selected.focusHours - hrs) * 60);
    setFocusTimeHrs(hrs);
    setFocusTimeMins(mins);
    setStudySessions(selected.sessions);
    setDistractions(selected.distractions);
    setTasksCompleted(selected.completed);

    // Dynamic focus ring state adaptation
    if (selected.score >= 85) {
      setActiveRingState("deep");
    } else if (selected.score < 70) {
      setActiveRingState("distracted");
    } else {
      setActiveRingState("focused");
    }
  };

  const activeDay = weeklyData[activeDayIndex];

  // Helper values for active state
  const ringColors = {
    focused: {
      primary: "#4DA3FF",
      glow: "rgba(77, 163, 255, 0.4)",
      label: "Focused Core Mode",
      desc: "Standard cognitive pacing active",
      circleStroke: "stroke-[#4DA3FF]"
    },
    deep: {
      primary: "#9B6DFF",
      glow: "rgba(155, 109, 255, 0.4)",
      label: "Deep Work Protocol",
      desc: "Extreme alpha wave isolation enabled",
      circleStroke: "stroke-[#9B6DFF]"
    },
    distracted: {
      primary: "#FF4D4D",
      glow: "rgba(255, 77, 77, 0.4)",
      label: "Attention Alert State",
      desc: "Mild visual distraction spike detected",
      circleStroke: "stroke-[#FF4D4D]"
    }
  };

  // Custom SVG path computations for smooth curve lines
  const generateSvgPath = () => {
    const width = 600;
    const height = 150;
    const paddingX = 40;
    const paddingY = 25;
    
    const segmentWidth = (width - paddingX * 2) / (weeklyData.length - 1);
    
    return weeklyData.map((d, i) => {
      const x = paddingX + i * segmentWidth;
      // High score is near top, so subtract score ratio from height
      const y = height - paddingY - ((d.score - 40) / (100 - 40)) * (height - paddingY * 2);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  const generateSvgArea = () => {
    const width = 600;
    const height = 150;
    const paddingX = 40;
    const paddingY = 25;
    const segmentWidth = (width - paddingX * 2) / (weeklyData.length - 1);
    
    const linePath = generateSvgPath();
    const startX = paddingX;
    const endX = paddingX + (weeklyData.length - 1) * segmentWidth;
    
    return `${linePath} L ${endX} ${height} L ${startX} ${height} Z`;
  };

  return (
    <div id="analytics" className="py-12 relative overflow-hidden w-full">
      {/* Absolute Ambient Background Lights resembling Apple Vision Pro */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#9B6DFF]/10 to-transparent blur-[160px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-[#4DA3FF]/8 to-transparent blur-[180px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Dynamic Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA3FF]/10 border border-[#4DA3FF]/30 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#4DA3FF] animate-spin" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4DA3FF]">Active Core Intelligence</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Flawless <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4DA3FF] to-[#9B6DFF]">AI Focus Tracking</span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans">
              Not just numbers—this is your cognitive compass. Uncover peak work hours, minimize addictive neural hijacks, and reconstruct healthy flow loops with complete visibility.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-white/[0.02] border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center p-[1px]">
              <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center">
                <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-[9px] font-mono text-white/40 uppercase block">Active Neural Network</span>
              <span className="text-white text-xs font-semibold font-display">Tuned to Binaural {soundFrequency}Hz</span>
            </div>
            
            {/* Direct Slider to adjust sound frequencies */}
            <input
              type="range"
              min="10"
              max="90"
              value={soundFrequency}
              onChange={(e) => setSoundFrequency(Number(e.target.value))}
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-ew-resize accent-[#4DA3FF] ml-2"
              title="Drag to adjust study frequencies"
            />
          </div>
        </div>

        {/* Outer Command Center - Large Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Premium Futuristic Mobile Screen Frame (Glass Core) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[580px] rounded-[3.5rem] border-[10px] border-white/10 bg-gradient-to-b from-[#0F1524] to-[#04070D] p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Internal Glass Core Container */}
              <div className="relative rounded-[3rem] bg-[#070B14]/80 backdrop-blur-3xl px-6 py-8 flex flex-col justify-between overflow-hidden text-white font-sans">
                
                {/* Background glow behind phone */}
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-gradient-to-tr from-[#4DA3FF]/15 to-[#9B6DFF]/15 blur-[90px] rounded-full pointer-events-none"></div>

                {/* Top Notch Dynamic Island Area */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full bg-[#070B14] border border-white/10 z-20 flex justify-center items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
                  <span className="text-[8px] font-mono text-white/40 uppercase font-bold">FocusFlow App v1.4</span>
                </div>

                {/* Main Screen App Wrapper */}
                <div className="pt-6 relative z-10">
                  
                  {/* Greeting Row */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                        Good Evening, Nurash <span className="animate-bounce">👋</span>
                      </h3>
                      <p className="text-xs text-white/50 font-sans mt-0.5 font-medium">Welcome back to FocusFlow AI</p>
                    </div>
                    
                    <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 backdrop-blur-md">
                      <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold">12 Streaks</span>
                    </div>
                  </div>

                  {/* Centered Area: Today's Focus Score Big Dial */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/[0.02] border border-white/5 rounded-3xl p-6 mb-6 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4DA3FF]/5 blur-2xl rounded-full"></div>
                    
                    {/* Circle dial columns */}
                    <div className="md:col-span-5 flex justify-center relative">
                      
                      {/* Interactive focus status ring switcher */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 z-20 bg-black/60 border border-white/10 p-0.5 rounded-full shadow-lg">
                        {(["focused", "deep", "distracted"] as const).map(st => (
                          <button
                            key={st}
                            onClick={() => setActiveRingState(st)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold capitalize transition-all ${
                              activeRingState === st 
                                ? st === "focused" ? "bg-[#4DA3FF]/20 text-[#4DA3FF] border border-[#4DA3FF]/40"
                                : st === "deep" ? "bg-[#9B6DFF]/20 text-[#9B6DFF] border border-[#9B6DFF]/40"
                                : "bg-[#FF4D4D]/25 text-[#FF4D4D] border border-[#FF4D4D]/40"
                                : "text-white/40 hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="relative w-36 h-36 flex items-center justify-center mt-3">
                        {/* Dynamic glow base svg */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="72"
                            cy="72"
                            r="58"
                            className="stroke-white/5"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <motion.circle
                            cx="72"
                            cy="72"
                            r="58"
                            className={ringColors[activeRingState].circleStroke}
                            strokeWidth="9"
                            fill="transparent"
                            strokeDasharray={364.4}
                            initial={{ strokeDashoffset: 364.4 }}
                            animate={{ strokeDashoffset: 364.4 - (364.4 * activeDay.score) / 100 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Central details */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-white/40">TODAY'S RATING</span>
                          <span className="text-4xl font-bold font-display text-white mt-0.5 tracking-tighter">
                            {activeDay.score}%
                          </span>
                          <span className="text-[9px] font-semibold text-emerald-400 mt-0.5 block flex items-center gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Excellent
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
                      <span className="text-[9px] font-mono text-[#4DA3FF] uppercase tracking-widest">COGNITIVE STATUS REPORT</span>
                      <h4 className="text-lg font-bold text-white mt-1 leading-snug">{ringColors[activeRingState].label}</h4>
                      <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                        {ringColors[activeRingState].desc}. Click the buttons above the ring to manually modulate states.
                      </p>

                      <div className="flex gap-2.5 items-center mt-4">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                          NEX AI Active Syncing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Four Floating Daily Performance Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { 
                        title: "Focus Time", 
                        v: `${focusTimeHrs}h ${focusTimeMins}m`, 
                        sub: "Reclaimed daily", 
                        col: "text-[#4DA3FF]",
                        act: () => {
                          setFocusTimeHrs(h => h + 1 > 12 ? 1 : h + 1);
                        }
                      },
                      { 
                        title: "Study Sessions", 
                        v: studySessions.toString(), 
                        sub: "Lock-ins accomplished", 
                        col: "text-[#9B6DFF]",
                        act: () => {
                          setStudySessions(s => s + 1);
                        }
                      },
                      { 
                        title: "Distractions Blocked", 
                        v: distractions.toString(), 
                        sub: "Hijacks avoided", 
                        col: "text-red-400",
                        act: () => {
                          setDistractions(d => d === 0 ? 5 : d - 1);
                        }
                      },
                      { 
                        title: "Tasks Completed", 
                        v: tasksCompleted.toString(), 
                        sub: "LMS Sync accomplished", 
                        col: "text-green-400",
                        act: () => {
                          setTasksCompleted(t => t + 1);
                        }
                      }
                    ].map((card, idx) => (
                      <div
                        key={idx}
                        onClick={card.act}
                        className="bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between h-28 hover:shadow-lg relative overflow-hidden"
                      >
                        {/* Shimmer gradient line on top */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4DA3FF]/20 to-transparent"></div>
                        
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{card.title}</span>
                          <span className="text-[8px] text-[#4DA3FF] uppercase font-mono tracking-widest font-bold">Tweak</span>
                        </div>
                        <div>
                          <div className={`text-xl sm:text-2xl font-bold font-display ${card.col}`}>{card.v}</div>
                          <div className="text-[9px] text-white/40 mt-1">{card.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Weekly Focus Trend Chart Panel */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-[9px] font-mono text-[#9B6DFF] uppercase tracking-widest font-bold block">WEEKLY INSIGHT CORE</span>
                        <h4 className="text-sm font-bold text-white">Focus Trend Curve</h4>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">Select day below to load historical scores</span>
                    </div>

                    {/* Custom SVG Line Chart */}
                    <div className="relative h-28 w-full mt-4 bg-white/[0.01] rounded-2xl border border-white/5 overflow-hidden p-2">
                      <svg viewBox="0 0 600 150" className="w-full h-full">
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#9B6DFF" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#4DA3FF" />
                            <stop offset="50%" stopColor="#9B6DFF" />
                            <stop offset="100%" stopColor="#FF4D4D" />
                          </linearGradient>
                        </defs>

                        {/* Chart Grid Lines */}
                        <line x1="40" y1="25" x2="560" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="40" y1="75" x2="560" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="40" y1="125" x2="560" y2="125" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                        {/* Area Fill */}
                        <path d={generateSvgArea()} fill="url(#areaGrad)" />

                        {/* Plot line curve */}
                        <path
                          d={generateSvgPath()}
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Interactive dots representing coordinates */}
                        {weeklyData.map((d, i) => {
                          const segmentWidth = (600 - 40 * 2) / (weeklyData.length - 1);
                          const x = 40 + i * segmentWidth;
                          const y = 150 - 25 - ((d.score - 40) / (100 - 40)) * (150 - 25 * 2);

                          return (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r={i === activeDayIndex ? "6.5" : "4.5"}
                              className={`${i === activeDayIndex ? "fill-[#4DA3FF]" : "fill-white/20"} stroke-[#070B14] hover:fill-[#4DA3FF] transition-all cursor-pointer`}
                              onClick={() => handleDaySelect(i)}
                            />
                          );
                        })}
                      </svg>
                    </div>

                    {/* Timeline Days triggers button row */}
                    <div className="grid grid-cols-7 gap-1 text-center mt-3.5 border-t border-white/5 pt-3">
                      {weeklyData.map((d, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDaySelect(idx)}
                          className={`py-1 rounded-lg text-xs font-mono transition-all font-bold ${idx === activeDayIndex ? "bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30" : "text-white/40 hover:text-white"}`}
                        >
                          <div>{d.day}</div>
                          <div className="text-[10px] mt-0.5 font-medium">{d.score}%</div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Advanced AI Tracking Analysis Pane */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
            
            {/* AI Insights Card Block */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#4DA3FF]/10 blur-3xl rounded-full"></div>
              
              <div className="first-letter flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-[#9B6DFF] to-indigo-500 rounded-xl flex items-center justify-center p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#070B14] flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-[#9B6DFF]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest font-bold">NEX COGNITIVE DECODER</span>
                    <h4 className="font-display font-medium text-white text-base">Weekly AI Recommendations</h4>
                  </div>
                </div>
                
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                  Optimal Recommendation
                </span>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/70 leading-relaxed mb-6">
                <p>
                  "Jordan, your cognitive analytics display a noticeable spike on Wednesdays. Frequent visual window switching coordinates with short video triggers."
                </p>
                <p className="p-4 bg-[#4DA3FF]/5 rounded-2xl border border-[#4DA3FF]/15 text-xs text-white/80 font-mono">
                  💡 <strong className="text-[#4DA3FF]">Personalized Suggestion:</strong> You were most productive between 7:00 PM and 8:30 PM. Consider scheduling difficult tasks during this period to maximize productivity.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    // Simulating AI optimization action
                    alert("AI optimization algorithm loaded. Study Planner synced with 7:00 PM - 8:30 PM lock-in blocks.");
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-[#9B6DFF] hover:brightness-110 active:scale-[0.98] rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-lg"
                >
                  Schedule Suggested Flow-Block
                </button>
              </div>
            </div>

            {/* AI Focus Personality Card ( হিলোগ্রাম ) */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#9B6DFF]/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#9B6DFF]/10 to-transparent blur-3xl rounded-full"></div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">AI BEHAVIORAL PROFILE</span>
                  <h4 className="font-display font-bold text-lg text-white">Your Focus Personality</h4>
                </div>
                
                {/* Sliders selector to toggle through personalities */}
                <div className="flex gap-1.5 bg-white/5 border border-white/10 rounded-lg p-1">
                  <button 
                    onClick={() => setActivePersonalityIndex(prev => prev === 0 ? personalities.length - 1 : prev - 1)}
                    className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActivePersonalityIndex(prev => (prev + 1) % personalities.length)}
                    className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Personality Display Card Animated with slide-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersonalityIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className={`p-5 rounded-2xl border ${personalities[activePersonalityIndex].colorClass} relative overflow-hidden`}>
                    <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-tr ${personalities[activePersonalityIndex].gradient} blur-3xl rounded-full opacity-40`}></div>
                    
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl">{personalities[activePersonalityIndex].emoji}</span>
                      <div>
                        <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest block font-bold">COGNITIVE DNA MATCH</span>
                        <h5 className="font-display font-black text-xl text-white mt-0.5">{personalities[activePersonalityIndex].name}</h5>
                      </div>
                    </div>

                    <p className="text-xs text-white/80 mt-4 leading-relaxed font-sans font-medium">
                      {personalities[activePersonalityIndex].description}
                    </p>
                  </div>

                  {/* Bullet insights */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-bold block">SYNAPSE STATS</span>
                    {personalities[activePersonalityIndex].insights.map((ins, idx) => (
                      <div key={idx} className="flex gap-2.5 items-center text-xs text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#4DA3FF] shrink-0" />
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Productivity Health Score Card */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold block">BIOMETRIC HEALTH SCORE</span>
                  <h4 className="font-display font-medium text-white text-base">Productivity Health</h4>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold font-display text-cyan-400">92 / 100</div>
                  <span className="text-[9px] text-[#4DA3FF] font-mono">Rank: Legendary</span>
                </div>
              </div>

              {/* Parameters metrics list breakdown */}
              <div className="space-y-4">
                {[
                  { label: "Focus Consistency", pct: 94, color: "bg-[#4DA3FF]" },
                  { label: "Study Time Velocity", pct: 88, color: "bg-[#9B6DFF]" },
                  { label: "Distraction Control Threshold", pct: 95, color: "bg-emerald-400" },
                  { label: "LMS Goal Completion rate", pct: 90, color: "bg-amber-400" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/60">{item.label}</span>
                      <span className="text-white font-bold">{item.pct}%</span>
                    </div>
                    {/* Glowing progress line */}
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      />
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
