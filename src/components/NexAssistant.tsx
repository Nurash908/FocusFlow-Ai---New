import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  Terminal, 
  Brain, 
  Clock, 
  Target, 
  TrendingUp, 
  Compass, 
  HelpCircle, 
  Activity, 
  CheckCircle2, 
  MessageSquare, 
  Cpu, 
  Flame, 
  ChevronRight, 
  User, 
  Zap, 
  Award, 
  Info,
  RefreshCw,
  Eye,
  Shield,
  Smartphone,
  ChevronLeft
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Message {
  id: string;
  sender: "user" | "nex";
  text: string;
  timestamp: string;
}

interface CoachSuggestion {
  text: string;
  category: "consistency" | "achievement" | "wellness" | "action";
  impact: string;
}

interface GoalState {
  title: string;
  target: string;
  current: string;
  percentage: number;
  suggestion: string;
}

// ==========================================
// FLOATING HOLOGRAPHIC AI ORB CANVAS
// ==========================================
function HolographicOrb({ isSpeaking }: { isSpeaking: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    let pulseFactor = 0;

    canvas.width = 170;
    canvas.height = 170;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Generate rings orbital points
    const points: { angle: number; speed: number; radius: number; color: string; size: number }[] = [];
    for (let i = 0; i < 40; i++) {
      points.push({
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        radius: 35 + Math.random() * 32,
        color: Math.random() > 0.5 ? "#22d3ee" : "#a855f7", // cyan or purple
        size: Math.random() * 2 + 1
      });
    }

    const render = () => {
      ctx.fillStyle = "rgba(7, 11, 20, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Speeds up pulse and orbits if NEX is actively typing / speaking
      const deltaRotation = isSpeaking ? 0.05 : 0.012;
      const deltaPulse = isSpeaking ? 0.12 : 0.04;
      
      rotation += deltaRotation;
      pulseFactor += deltaPulse;

      const scalePulse = 1 + Math.sin(pulseFactor) * 0.08;

      // Atmospheric spatial purple-cyan glow back layer
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, 70 * scalePulse
      );
      outerGlow.addColorStop(0, "rgba(168, 85, 247, 0.18)"); // Purple Glow
      outerGlow.addColorStop(0.5, "rgba(34, 211, 238, 0.08)"); // Cyan Glow
      outerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 75 * scalePulse, 0, Math.PI * 2);
      ctx.fill();

      // Energetic inner core
      const coreGlow = ctx.createRadialGradient(
        centerX, centerY, 2,
        centerX, centerY, 24 * scalePulse
      );
      coreGlow.addColorStop(0, "#ffffff");
      coreGlow.addColorStop(0.3, "rgba(34, 211, 238, 0.95)"); // Brilliant cyan
      coreGlow.addColorStop(0.7, "rgba(168, 85, 247, 0.4)"); // Magical purple
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25 * scalePulse, 0, Math.PI * 2);
      ctx.fill();

      // Concentric orbiting rings representing orbital neural fields
      ctx.lineWidth = 1;
      
      // Orbit Ring 1
      ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 42 * scalePulse, rotation, rotation + Math.PI * 1.55);
      ctx.stroke();

      // Orbit Ring 2
      ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 55 * scalePulse, -rotation * 1.2, -rotation * 1.2 + Math.PI * 1.1);
      ctx.stroke();

      // Orbit Ring 3
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 62 * scalePulse, rotation * 0.7, rotation * 0.7 + Math.PI * 0.82);
      ctx.stroke();

      // Rendering floating particles bound to custom orbital speeds
      points.forEach(p => {
        p.angle += p.speed;
        
        const finalRadius = p.radius * scalePulse;
        const px = centerX + Math.cos(p.angle) * finalRadius;
        const py = centerY + Math.sin(p.angle) * finalRadius;

        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        const flickerRadius = p.size * (0.8 + Math.sin(pulseFactor * 1.5) * 0.2);
        ctx.arc(px, py, flickerRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // Clear blur
      });

      // Quick outer boundary orbital node details
      const nodeAngle = rotation * 1.5;
      const nx = centerX + Math.cos(nodeAngle) * (62 * scalePulse);
      const ny = centerY + Math.sin(nodeAngle) * (62 * scalePulse);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Visual line tethering particle to center core
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(nx, ny);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isSpeaking]);

  return (
    <div className="relative flex items-center justify-center select-none">
      <canvas ref={canvasRef} className="block relative z-[5]" />
      
      {/* Holographic glowing back-mesh ring */}
      <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-500/20 animate-spin pointer-events-none" style={{ animationDuration: "12s" }}></div>
      <div className="absolute w-[150px] h-[150px] rounded-full border border-purple-500/10 animate-spin pointer-events-none" style={{ animationDuration: "18s", animationDirection: "reverse" }}></div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function NexAssistant() {
  // Mobile app virtual messages
  const [conversations, setConversations] = useState<Message[]>([
    {
      id: "m-1",
      sender: "nex",
      text: "Outstanding progress today Nurash! 👋 I analyzed your study streams: you managed 4 solid focus sessions, keeping distractions exceptionally low. Your overall focus score is up 12% in the last 24 hours.",
      timestamp: "6:12 PM"
    },
    {
      id: "m-2",
      sender: "user",
      text: "Why did my focus score drop today around 4 PM?",
      timestamp: "6:14 PM"
    },
    {
      id: "m-3",
      sender: "nex",
      text: "At 4:10 PM, your screen unlocked 6 times in 20 minutes, aligned with social media activity. This caused a 23% distraction spike. Scheduling a quick 15-minute diagnostic detox task will recover your cognitive flow index.",
      timestamp: "6:15 PM"
    }
  ]);

  const [inputVal, setInputVal] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Motivational Quotes Cycle
  const quotes = [
    "Momentum is your superpower. Act before the friction settles.",
    "Your future self is thanking you for this exact focus block.",
    "Small atomic progress every single day generates colossal results.",
    "Do not let algorithm feeds dictate your neurological reward baseline.",
    "Stay locked in. Your cognitive endurance increases with every minute of silence."
  ];
  const [quoteIdx, setQuoteIdx] = useState<number>(0);

  // Quick cycle for motivation engine
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % quotes.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  // Goal Assistant state
  const goals: GoalState = {
    title: "Daily Goal",
    target: "3 Hours Focus Time",
    current: "2 Hours 15 Mins",
    percentage: 75,
    suggestion: "One final 45-minute focus sequence will secure today's targets."
  };

  // Daily AI Insights state
  const dailyFocusTime = "4h 21m";
  const dailyFocusScore = "89%";
  const dailyDistractions = "Low Focus Leak";
  const bestProdWindow = "7:00 PM – 8:30 PM";

  // Quick learning shortcuts
  const studyTips = [
    {
      title: "Interleaving Strategy",
      desc: "Switch between chemistry equations and biology charts to cultivate mental flexibility.",
      tag: "Technique"
    },
    {
      title: "Active Retrieval",
      desc: "Close the textbook and write down everything you remember onto a blank scratchpad first.",
      tag: "Revision"
    },
    {
      title: "2-Min Friction Rule",
      desc: "Set your books open with pencils out of the drawer prior to starting a deep-work timer.",
      tag: "Friction"
    }
  ];

  // AI suggestions list
  const initialCoaches: CoachSuggestion[] = [
    {
      text: "Your focus consistency improved by 18% compared to last Monday.",
      category: "consistency",
      impact: "+180 Focus Points"
    },
    {
      text: "Completing one more focus session today unlocks the 'Prefrontal Dominance' Award.",
      category: "achievement",
      impact: "Unlock Badge"
    },
    {
      text: "By switching study spots, you can reduce visual fatigue and increase focus by up to 15%.",
      category: "wellness",
      impact: "Reduce Fatigue"
    },
    {
      text: "Consider disabling Instagram notifications during your prime 6 PM study hour.",
      category: "action",
      impact: "Prevent Leak"
    }
  ];

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);

  // Custom prompt responses list helper
  const handleTriggerPreset = (promptText: string) => {
    if (isTyping) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversations(p => [...p, { id: `m-preset-u-${Date.now()}`, sender: "user", text: promptText, timestamp }]);
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Fascinating query! I have adjusted your cognitive load profile. Let's start with a customized study block to isolate active focus loops.";
      
      if (promptText.toLowerCase().includes("improve my focus")) {
        replyText = "Your high-focus baseline occurs between 6:00 PM and 8:30 PM. I suggest scheduling complex math modules or revision tasks strictly during this period, and leaving video calls or research for earlier.";
      } else if (promptText.toLowerCase().includes("why did my focus score drop")) {
        replyText = "The distraction rate increased by 28%. App log data indicates a high volume of notification triggers between 3:45 PM and 4:20 PM. Set your lock device mode immediately.";
      } else if (promptText.toLowerCase().includes("motivational nudge")) {
        replyText = "Physical action destroys mental resistance. Remember, motivation isn't born from waiting; it is forged by starting a 10-minute focus sequence. Go do the work right now!";
      } else if (promptText.toLowerCase().includes("productivity trend prediction")) {
        replyText = "Analyzing your historical focus streams: Next week's expected focus score is 92% with 24 total study hours, provided you lock in at least one daily block prior to 8 PM.";
      }

      setConversations(p => [...p, {
        id: `m-preset-n-${Date.now()}`,
        sender: "nex",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  // User manual sending logic
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userText = inputVal;
    setInputVal("");
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConversations(p => [...p, { id: `m-user-${Date.now()}`, sender: "user", text: userText, timestamp }]);
    setIsTyping(true);

    // AI smart local responder logic
    setTimeout(() => {
      let responseText = `Neural analysis updated: I've logged your query "${userText}". To optimize cognitive performance, limit browsing tabs to 3 and initialize your scheduled chemistry revision task.`;
      
      const textMatch = userText.toLowerCase();
      if (textMatch.includes("hello") || textMatch.includes("hi ") || textMatch.includes("hey")) {
        responseText = "Good evening, classmate! NEX is online. I'm ready to audit your cognitive output, build active review schedules, or execute quick micro-break interventions. What are we studying?";
      } else if (textMatch.includes("study") || textMatch.includes("exam") || textMatch.includes("learn") || textMatch.includes("focus")) {
        responseText = "Focusing on exam preparation? Excellent. Adopt active retrieval: take a blank slate and list five core concepts without using your textbooks first. This doubles information storage duration!";
      } else if (textMatch.includes("tired") || textMatch.includes("sleep") || textMatch.includes("exhausted")) {
        responseText = "Fatigue detected. Your prefrontal cortex has saturated high-reward dopamine markers. Let's swap the study block for a 5-minute deep diaphragmatic breathing sequence and dim screen levels.";
      } else if (textMatch.includes("motivation") || textMatch.includes("motivate") || textMatch.includes("lazy")) {
        responseText = "Understood. The friction to begin studying is calculated at 84% today. Action inspires motivation, not vice-versa. Start with our 2-Minute Friction Challenge and focus on only one formula first.";
      } else if (textMatch.includes("rot") || textMatch.includes("scroll") || textMatch.includes("tiktok") || textMatch.includes("youtube")) {
        responseText = "Alert: Dopamine loops detected. Every short video drains visual and conceptual reading attention spans by 4.2%. Click 'Detox Cleanse' in the Brain Rot Meter below to initialize security shields immediately.";
      }

      setConversations(p => [...p, {
        id: `m-nex-${Date.now()}`,
        sender: "nex",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1400);
  };

  // Scroll to bottom helper
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, isTyping]);

  return (
    <div id="nex" className="py-12 relative overflow-hidden text-white w-full">
      {/* Immersive Neural Energy grid backdrops */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 right-[-10%] w-[550px] h-[550px] bg-purple-500/10 blur-[160px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4DA3FF]">NEURAL ENGAGEMENT HUB</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-none">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400">NEX AI Assistant</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg mt-3 leading-relaxed font-sans font-medium">
            The beating heart and central companion of FocusFlow AI. NEX monitors physical study signals, mitigates app-scrolling traps, and delivers predictive cognitive projections to guarantee academic excellence.
          </p>
        </div>

        {/* Master Workspace Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: Futuristic smartphone mockup frame */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[385px] aspect-[9/19.5] bg-[#0E1326] border-[6px] border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between" id="smartphone-mockup-frame">
              
              {/* Phone Status bar */}
              <div className="relative z-20 px-8 pt-4 pb-2.5 flex justify-between items-center text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-1.5 font-bold">
                  <span>9:41</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                {/* Dynamic Camera Notch Island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full border border-white/5 flex items-center justify-center">
                  <span className="text-[7.5px] font-mono font-black text-cyan-400 tracking-widest uppercase">NEX ACTIVE OS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>NEX v3.1</span>
                  <div className="flex gap-0.5 items-end">
                    <div className="w-[1.5px] h-2 bg-white/40"></div>
                    <div className="w-[1.5px] h-2.5 bg-white/50"></div>
                    <div className="w-[1.5px] h-3 bg-cyan-400"></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Greeting screen layout on top */}
              <div className="px-6 pt-3 pb-4 border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white/50">Good Evening,</h4>
                    <h3 className="font-display text-2xl font-extrabold text-white mt-0.5 flex items-center gap-1">
                      Nurash <span className="animate-wiggle">👋</span>
                    </h3>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[10px] font-semibold font-mono text-purple-300">
                    🔥 12-Day Streak
                  </div>
                </div>
              </div>

              {/* HOLO COMPANION CENTER ORB CONTAINER */}
              <div className="py-2 flex flex-col items-center justify-center relative shrink-0">
                {/* Visual backdrop blur effects */}
                <div className="absolute w-36 h-36 bg-[#00f2fe]/5 blur-2xl rounded-full z-0 animate-pulse"></div>
                
                {/* Real interactive CANVAS holographic orb */}
                <HolographicOrb isSpeaking={isTyping} />
                
                <div className="mt-[-8px] text-center z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[9px] font-mono tracking-wider font-extrabold text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    SYNAPTIC FIELD REACTIVE
                  </div>
                </div>
              </div>

              {/* ACTIVE DIALOG CONVERSATION CONSOLE */}
              <div className="flex-1 overflow-hidden px-5 flex flex-col justify-end">
                <div 
                  ref={scrollRef}
                  className="max-h-[220px] overflow-y-auto mb-3 pr-1 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none flex flex-col"
                >
                  <AnimatePresence initial={false}>
                    {conversations.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"}`}
                      >
                        {/* Speaker Avatar Icon */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                          msg.sender === "nex" 
                            ? "bg-gradient-to-tr from-cyan-400 to-purple-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                            : "bg-white/10 text-white"
                        }`}>
                          {msg.sender === "nex" ? "N" : "U"}
                        </div>
                        
                        {/* Message Bubble styling - Frosted Glassmorphism */}
                        <div className={`p-3 rounded-2xl relative ${
                          msg.sender === "nex"
                            ? "bg-white/[0.03] border border-white/10 text-white/85 text-[11px] leading-relaxed"
                            : "bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-[11px] font-semibold"
                        }`}>
                          <p>{msg.text}</p>
                          <span className="text-[7.5px] opacity-40 font-mono tracking-wider block text-right mt-1 font-medium select-none">
                            {msg.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* AI Pulse Typing element */}
                  {isTyping && (
                    <div className="flex gap-2 max-w-[70%] self-start items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex gap-1 items-center shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIVE PHONE MESSAGE TEXT INPUT PANEL */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 backdrop-blur-md shrink-0 relative z-20">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-1.5">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask NEX (improve focus, trends)..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[11px] font-sans font-medium text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button 
                    type="submit" 
                    className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#22d3ee] to-[#a855f7] flex items-center justify-center text-white active:scale-95 transition-transform hover:opacity-90 shadow-[0_0_12px_rgba(34,211,238,0.3)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                {/* Small indicator label */}
                <div className="text-[8px] font-mono text-center text-white/30 mt-1.5 tracking-wider uppercase font-extrabold select-none">
                  NEX AI COGNITIVE CHANNELS INITIALIZED
                </div>
              </div>

            </div>
          </div>


          {/* RIGHT SIDE: Dynamic Bento panels detailing stats, coaching & prediction forecast charts */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            
            {/* Top Widget Row: Daily Insights + Motivation Engine */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* Daily AI Insights Card */}
              <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between" id="daily-insights-widget">
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-cyan-500/10 blur-[40px] pointer-events-none rounded-full"></div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">Daily Summary</span>
                  </div>
                  <h4 className="font-display text-sm font-semibold text-white/40 mb-3">Today&apos;s Focus Status:</h4>
                  
                  <div className="space-y-2 font-mono text-xs mb-4">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/60">Focus Duration:</span>
                      <strong className="text-white font-black">{dailyFocusTime}</strong>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/60">Focus Score:</span>
                      <strong className="text-cyan-400 font-bold">{dailyFocusScore}</strong>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/60">Distraction Density:</span>
                      <strong className="text-emerald-400 font-semibold">{dailyDistractions}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Best Performance:</span>
                      <strong className="text-[#a855f7] font-semibold">{bestProdWindow}</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/5 p-3 rounded-xl border border-cyan-400/10 animate-fade-in">
                  <span className="text-[9px] font-mono text-cyan-400 font-black block">AI RECOMMENDATION:</span>
                  <p className="text-[11px] text-white/70 leading-normal font-sans font-medium mt-1">
                    Continue scheduling challenging revision modules strictly within your prime performance zone.
                  </p>
                </div>
              </div>

              {/* Goal Assistant & Motivation Engine Panel */}
              <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between" id="goal-motivation-widget">
                <div className="absolute top-[-20%] left-[-20%] w-32 h-32 bg-purple-500/10 blur-[40px] pointer-events-none rounded-full"></div>
                
                {/* Active Goal tracker */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-widest">Goal Assistant</span>
                  </div>
                  <h4 className="font-display text-xs font-semibold text-white/50">{goals.title}</h4>
                  <div className="flex justify-between items-baseline mt-1">
                    <strong className="text-base text-white font-display font-bold">{goals.target}</strong>
                    <span className="text-[10px] font-mono text-purple-400">{goals.percentage}% Progress</span>
                  </div>

                  {/* Glowing progress slider bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-2 relative border border-white/5">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: `${goals.percentage}%` }}></div>
                  </div>
                  <span className="text-[10px] font-sans text-white/40 block mt-1">Current logged stats: {goals.current}</span>
                </div>

                {/* Live suggestion snippet */}
                <div className="my-3 py-2 border-t border-b border-white/5 font-mono text-[10px] text-purple-200 leading-normal">
                  💡 NEX Suggestion: &quot;{goals.suggestion}&quot;
                </div>

                {/* Motivation Engine panel */}
                <div className="pt-2">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block font-extrabold">MOTIVATION ENGINE</span>
                  <div className="mt-1 flex gap-2 items-start h-10 overflow-hidden">
                    <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                    <p className="text-[10px] text-white/80 leading-relaxed font-sans font-medium italic transition-all duration-500">
                      &quot;{quotes[quoteIdx]}&quot;
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Middle: Productivity Forecast Chart Card */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden" id="productivity-forecast-graph">
              <span className="text-[10px] font-mono text-indigo-400 font-black block mb-4 uppercase tracking-wider">NEX WEEKLY PRODUCTIVITY FORECAST</span>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* SVG Visual Projection Chart */}
                <div className="md:col-span-8 flex flex-col justify-end">
                  <div className="relative w-full h-[120px] select-none">
                    
                    {/* SVG Graphic Grid backing and projected curve */}
                    <svg className="w-full h-full text-white/10" viewBox="0 0 400 120" preserveAspectRatio="none">
                      {/* Grid Horizontal guide lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="0" y1="90" x2="400" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      
                      {/* Grid Vertical day bounding lines */}
                      <line x1="1" y1="0" x2="1" y2="120" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="100" y1="0" x2="100" y2="120" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="200" y1="0" x2="200" y2="120" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="300" y1="0" x2="300" y2="120" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="399" y1="0" x2="399" y2="120" stroke="currentColor" strokeWidth="0.5" />

                      {/* Actual Historical Performance Gradient Area */}
                      <path
                        d="M 1,95 L 50,88 L 100,75 L 150,82 L 200,60 L 250,55 L 250,120 L 1,120 Z"
                        fill="url(#charGradient)"
                        opacity="0.15"
                      />

                      {/* Actual Solid Line */}
                      <path
                        d="M 1,95 L 50,88 L 100,75 L 150,82 L 200,60 L 250,55"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Projected dash predictive model continuation */}
                      <path
                        d="M 250,55 L 300,42 L 350,32 L 399,20"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />

                      {/* Graphic Gradient defs */}
                      <defs>
                        <linearGradient id="charGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>

                      {/* Key Indicators Dot */}
                      <circle cx="200" cy="60" r="5" fill="#22d3ee" className="animate-ping" style={{ transformOrigin: "200px 60px" }} />
                      <circle cx="200" cy="60" r="3.5" fill="#ffffff" />
                      
                      <circle cx="350" cy="32" r="4.5" fill="#a855f7" />
                    </svg>

                    {/* Chart Tooltip floating display */}
                    <div className="absolute top-4 left-[210px] bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded-lg backdrop-blur-md text-[9px] font-mono pointer-events-none">
                      <span className="text-cyan-400 font-bold">Thu Score</span>: 81
                    </div>
                  </div>

                  {/* Horizontal Axis Legends */}
                  <div className="flex justify-between font-mono text-[9px] text-white/40 mt-2 select-none">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu (Today)</span>
                    <span className="text-purple-400 font-extrabold animate-pulse">Fri (Model Prediction)</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Projections Key Info stats */}
                <div className="md:col-span-4 space-y-3 font-mono text-[10px] pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0">
                  <div className="bg-white/[0.02] p-2 rounded-xl">
                    <span className="text-white/40 block text-[8px]">EXPECTED WEEKLY INDEX</span>
                    <strong className="text-lg text-white font-display font-black">92% Focus</strong>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-xl">
                    <span className="text-white/40 block text-[8px]">ESTIMATED STUDY LOAD</span>
                    <strong className="text-lg text-[#22d3ee] font-display font-black">24 Hours</strong>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold tracking-wider uppercase text-[8px]">Trend: Increasing</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Section: Smart Coaching Dashboard + Learning Shortcuts */}
            <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden" id="suggestions-coach-panel">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#4DA3FF] font-black uppercase tracking-widest block">PERSONALIZED SUGGESTIONS ENGINE</span>
                  <span className="text-xs text-white/30 block mt-0.5">Click indicators to toggle coaching categories</span>
                </div>
                
                {/* Floating Navigation filters simulating category triggers */}
                <div className="flex gap-1.5 flex-wrap">
                  {["consistency", "achievement", "wellness", "action"].map((category, idx) => (
                    <button
                      key={category}
                      onClick={() => setActiveSuggestionIndex(idx)}
                      className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold capitalize transition-all select-none cursor-pointer ${
                        activeSuggestionIndex === idx
                          ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-[#22d3ee] border border-[#22d3ee]/40"
                          : "bg-white/[0.01] hover:bg-white/5 text-white/40 border border-transparent"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions Showcase card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-[9px] font-mono text-cyan-300 font-extrabold uppercase tracking-wider">
                      Active Advice: {initialCoaches[activeSuggestionIndex].category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white/90 leading-relaxed font-sans">
                    💡 &quot;{initialCoaches[activeSuggestionIndex].text}&quot;
                  </p>
                </div>

                <div className="md:col-span-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-950/40 to-transparent border border-indigo-500/10 rounded-2xl text-center">
                    <span className="text-[8px] font-mono text-white/40 block uppercase tracking-widest leading-none mb-1">PROJ ENERGY PAYOUT</span>
                    <strong className="text-sm font-mono text-[#a855f7] font-black">
                      {initialCoaches[activeSuggestionIndex].impact}
                    </strong>
                    <div 
                      className="mt-2 text-[10px] font-sans font-semibold text-[#22d3ee] flex items-center justify-center gap-1 cursor-pointer hover:underline" 
                      onClick={() => handleTriggerPreset(initialCoaches[activeSuggestionIndex].text)}
                    >
                      Apply Tip <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Study helper quick desk shortcuts */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[9px] font-mono text-white/30 block mb-3 uppercase tracking-wider font-extrabold">STUDY HELPER QUICKSHEETS</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {studyTips.map((tip, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleTriggerPreset(`NEX, explain the ${tip.title} method.`)}
                      className="p-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-cyan-400/30 rounded-2xl transition-all cursor-pointer select-none group"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-mono font-bold text-[#4DA3FF] bg-[#4DA3FF]/10 px-1.5 py-0.5 rounded uppercase">
                          {tip.tag}
                        </span>
                        <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h5 className="text-xs font-bold text-white mb-1 group-hover:text-cyan-300">
                        {tip.title}
                      </h5>
                      <p className="text-[10px] text-white/50 leading-relaxed font-sans font-medium line-clamp-3">
                        {tip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
