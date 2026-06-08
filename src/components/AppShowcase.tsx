import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, UserCheck, Play, Award, Eye, Bell, Activity, Settings, LayoutDashboard, Clock } from "lucide-react";

export default function AppShowcase() {
  const [activeScreenTab, setActiveScreenTab] = useState("lockin");
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Focus Core Timer loop simulation
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(1500);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const screens = [
    { id: "splash", label: "Splash Screen" },
    { id: "login", label: "Login Portal" },
    { id: "dashboard", label: "Student Dashboard" },
    { id: "gamification", label: "Gamify Screen" },
    { id: "lockin", label: "Lock-In Focus Mode" },
    { id: "analytics", label: "AI Analytics" },
    { id: "teacher", label: "Teacher Portal" },
    { id: "settings", label: "Settings Pane" }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#101827]/40 border-y border-white/5">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-purple-400 uppercase">Immersive App Demo</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight leading-none">
            App Experience Showcase
          </h2>
          <p className="text-lg text-white/50 mt-4 font-sans">
            Touch to interact. Switch different device states to witness the mobile student interface operating within real system components.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Navigation/Selector Panel (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <h4 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2 font-bold">Interactive Layouts</h4>
            {screens.map(scr => (
              <button
                key={scr.id}
                onClick={() => setActiveScreenTab(scr.id)}
                className={`w-full py-4 px-6 rounded-2xl text-left font-display font-medium text-sm transition-all border flex justify-between items-center ${activeScreenTab === scr.id ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-[#4DA3FF]/40 text-[#4DA3FF]" : "bg-white/[0.01] hover:bg-white/[0.03] border-white/5 text-white/70"}`}
              >
                <span>{scr.label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            ))}
          </div>

          {/* Interactive Phone Core Mockup (Center/Right) */}
          <div className="lg:col-span-8 flex justify-center items-center relative">
            
            {/* Background glowing halo */}
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#4DA3FF]/10 to-[#9B6DFF]/15 blur-3xl rounded-full scale-100 pointer-events-none"></div>

            <motion.div
              initial={{ rotateY: -15, scale: 0.95 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-72 sm:w-80 h-[620px] rounded-[3.5rem] border-[12px] border-white/10 bg-gradient-to-b from-[#151C2F] to-[#070B14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col focus:outline-none"
            >
              
              {/* Dynamic Screen Content rendered internally based on selected tab */}
              <div className="flex-1 p-5 pt-10 flex flex-col justify-between overflow-hidden relative font-sans text-white">
                
                {/* Top Notch Area */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-[#101827] border border-white/5 z-20 flex justify-center items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
                </div>

                <AnimatePresence mode="wait">
                  
                  {/* SPLASH SCREEN */}
                  {activeScreenTab === "splash" && (
                    <motion.div
                      key="splash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4DA3FF] to-[#9B6DFF] flex items-center justify-center p-0.5">
                        <div className="w-full h-full rounded-2xl bg-[#070B14] flex items-center justify-center">
                          <Clock className="w-8 h-8 text-[#4DA3FF]" />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-2xl tracking-tighter">FOCUSFLOW</h3>
                      <p className="text-[10px] text-white/40 tracking-widest uppercase">CONSTRUCTING FLOW STATE...</p>
                    </motion.div>
                  )}

                  {/* LOGIN SCREEN */}
                  {activeScreenTab === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-between pt-6 pb-2"
                    >
                      <div className="text-center pt-4">
                        <h3 className="font-display font-semibold text-lg">Initialize Cognition</h3>
                        <p className="text-[11px] text-white/50 mt-1">Acquire neural link authentication credentials</p>
                      </div>
                      
                      <div className="space-y-3.5">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono text-white/40 uppercase">Student Email ID</label>
                          <input type="text" placeholder="student@academic.edu" disabled className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs placeholder-white/35" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono text-white/40 uppercase">Security Key</label>
                          <input type="password" value="**************" disabled className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white/40" />
                        </div>
                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-xs shadow-lg">
                          Authenticate System
                        </button>
                      </div>

                      <p className="text-[10px] text-center text-white/40 font-mono">COPPA SECURED DATA PACK</p>
                    </motion.div>
                  )}

                  {/* STUDENT DASHBOARD */}
                  {activeScreenTab === "dashboard" && (
                    <motion.div
                      key="dashboard"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col pt-4 gap-4 overflow-y-auto scrollbar-none"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[9px] font-mono text-white/40 uppercase">WELCOME BACK</p>
                          <h4 className="text-sm font-semibold">Jordan K.</h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-0.5">
                          <Award className="w-4 h-4 text-[#4DA3FF]" />
                        </div>
                      </div>

                      {/* Daily Streak Banner */}
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                        <span className="text-xs text-white/80 font-semibold font-display">Daily Streak: 12 Days</span>
                        <span className="text-[10px] text-cyan-400 font-mono font-bold">+200 XP</span>
                      </div>

                      {/* Focus overview metric */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                          <span className="text-[9px] text-white/40 font-mono uppercase block">FOCUS XP</span>
                          <span className="text-lg font-bold">14,200</span>
                        </div>
                        <div className="p-3 bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 rounded-2xl">
                          <span className="text-[9px] text-[#FF4D4D] font-mono uppercase block">SCREEN ROT</span>
                          <span className="text-lg font-bold text-[#FF4D4D]">24%</span>
                        </div>
                      </div>

                      {/* Goal list */}
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-[9px] font-mono text-white/40 uppercase">ACTIVE MISSIONS</span>
                        {["Complete 2 Pomodoro Sessions", "Block TikTok Trigger for 4 Hrs", "Level up to Neural Explorer"].map((task, i) => (
                          <div key={i} className="flex gap-2.5 items-center bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                            <span className="w-3.5 h-3.5 rounded-md border border-white/20 flex items-center justify-center text-[10px]"></span>
                            <span className="text-[10px] text-white/70">{task}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* GAMIFICATION SCREEN */}
                  {activeScreenTab === "gamification" && (
                    <motion.div
                      key="gamification"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col pt-4 gap-4"
                    >
                      <h4 className="text-sm font-semibold text-center border-b border-white/5 pb-2">Ranks & Badges</h4>
                      
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                        <span className="text-[10px] text-white/40 font-mono uppercase">CURRENT MILESTONE</span>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4DA3FF] to-indigo-500 animate-pulse flex items-center justify-center text-[10px] font-bold text-wrap text-center">
                          NEURAL EXP
                        </div>
                        <span className="text-xs font-semibold text-white mt-1">Neural Explorer (Rank III)</span>
                        <span className="text-[10px] text-[#4DA3FF] font-mono">Unlock at 10k XP</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {["Focus Rookie", "Deep Work Elite", "Productivity Champ", "Cognitive Master"].map((badge, idx) => (
                          <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-[#9B6DFF]/10 text-[#9B6DFF] rounded-lg flex items-center justify-center font-bold text-[10px]">
                              {idx+1}
                            </div>
                            <span className="text-[10px] font-semibold text-white/80">{badge}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* LOCK-IN FOCUS TIMER SCREEN */}
                  {activeScreenTab === "lockin" && (
                    <motion.div
                      key="lockin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-between pt-4"
                    >
                      <div className="text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-[9px] text-red-400 uppercase font-mono tracking-wider font-bold">
                          LOCK-IN IMMERSIVE ACTIVE
                        </span>
                        <p className="text-[11px] text-white/40 font-mono mt-1.5">CYBER COGNITIVE BLOCKS READY</p>
                      </div>

                      {/* Display Timer */}
                      <div className="text-center my-6">
                        <div className="text-5xl font-mono font-bold tracking-tight bg-gradient-to-tr from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                          {formatTime(timerSeconds)}
                        </div>
                        <span className="text-[9px] text-white/40 block mt-1 tracking-wider uppercase">DEEP FLOW IN PROCESS</span>
                      </div>

                      <div className="w-full space-y-3">
                        <div className="flex gap-2.5">
                          <button
                            onClick={toggleTimer}
                            className={`flex-1 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${isTimerRunning ? "bg-white/10 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"}`}
                          >
                            {isTimerRunning ? "Suspend Mode" : "Deleash Lock-In"}
                          </button>
                          <button
                            onClick={resetTimer}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-xs font-mono font-semibold"
                          >
                            Reset
                          </button>
                        </div>
                        <p className="text-[9px] text-center text-white/35 font-mono">Toggling blocks absolute browser background notifications</p>
                      </div>
                    </motion.div>
                  )}

                  {/* AI ANALYTICS GRAPH */}
                  {activeScreenTab === "analytics" && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col pt-4 gap-4"
                    >
                      <h4 className="text-sm font-semibold border-b border-white/5 pb-2">Attention Trends</h4>
                      
                      <div className="h-32 bg-white/5 rounded-2xl p-3 border border-white/10 flex items-end justify-between gap-1 relative overflow-hidden">
                        {[20, 60, 45, 80, 95, 70, 90, 85].map((val, i) => (
                          <div key={i} className="flex-1 bg-[#4DA3FF]" style={{ height: `${val}%` }}></div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] bg-white/[0.02] p-2 rounded-xl border border-white/5">
                          <span className="text-white/60">Average Screen Spend</span>
                          <span className="font-semibold text-red-400">1.4 Hrs (Down 50%)</span>
                        </div>
                        <div className="flex justify-between text-[11px] bg-white/[0.02] p-2 rounded-xl border border-white/5">
                          <span className="text-white/60">Flow State Yield</span>
                          <span className="font-semibold text-green-400">+12% High Activity</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TEACHER DASHBOARD */}
                  {activeScreenTab === "teacher" && (
                    <motion.div
                      key="teacher"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col pt-4 gap-4"
                    >
                      <h4 className="text-sm font-semibold border-b border-white/5 pb-2">Educator Analytics</h4>
                      
                      <div className="space-y-3.5">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                          <span className="text-[11px] font-semibold text-white/80">Period 4 Attendance</span>
                          <span className="text-xs font-mono font-bold text-green-400">98% STABLE</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Cognitive Alerts</span>
                          {["Ethan M.: Tab Volatility", "Jess V.: High Session Cross"].map((item, idx) => (
                            <div key={idx} className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-300 text-[10px] rounded-lg flex items-center justify-between">
                              <span>{item}</span>
                              <span className="font-bold text-[9px] font-mono tracking-widest">ACT</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SETTINGS SCREEN */}
                  {activeScreenTab === "settings" && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col pt-4 gap-4"
                    >
                      <h4 className="text-sm font-semibold border-b border-white/5 pb-2">Device Control Node</h4>
                      
                      <div className="space-y-3.5">
                        {[
                          { label: "Absolute Focus Mode Blocking", active: true },
                          { label: "Notification Micro Intercepts", active: true },
                          { label: "Dopamine Feeds Detour Warnings", active: false }
                        ].map((node, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
                            <span className="text-[10px] text-white/80 leading-snug">{node.label}</span>
                            <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${node.active ? "bg-[#4DA3FF]" : "bg-white/10"}`}>
                              <div className={`w-3.5 h-3.5 rounded-full bg-black transition-all ${node.active ? "translate-x-3.5" : "translate-x-0"}`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
