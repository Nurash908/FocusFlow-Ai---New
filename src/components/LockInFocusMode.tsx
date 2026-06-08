import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Shield, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Brain, 
  Grid, 
  Lock, 
  Unlock,
  Flame, 
  Award, 
  Trophy, 
  Gauge, 
  Zap, 
  Compass, 
  Sliders, 
  BellOff, 
  HelpCircle,
  Clock
} from "lucide-react";

// Types for environments
interface FocusEnvironment {
  id: string;
  emoji: string;
  name: string;
  color: string;
  themeClass: string;
  gradient: string;
  quote: string;
  frequency: string;
}

export default function LockInFocusMode() {
  // TIMER STATES: 45:00 default (2700 seconds)
  const INITIAL_TIME = 2700;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isShieldActive, setIsShieldActive] = useState<boolean>(true);
  
  // Custom states
  const [selectedEnvIndex, setSelectedEnvIndex] = useState<number>(5); // default: Deep Work Mode
  const [soundVolume, setSoundVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Metrics states
  const [focusStability, setFocusStability] = useState<number>(94);
  const [distractionLevel, setDistractionLevel] = useState<string>("LOW");
  const [productivityScore, setProductivityScore] = useState<number>(89);
  const [sessionQuality, setSessionQuality] = useState<string>("EXCELLENT");

  // Interaction logs / Rewards
  const [sessionXP, setSessionXP] = useState<number>(120);
  const [currentStreak, setCurrentStreak] = useState<number>(12);
  const [deepWorkProgress, setDeepWorkProgress] = useState<number>(85); // %
  const [isLockedInButtonClicked, setIsLockedInButtonClicked] = useState<boolean>(false);

  // Focus Coach State
  const [currentCoachMsgIndex, setCurrentCoachMsgIndex] = useState<number>(0);
  const coachMessages = [
    "Excellent focus detected. Neural sync is perfectly aligned.",
    "Keep going. You're building a massive cognitive momentum.",
    "Distractions are currently extremely low inside the chamber.",
    "Your brain waves match the optimal alpha frequency state.",
    "You're on track to beat yesterday's peak focus record!",
    "Attention shield is blocking incoming external telemetry notifications."
  ];

  // Particle tracking system for background canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Environments options
  const environments: FocusEnvironment[] = [
    {
      id: "ambient-music",
      emoji: "🎧",
      name: "Ambient Music",
      color: "#4DA3FF",
      themeClass: "from-[#4DA3FF] to-blue-900",
      gradient: "from-[#4DA3FF]/20 via-transparent to-transparent",
      quote: "Binaural flow-state architecture with low intensity textures.",
      frequency: "10Hz (Alpha Wave)"
    },
    {
      id: "rain-sounds",
      emoji: "🌧",
      name: "Rain Sounds",
      color: "#06B6D4",
      themeClass: "from-cyan-400 to-cyan-950",
      gradient: "from-cyan-400/20 via-transparent to-transparent",
      quote: "Soothing natural frequency shielding against sudden room echoes.",
      frequency: "40Hz (Gamma Wave)"
    },
    {
      id: "deep-space",
      emoji: "🌌",
      name: "Deep Space",
      color: "#9B6DFF",
      themeClass: "from-[#9B6DFF] to-purple-950",
      gradient: "from-[#9B6DFF]/20 via-transparent to-transparent",
      quote: "Cosmic black resonance modeling to mimic heavy spatial isolation.",
      frequency: "7Hz (Theta Wave)"
    },
    {
      id: "library-mode",
      emoji: "📚",
      name: "Library Mode",
      color: "#F59E0B",
      themeClass: "from-amber-400 to-amber-950",
      gradient: "from-amber-400/20 via-transparent to-transparent",
      quote: "Subtle paper ruffling, quiet whispers, and acoustic resonance.",
      frequency: "12Hz (Beta Wave)"
    },
    {
      id: "ocean-waves",
      emoji: "🌊",
      name: "Ocean Waves",
      color: "#10B981",
      themeClass: "from-emerald-400 to-emerald-950",
      gradient: "from-emerald-400/15 via-transparent to-transparent",
      quote: "Sub-audible coastal rhythms matched with deep respiration curves.",
      frequency: "8Hz (Alpha-Theta)"
    },
    {
      id: "deep-work",
      emoji: "🔥",
      name: "Deep Work",
      color: "#EC4899",
      themeClass: "from-[#EC4899] to-[#881337]",
      gradient: "from-[#EC4899]/20 via-transparent to-transparent",
      quote: "Raw electromagnetic focus shield utilizing 40Hz auditory pulse train.",
      frequency: "40Hz (Premium Sync)"
    }
  ];

  const currentEnv = environments[selectedEnvIndex];

  // Timer Countdown Effect
  useEffect(() => {
    let timerId: number;
    if (isRunning && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          // Dynamic metric fluctuation to make things look alive
          if (Math.random() < 0.1) {
            setFocusStability(s => Math.min(100, Math.max(88, s + (Math.random() > 0.5 ? 1 : -1))));
            setProductivityScore(p => Math.min(100, Math.max(80, p + (Math.random() > 0.5 ? 1 : -1))));
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  // Rotational Coach Message cycles
  useEffect(() => {
    const coachInterval = setInterval(() => {
      if (isRunning) {
        setCurrentCoachMsgIndex(prev => (prev + 1) % coachMessages.length);
      }
    }, 12000); // 12 seconds
    return () => clearInterval(coachInterval);
  }, [isRunning]);

  // Canvas particle neural energy wave rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let waveOffset = 0;
    
    // Resize
    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const particles: {x: number, y: number, speed: number, size: number, alpha: number}[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.4 + 0.1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.fillStyle = "rgba(10, 15, 30, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw floating cosmic dust
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ambient glowing fog in center
      const oceanGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, width * 0.45);
      oceanGlow.addColorStop(0, currentEnv.color + "1a"); // 10% opacity
      oceanGlow.addColorStop(0.5, currentEnv.color + "03"); // 3% opacity
      oceanGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = oceanGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw circular sine wave mimicking audio frequency
      ctx.strokeStyle = currentEnv.color + "33"; // 20% opacity
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      waveOffset += isRunning ? 0.03 : 0.01;
      const numPoints = 120;
      const baseRadius = width * 0.32;

      for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        // Layering secondary waves
        const wave1 = Math.sin(theta * 8 + waveOffset) * (isRunning ? 6 : 3);
        const wave2 = Math.cos(theta * 3 - waveOffset * 1.5) * (isRunning ? 4 : 2);
        const radius = baseRadius + wave1 + wave2;
        
        const x = centerX + Math.cos(theta) * radius;
        const y = centerY + Math.sin(theta) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Pulsative outer protective magnetic shield line (If shield active)
      if (isShieldActive) {
        ctx.strokeStyle = "rgba(77, 163, 255, 0.15)";
        ctx.shadowColor = "#4DA3FF";
        ctx.shadowBlur = Math.sin(waveOffset * 3) * 6 + 10;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius + 30, 0, Math.PI * 2);
        ctx.stroke();
        
        // Reset shadows
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedEnvIndex, isRunning, isShieldActive]);

  // Helper formattings
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Percent indicator logic
  const timerPercentageDone = ((INITIAL_TIME - timeLeft) / INITIAL_TIME) * 100;

  // Custom action stays locked in
  const handleStayLockedIn = () => {
    setIsLockedInButtonClicked(true);
    setSessionXP(xp => xp + 15);
    setCurrentStreak(s => (s === 12 ? 13 : s));
    setDeepWorkProgress(p => Math.min(100, p + 2));
    
    // Quick coach message adaptation
    setCurrentCoachMsgIndex(Math.floor(Math.random() * coachMessages.length));

    setTimeout(() => {
      setIsLockedInButtonClicked(false);
    }, 1500);
  };

  return (
    <div id="lock-in-mode" className="py-12 relative overflow-hidden w-full">
      {/* Background Decorative Element */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#EC4899]/10 to-transparent blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-[30%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#4DA3FF]/10 to-transparent blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EC4899]">Deep Focus Sandbox</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Step inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-[#9B6DFF] to-[#4DA3FF]">Lock-In Focus Mode</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans">
            Become immune to distractions. Shield your attention inside a cinematic neural laboratory designed to synchronize brainwaves to premium performance bands.
          </p>
        </div>

        {/* Dashboard grid setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Live statistics, environments & coaching */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full">
            
            {/* Real-time Focus Environment Customizer */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/20 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#4DA3FF]" />
                  <span className="text-xs font-semibold text-white/50 font-mono">CHAMBER SOUNDSCAPES</span>
                </div>
                <span className="text-[9px] bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  Binaural
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {environments.map((env, i) => (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnvIndex(i)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedEnvIndex === i
                        ? "bg-white/10 border-white/30 text-white shadow-xl shadow-black/40 scale-[1.02]"
                        : "bg-white/[0.01] border-white/5 text-white/50 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xl">{env.emoji}</span>
                      <span className="text-[8px] font-mono opacity-60 bg-white/5 px-1 rounded">{env.frequency}</span>
                    </div>
                    <div className="text-xs font-bold mt-2 font-display">{env.name}</div>
                  </button>
                ))}
              </div>

              {/* Slider for volume custom tweaking */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer text-white/60 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#FF4D4D]" /> : <Volume2 className="w-4 h-4 text-[#4DA3FF]" />}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
                    <span>Decibel Masking Density</span>
                    <span>{isMuted ? "MUTED" : `${soundVolume}%`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : soundVolume}
                    onChange={(e) => {
                      setSoundVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
                  />
                </div>
              </div>

              <p className="text-[10px] text-white/40 mt-3 italic leading-relaxed">
                "{currentEnv.quote}"
              </p>
            </div>

            {/* AI Focus Coach Message Floating Node */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-pink-500/20 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-tr from-[#9B6DFF]/15 to-transparent blur-2xl rounded-full"></div>
              
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-11 h-11 bg-pink-500/10 border border-pink-500/20 rounded-full flex items-center justify-center p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center">
                    <Brain className="w-5 h-5 text-pink-400 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#070B14]"></span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#EC4899] uppercase tracking-widest font-black block">NEX FLOW COMPASS</span>
                  <h4 className="font-display font-medium text-white text-xs">AI Focus Coach Chatbot</h4>
                </div>
              </div>

              {/* Animated text rendering */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-xs leading-relaxed text-white/80 font-mono relative">
                <span className="absolute top-2 right-2 text-[10px] opacity-45">✦ AI</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentCoachMsgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    "{coachMessages[currentCoachMsgIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-white/30">
                <span>Self-Assessment rate: 99.4%</span>
                <span>Interval: Syncing live</span>
              </div>
            </div>

            {/* Shield Distraction Controller Active Indicators */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    isShieldActive 
                      ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-400 animate-pulse" 
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}>
                    {isShieldActive ? <Shield className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs">Distraction Attention Shield</h5>
                    <p className={`text-[10px] mt-0.5 ${isShieldActive ? "text-cyan-400 font-bold" : "text-white/40"}`}>
                      {isShieldActive ? "SHIELD SECURED" : "OFF (NOT RECOMMEND)"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsShieldActive(!isShieldActive)}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold transition-all ${
                    isShieldActive 
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40 hover:bg-cyan-400/30" 
                      : "bg-[#FF4D4D]/20 text-[#FF4D4D] border border-red-500/40 hover:bg-red-500/30"
                  }`}
                >
                  {isShieldActive ? "Silence Active" : "Bypass Mode"}
                </button>
              </div>
            </div>

          </div>

          {/* MAIN CENTER: Panoramic Chamber Screen Frame with massive dynamic timer */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center bg-[#070B14]/80 border border-white/10 rounded-[3.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Backdrop interactive waves drawing */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Inner HUD Overlays */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-ping"></span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest"> CHAMBER ONLINE </span>
            </div>

            <div className="absolute top-6 right-6 z-10 font-mono">
              <span className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/70">
                🚀 COGNITIVE SPEED: 1.5x
              </span>
            </div>

            {/* Center Massive Timer Circle Element */}
            <div className="relative w-72 h-72 rounded-full flex items-center justify-center my-10 z-10 select-none">
              
              {/* Surrounding Energy pulses glow */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-white/5 transition-all duration-700"
                style={{ borderColor: isRunning ? `${currentEnv.color}22` : "rgba(255,255,255,0.05)" }}
              ></div>

              {/* Glowing decorative rings */}
              <svg className="absolute inset-2 w-full h-full transform -rotate-90 scale-95">
                <circle
                  cx="135"
                  cy="135"
                  r="115"
                  className="stroke-white/[0.02]"
                  strokeWidth="8"
                  fill="transparent"
                />
                
                {/* Visual completion ring */}
                <motion.circle
                  cx="135"
                  cy="135"
                  r="115"
                  stroke={currentEnv.color}
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray={722.5}
                  initial={{ strokeDashoffset: 722.5 }}
                  animate={{ strokeDashoffset: 722.5 - (722.5 * timerPercentageDone) / 100 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Micro interactive energy wave indicator */}
              <div className="absolute inset-10 rounded-full bg-[#070B14]/85 backdrop-blur-2xl flex flex-col justify-center items-center text-center shadow-inner border border-white/10">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">STUDY TIMEOUT</span>
                
                {/* Time layout */}
                <h3 className="text-6xl font-black font-mono tracking-tighter text-white mt-1 select-all hover:text-[#4DA3FF] transition-colors">
                  {formatTime(timeLeft)}
                </h3>

                <span className="text-[9px] font-bold text-[#EC4899] uppercase tracking-widest mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span> LOCKED IN 🔥
                </span>

                <span className="text-[9px] text-white/40 font-mono mt-0.5 uppercase tracking-wider">{currentEnv.name} Mode</span>
              </div>
            </div>

            {/* Timer Controllers Grid */}
            <div className="z-10 w-full grid grid-cols-12 gap-3 mb-6">
              
              {/* Play Pause Trigger */}
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`col-span-8 py-3 rounded-2xl font-bold font-display text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                  isRunning 
                    ? "bg-white/10 hover:bg-white/15 text-white border border-white/20" 
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 text-[#FF4D4D]" fill="currentColor" /> Pause Core
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-green-500" fill="currentColor" /> Initiate Session
                  </>
                )}
              </button>

              {/* Reset to 45 mins */}
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(INITIAL_TIME);
                }}
                className="col-span-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 active:scale-95 transition-all text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
                title="Restart Session Goal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Large Glowing Stay Locked In Action Button */}
            <div className="z-10 w-full">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStayLockedIn}
                className="relative overflow-hidden w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#4DA3FF] via-[#9B6DFF] to-[#EC4899] font-black text-sm tracking-widest uppercase text-white shadow-[0_15px_30px_rgba(155,109,255,0.3)] transition-all cursor-pointer select-none"
              >
                {/* Animating highlight lines inside the button */}
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay w-1/2 -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  {isLockedInButtonClicked ? "✦ COGNITIVE RECOVERY SYNCED ✦" : "STAY LOCKED IN"}
                </span>
              </motion.button>

              <p className="text-[10px] text-white/35 font-mono text-center uppercase tracking-widest mt-2">
                Click above to instantly anchor attention with a biometrical pulse reset
              </p>
            </div>

          </div>

          {/* RIGHT: Gamification, Live Metrics, Rewards Tracker */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full">
            
            {/* Live Metrics Column */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#4DA3FF]/20 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black block">LIVE TRACKER SENSORS</span>
                <span className="text-[10px] text-green-400 font-mono flex items-center gap-1 animate-pulse">
                  ● ACTIVE FEED
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Focus Stability Index", val: `${focusStability}%`, desc: "Attention spikes within variance bands", color: "text-[#4DA3FF]" },
                  { label: "Distraction Infiltration Score", val: distractionLevel, desc: "Ambient decibels and visual flickers", color: "text-green-400" },
                  { label: "Productivity Health Output", val: `${productivityScore}%`, desc: "Active keyboard / study state velocity", color: "text-purple-400" },
                  { label: "Overall Study Session Quality", val: sessionQuality, desc: "Tuned to legendary peak performance metrics", color: "text-[#EC4899]" }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between text-xs font-mono font-medium">
                      <span className="text-white/60">{item.label}</span>
                      <span className={`font-black ${item.color}`}>{item.val}</span>
                    </div>
                    <div className="text-[10px] text-white/35 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gamification Core Tracker Module */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#9B6DFF]/20 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-white/50 font-mono">GAMIFIED INTEGRATION</span>
                </div>
                <span className="text-[9px] text-[#9B6DFF] font-mono font-bold uppercase">Rank: Elite</span>
              </div>

              {/* Status details */}
              <div className="space-y-4.5">
                
                <div className="flex items-center justify-between bg-white/[0.01] border border-white/5 p-3 rounded-2xl">
                  <div>
                    <span className="text-[9px] font-mono text-white/40 uppercase block">CURRENT COGNITIVE RANK</span>
                    <span className="text-sm font-bold font-display text-white mt-0.5 flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-400" /> Deep Work Elite
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-white/40 block">STREAK RATING</span>
                    <span className="text-sm font-bold text-orange-400 flex items-center justify-end gap-0.5 font-mono">
                      <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> {currentStreak} days
                    </span>
                  </div>
                </div>

                {/* Progress bar tracking XP */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1.5">
                    <span className="text-white/60">XP Progress to Next Rank Tier</span>
                    <span className="text-white font-bold">14,250 / 15,000 XP</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-[#4DA3FF] to-[#9B6DFF] h-full" style={{ width: "95%" }}></div>
                  </div>
                </div>

                {/* Performance milestones */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase block">DAILY GOAL</span>
                    <div className="font-bold text-xs text-white mt-1">3 Hours</div>
                    <div className="text-[9px] text-white/30 truncate mt-0.5">Completed 1h 45m</div>
                  </div>

                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase block">TODAY'S MISSION</span>
                    <div className="font-bold text-xs text-[#EC4899] mt-1">Goal Completing</div>
                    <div className="text-[9px] text-white/30 truncate mt-0.5">90% of index score</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Rewards Checklist */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#EC4899]/20 transition-all duration-300">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black block mb-4">
                POTENTIAL MILESTONE REWARDS
              </span>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all">
                  <div className="w-7 h-7 bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center rounded-lg font-mono font-bold text-[10px]">
                    XP
                  </div>
                  <div>
                    <span className="text-white font-semibold">+{sessionXP} Overall Base XP score</span>
                    <p className="text-[10px] text-white/40 mt-0.5">Syncing instantly upon goal timeline arrival</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all">
                  <div className="w-7 h-7 bg-[#4DA3FF]/10 border border-[#4DA3FF]/20 text-[#4DA3FF] flex items-center justify-center rounded-lg font-mono font-bold text-[10px]">
                    STRK
                  </div>
                  <div>
                    <span className="text-white font-semibold">+1 Absolute Daily Focus Streak</span>
                    <p className="text-[10px] text-white/40 mt-0.5">Keeps daily compliance record streak safe</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all">
                  <div className="w-7 h-7 bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center rounded-lg font-mono font-bold text-[10px]">
                    BDG
                  </div>
                  <div>
                    <span className="text-white font-semibold">Deep Work Badge Progress</span>
                    <p className="text-[10px] text-white/40 mt-0.5">Currently matching: {deepWorkProgress}% consistency metrics</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
