import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Hourglass, 
  Bell, 
  Sliders, 
  Sparkles, 
  Users2, 
  BrainCircuit, 
  CheckSquare, 
  Volume2, 
  Lock, 
  Clock,
  ChevronRight,
  Heart
} from "lucide-react";

export default function InteractiveLab() {
  const [activeTab, setActiveTab] = useState("planner");
  
  // States for Smart Study Planner
  const [tasks, setTasks] = useState([
    { id: 1, title: "Database Systems Exam Prep", date: "June 20", priority: "High", completed: false },
    { id: 2, title: "Write Cognitive Psychology Essay", date: "June 15", priority: "Medium", completed: true },
    { id: 3, title: "Review AI Focus Metrics Report", date: "June 12", priority: "Low", completed: false },
  ]);
  const [newtaskInput, setNewtaskInput] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newtaskInput.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newtaskInput, date: "June 18", priority: "Medium", completed: false }
    ]);
    setNewtaskInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Adaptive Focus Environmental Presets
  const [environment, setEnvironment] = useState("deep-work");
  const [soundVolume, setSoundVolume] = useState(65);
  const [currentSoundTrack, setCurrentSoundTrack] = useState("Binaural Waves (Focus 40Hz)");

  const envs = [
    { id: "deep-work", name: "Deep Work Mode", desc: "Monochrome theme, absolute restriction protocols", color: "from-blue-600/30 to-purple-600/30" },
    { id: "zen-ambience", name: "Zen Ambience", desc: "Pleasant organic accents, alpha sound frequencies", color: "from-emerald-600/30 to-blue-600/30" },
    { id: "minimalist", name: "Minimalist Grid", desc: "Distraction reduced UI, hides stats until complete", color: "from-zinc-800/50 to-gray-900/50" }
  ];

  // Smart Reminders System
  const [reminders, setReminders] = useState([
    { id: 1, text: "TikTok distraction spike detected in your district. Lock-in now?", time: "Just now", type: "critical" },
    { id: 2, text: "Daily study targets completed! Speeding past Sam M. on leaderboard.", time: "2 hrs ago", type: "achievement" },
    { id: 3, text: "Exam Preparation Alert: AP Computer Science checklist 64% complete.", time: "1 day ago", type: "info" }
  ]);

  return (
    <div id="interactive-lab" className="py-12 relative overflow-hidden w-full">
      {/* Dynamic Background Fog based on tabs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#4DA3FF]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#9B6DFF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-cyan-400 uppercase">STUDENT COGNITIVE LAB</div>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight">
            Advanced System Modules
          </h2>
          <p className="text-lg text-white/50 mt-4">
            Take full control of your digital output. Try the interactive modules built specifically for high-achieving modern students.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            { id: "planner", icon: Calendar, label: "Study Planner & Exam Prep", desc: "Prioritize exam tasks" },
            { id: "adaptive", icon: Sliders, label: "Adaptive Environments", desc: "Optimize your environment" },
            { id: "reminders", icon: Bell, label: "Reminders & AI Advice", desc: "Actionable alert states" },
            { id: "upcoming", icon: Users2, label: "Parent & Community Hub", desc: "Collaborate of future visions" }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 rounded-2xl flex items-center gap-3 border text-left transition-all ${
                  isSelected 
                    ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10 border-[#4DA3FF]/40 text-white" 
                    : "bg-white/[0.01] hover:bg-white/[0.03] border-white/5 text-white/60"
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-[#4DA3FF]" : "text-white/40"}`} />
                <div>
                  <div className="text-xs font-bold font-display uppercase tracking-wider">{tab.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area */}
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 min-h-[460px] flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-[#4DA3FF]/10 to-[#9B6DFF]/10 blur-3xl rounded-full pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {/* STUDY PLANNER & EXAM PREPARATION */}
            {activeTab === "planner" && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-[#4DA3FF]" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#4DA3FF] font-semibold">Smart Planner Node</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Automate Academic Milestones</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    Connect assignments from any LMS. FocusFlow predicts effort complexity, inserts micro-sprints directly to your calendar, and handles countdown targets automatically.
                  </p>

                  <form onSubmit={addTask} className="flex gap-2 mb-6">
                    <input
                      type="text"
                      value={newtaskInput}
                      onChange={(e) => setNewtaskInput(e.target.value)}
                      placeholder="Enter upcoming biology lab, exam task..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs placeholder-white/30 focus:outline-none focus:border-[#4DA3FF]/40 text-white"
                    />
                    <button type="submit" className="px-5 py-3 rounded-xl bg-[#4DA3FF] text-black font-semibold text-xs font-mono tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
                      Deploy Task
                    </button>
                  </form>

                  <div className="space-y-2.5">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          task.completed 
                            ? "bg-white/[0.01] border-white/5 opacity-50" 
                            : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${task.completed ? "bg-green-500 border-green-500 text-black" : "border-white/20"}`}>
                            {task.completed && <span className="text-[9px] font-extrabold">✓</span>}
                          </div>
                          <div>
                            <span className={`text-xs font-semibold ${task.completed ? "line-through text-white/45" : "text-white"}`}>{task.title}</span>
                            <span className="text-[9px] text-white/40 block mt-0.5">Due: {task.date}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold tracking-widest uppercase border px-2 py-0.5 rounded ${
                          task.priority === "High" ? "border-red-500/20 text-red-400 bg-red-500/5" :
                          task.priority === "Medium" ? "border-amber-500/20 text-amber-400 bg-amber-500/5" :
                          "border-zinc-500/20 text-zinc-400 bg-zinc-500/5"
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Countdown Visual Widget */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Exam Target Mode</span>
                    <Hourglass className="w-5 h-5 text-red-400 animate-spin" />
                  </div>
                  <div className="text-center py-6 border-b border-white/5 mb-6">
                    <div className="text-3xl font-bold font-display text-white">AP Calculus Prep</div>
                    <div className="text-sm text-white/40 mt-1">Classroom target synchronized</div>
                    <div className="text-5xl font-mono font-bold text-red-400 mt-6 tracking-tight">12 : 14 : 02</div>
                    <div className="text-[9px] font-mono text-white/40 mt-1.5 uppercase">DAYS  •  HRS  •  MINS REMAINING</div>
                  </div>
                  <div className="p-3 bg-[#9B6DFF]/10 text-xs rounded-xl border border-[#9B6DFF]/20 text-[#9B6DFF]/90 font-mono">
                    NEX AI suggestion: Set up a 45-minute Lock-In session on Multi-Variable derivatives to lock in a B+ confidence rank.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADAPTIVE ENVIRONMENT PRESENTS Switches */}
            {activeTab === "adaptive" && (
              <motion.div
                key="adaptive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Sliders className="w-5 h-5 text-[#9B6DFF]" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#9B6DFF] font-semibold font-display">Adaptive Presets Node</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 font-display">Durable Focus Aesthetics</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    Fine-tune study environments manually. Align dark mode tones, isolate UI features, and broadcast customized sound frequencies directly to minimize cognitive lag.
                  </p>

                  <div className="space-y-4">
                    {envs.map(env => (
                      <div
                        key={env.id}
                        onClick={() => setEnvironment(env.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all text-left ${
                          environment === env.id 
                            ? `bg-gradient-to-r ${env.color} border-[#4DA3FF]/40 text-white` 
                            : "bg-white/[0.01] hover:bg-white/[0.02] border-white/5 text-white/60"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">{env.name}</span>
                          {environment === env.id && <span className="text-[10px] uppercase font-mono tracking-wide text-[#4DA3FF]">Active Mode</span>}
                        </div>
                        <p className="text-xs text-white/40 mt-1.5 leading-relaxed">{env.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ambient Sound Station Widget */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-6 shadow-2xl">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6 block">Solfeggio Sound Station</span>
                  
                  <div className="space-y-5">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-[#4DA3FF] font-mono block">NOW PLAYING</span>
                        <span className="text-xs font-semibold">{currentSoundTrack}</span>
                      </div>
                      <Volume2 className="w-5 h-5 text-[#4DA3FF] animate-pulse" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-white/40">
                        <span>VOLUME GAIN</span>
                        <span>{soundVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={soundVolume}
                        onChange={(e) => setSoundVolume(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] text-white/40 uppercase font-mono">Frequencies available:</span>
                      {[
                        "Binaural Waves (Focus 40Hz)",
                        "Alpha Binaural Alpha Spikes (8Hz)",
                        "Lush Coffeehouse Ambient murmur"
                      ].map(freq => (
                        <button
                          key={freq}
                          onClick={() => setCurrentSoundTrack(freq)}
                          className={`w-full py-2.5 px-3 rounded-lg text-left text-xs transition-all ${currentSoundTrack === freq ? "bg-white/10 border border-[#4DA3FF]/30 text-[#4DA3FF]" : "bg-white/[0.01] hover:bg-white/5 text-white/60"}`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Smart Reminders System */}
            {activeTab === "reminders" && (
              <motion.div
                key="reminders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold">Smart Intercept Node</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Predictive Distraction Blocking</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    NEX AI monitors application change rates. When distracting feed sites (TikTok, YouTube Shorts, Reels) intercept your classroom windows, FocusFlow provides subtle intercept suggestions.
                  </p>

                  <div className="space-y-3">
                    {reminders.map(rec => (
                      <div key={rec.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex gap-4">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          rec.type === "critical" ? "bg-red-500/10 text-red-400" :
                          rec.type === "achievement" ? "bg-purple-500/10 text-purple-400" :
                          "bg-cyan-500/10 text-cyan-400"
                        }`}>
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-white/90">{rec.text}</span>
                            <span className="text-[9px] text-white/40 font-mono">{rec.time}</span>
                          </div>
                          <span className="text-[9px] font-mono text-white/40 uppercase block mt-1">Interception alert synchronized</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalized suggestions AI widget */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#4DA3FF] uppercase tracking-widest mb-3 block font-bold">NEX BIOMETRICAL COACH</span>
                    <h4 className="font-display font-semibold text-white text-base">Personalized Study Strategy</h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-2.5">
                      "I've observed high focus degradation right around 8:30 PM because your phone is positioned beside your desk. Try shifting it to 'Immersive Out of Sight Mode' to gain +14% deep study duration."
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 font-semibold text-xs tracking-wider uppercase transition-colors">
                      Implement Device Position Trigger
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PARENTAL INSIGHTS & COMMUNITY HUB */}
            {activeTab === "upcoming" && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Users2 className="w-5 h-5 text-purple-400" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-semibold font-display">Future Integrations Hub</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 font-display">System Ecosystem Growth</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    Our H2 2026 roadmap implements dedicated frameworks for secondary stakeholders to support collaborative student journeys seamlessly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 px-2 py-0.5 rounded-full bg-purple-500/5 block w-fit mb-3">ROADMAP P2</span>
                        <h4 className="font-semibold text-white text-sm">Parent Insights Node</h4>
                        <p className="text-xs text-white/45 leading-relaxed mt-1.5">
                          Weekly email briefings detailing cognitive health improvement spikes and metrics sans real-time window tracking to maintain core child trust.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-[#4DA3FF] uppercase tracking-widest border border-cyan-500/20 px-2 py-0.5 rounded-full bg-cyan-500/5 block w-fit mb-3">ROADMAP P3</span>
                        <h4 className="font-semibold text-white text-sm font-display">Global Study Peer-Group</h4>
                        <p className="text-xs text-white/45 leading-relaxed mt-1.5">
                          Study rooms equipped with interactive whiteboard feeds, cross-district leaderboards, and shared Pomodoro streaks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Metrics Widget */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#4DA3FF]/10 to-[#9B6DFF]/10 border border-[#4DA3FF]/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-3 block">STUDENT COMMITTANCE STATS</span>
                    <h4 className="font-display font-medium text-white text-lg">Cross-District Cognitive Health is Rising</h4>
                    <p className="text-xs text-white/80 leading-relaxed mt-2.5">
                      Join 2,482 active students locking-in simultaneously right now. Classrooms adopting FocusFlow averages 1.4 reclaimed study hours per task.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#FF4D4D] animate-pulse" />
                    <span className="text-xs font-mono text-white/80">COMMUNITY SCORE: 98% OPTIMAL</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
