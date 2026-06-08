import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Lock, 
  ShieldAlert, 
  TrendingUp, 
  Calendar, 
  Activity, 
  Brain, 
  Radio, 
  Clock, 
  User, 
  Zap, 
  Award,
  ChevronRight,
  Maximize2
} from "lucide-react";

// Import modular interactive applications
import NexAssistant from "./NexAssistant";
import LockInFocusMode from "./LockInFocusMode";
import BrainRotMeter from "./BrainRotMeter";
import AIAnalyticsDashboard from "./AIAnalyticsDashboard";
import InteractiveLab from "./InteractiveLab";
import AIFocusTracking from "./AIFocusTracking";

type AppID = "nex" | "lock-in" | "brain-rot" | "analytics" | "planner" | "tracking";

interface AppRegistryItem {
  id: AppID;
  name: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  badge: string;
  component: React.ComponentType<any>;
}

export default function CognitiveOSCockpit() {
  const [activeApp, setActiveApp] = useState<AppID>("nex");
  const [time, setTime] = useState<string>("");
  const [connectionSecured, setConnectionSecured] = useState<boolean>(true);
  const [latency, setLatency] = useState<number>(12);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Live timer for futuristic header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Latency simulator for authentic real-time look
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(24, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const apps: AppRegistryItem[] = [
    {
      id: "nex",
      name: "NEX AI Coach",
      shortDesc: "Conversational Copilot",
      icon: Cpu,
      color: "text-[#22d3ee]",
      glowColor: "rgba(34,211,238,0.2)",
      badge: "ACTIVE AGENT",
      component: NexAssistant
    },
    {
      id: "lock-in",
      name: "Focus Chamber",
      shortDesc: "Distraction Isolation",
      icon: Lock,
      color: "text-[#EC4899]",
      glowColor: "rgba(236,72,153,0.2)",
      badge: "POMODORO V2",
      component: LockInFocusMode
    },
    {
      id: "brain-rot",
      name: "Dopamine Audit",
      shortDesc: "Gen Z Rot Meter™",
      icon: ShieldAlert,
      color: "text-amber-400",
      glowColor: "rgba(245,158,11,0.2)",
      badge: "ROT GAUGE",
      component: BrainRotMeter
    },
    {
      id: "analytics",
      name: "AI Analytics",
      shortDesc: "Cognitive Performance",
      icon: TrendingUp,
      color: "text-purple-400",
      glowColor: "rgba(168,85,247,0.2)",
      badge: "LIVE INSIGHTS",
      component: AIAnalyticsDashboard
    },
    {
      id: "tracking",
      name: "Focus Tracker",
      shortDesc: "Attention Metrics",
      icon: Brain,
      color: "text-[#4DA3FF]",
      glowColor: "rgba(77,163,255,0.2)",
      badge: "COGNITIVE RADAR",
      component: AIFocusTracking
    },
    {
      id: "planner",
      name: "Smart Planner",
      shortDesc: "Exam & Task Matrix",
      icon: Calendar,
      color: "text-emerald-400",
      glowColor: "rgba(16,185,129,0.2)",
      badge: "LMS SYNCED",
      component: InteractiveLab
    }
  ];

  const activeRegistry = apps.find(a => a.id === activeApp) || apps[0];
  const ActiveComponent = activeRegistry.component;

  return (
    <section id="focus-os-simulator" className="py-24 relative overflow-hidden bg-[#050811]">
      {/* Background Decorative Laser Line Grids & Atmospheric Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#4DA3FF]/10 to-[#9B6DFF]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Architectural Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9B6DFF]/10 border border-[#9B6DFF]/20 text-[#9B6DFF] text-[10px] uppercase tracking-[0.25em] font-bold font-mono">
            ✦ COGNITIVE CONTROL MATRIX ✦
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Experience the Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#9B6DFF] to-pink-500">FocusFlow OS</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans font-medium">
            Take command of your attention. Rather than scrolling through separate grids, toggle between our live, interconnected student tools using the central system dock below.
          </p>
        </div>

        {/* Master Glassmorphic System Window */}
        <div className={`backdrop-blur-3xl bg-black/45 border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all duration-700 ${isMaximized ? 'min-h-[1100px]' : 'min-h-[950px]'}`}>
          
          {/* OS Top Menu Bar (Live Stats Header) */}
          <div className="px-8 py-4.5 bg-black/60 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between z-20 font-mono text-xs select-none">
            
            {/* Left Brand Badge */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 hover:brightness-110 cursor-pointer"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:brightness-110 cursor-pointer"></span>
                <span className="w-3 h-3 rounded-full bg-[#22d3ee]/80 hover:brightness-110 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)}></span>
              </div>
              <div className="h-4 w-[1px] bg-white/15 mx-1.5"></div>
              <div className="flex items-center gap-2 uppercase tracking-widest font-black text-white text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-[#22d3ee] animate-spin" style={{ animationDuration: "5s" }} />
                FocusOS <span className="text-[#9B6DFF]">v3.2</span>
              </div>
            </div>

            {/* Central App State Indicator Panel */}
            <div className="hidden md:flex items-center gap-6 text-white/55 text-[10px] uppercase font-bold tracking-widest">
              <div className="flex items-center gap-1.5">
                <span className="text-white/30">APP:</span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">{activeRegistry.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/30">STATUS:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SYNCHRONIZED
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/30">LATENCY:</span>
                <span className="text-cyan-400 font-mono font-bold">{latency}ms</span>
              </div>
            </div>

            {/* Right Telemetry Column (User Profile & Live Clock) */}
            <div className="flex items-center gap-4 text-white/60">
              <div className="hidden sm:flex items-center gap-2 bg-[#9B6DFF]/10 text-[#9B6DFF] border border-[#9B6DFF]/20 px-2.5 py-1 rounded-full text-[10px]">
                <Award className="w-3 h-3" />
                <span>Nurash (Elite)</span>
              </div>
              <div className="font-mono font-black text-white bg-white/5 border border-white/10 px-3 py-1 rounded-xl text-[11px] tracking-widest flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                {time || "00:00:00"}
              </div>
            </div>

          </div>

          {/* ACTIVE APPLICATION CONTAINER VIEWLINE */}
          <div className="flex-1 bg-gradient-to-b from-[#090D1A]/50 to-black/80 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeApp}
                initial={{ opacity: 0, y: 15, scale: 0.992 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full h-full"
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FUTURISTIC COGNITIVE DOCK SYSTEM BAR */}
          <div className="p-8 bg-black/60 border-t border-white/10 flex flex-col items-center justify-center shrink-0 z-20 relative select-none">
            
            {/* Dock Outer Capsule Wrapper */}
            <div className="relative">
              
              {/* Outer Neon Glow Halo Backplane */}
              <div 
                className="absolute inset-0 -m-1.5 rounded-3xl blur-2xl opacity-25 filter pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeRegistry.glowColor }}
              ></div>

              {/* Real Dock Body */}
              <div className="relative z-10 flex flex-wrap gap-3 p-3 bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[1.75rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] items-center justify-center">
                
                {apps.map((app, idx) => {
                  const AppIcon = app.icon;
                  const isSelected = activeApp === app.id;
                  
                  return (
                    <motion.button
                      key={app.id}
                      onClick={() => setActiveApp(app.id)}
                      whileHover={{ scale: 1.15, y: -8 }}
                      whileTap={{ scale: 0.92 }}
                      className={`relative flex flex-col items-center justify-center w-15 h-15 rounded-2xl cursor-pointer border transition-all ${
                        isSelected 
                          ? "bg-white/10 border-white/30 shadow-xl scale-[1.08]" 
                          : "bg-white/[0.01] border-white/5 text-white/50 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <AppIcon className={`w-6 h-6 transition-transform duration-300 ${isSelected ? app.color : "text-white/45"}`} />
                      
                      {/* Spring animation line underneath */}
                      {isSelected && (
                        <motion.span 
                          layoutId="activeDockLine"
                          className="absolute bottom-1 w-5 h-[2px] bg-cyan-400 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Small hover text pill description tooltip */}
                      <span className="hidden lg:group-hover:flex absolute -top-12 bg-black border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wider uppercase text-white pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        {app.name}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="h-10 w-[1px] bg-white/10 hidden sm:block mx-1"></div>

                {/* Micro Live Stats Monitor pill beside the dock */}
                <div className="hidden sm:flex flex-col text-left font-mono text-[9px] text-white/40 pl-3 leading-tight uppercase font-black select-none">
                  <span>COGNITIVE CORE ACTIVATED</span>
                  <div className="text-white flex items-center gap-1.5 mt-1 font-sans text-xs">
                    <Radio className="w-3.5 h-3.5 text-[#22d3ee] animate-pulse" />
                    <span>Focusing Live: <strong>99.4%</strong></span>
                  </div>
                </div>

              </div>
            </div>

            {/* Sub Caption Details around dock */}
            <div className="mt-4 flex gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest leading-none">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> NEX AI synced</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span> timer running</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> stats database secure</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
