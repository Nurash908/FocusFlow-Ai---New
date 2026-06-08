import { useState } from "react";
import { motion } from "motion/react";
import { Users, UserCheck, ShieldAlert, Award, FileSpreadsheet, Eye } from "lucide-react";

export default function TeacherDashboard() {
  const [activeAlertIndex, setActiveAlertIndex] = useState<number | null>(null);

  const classroomStudents = [
    { name: "Jessica Vance", grade: "A-", focusTime: "4.3hr/day", health: "Resilient", color: "text-green-400" },
    { name: "Liam O'Connor", grade: "B+", focusTime: "3.8hr/day", health: "Focus Surge", color: "text-cyan-400" },
    { name: "Ethan Miller", grade: "C-", focusTime: "1.1hr/day", health: "At Risk", color: "text-red-400" },
    { name: "Sophia Zhang", grade: "A+", focusTime: "5.2hr/day", health: "Elite Streak", color: "text-purple-400" },
  ];

  const classroomAlerts = [
    { title: "Engagement Alert", desc: "Ethan's productivity dropped below 30% for 3 sequential days.", icon: ShieldAlert, severity: "High" },
    { title: "Streak Champion", desc: "Sophia crossed 25 direct study sprints in Focus Mode.", icon: Award, severity: "Low" },
  ];

  return (
    <section id="enterprise" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070B14] to-[#101827]/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B6DFF]/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (Left) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-4 text-xs font-mono tracking-[0.3em] font-medium text-[#4DA3FF] uppercase">DISTRICT & INSTITUTIONS</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-none">
              Classroom Intelligence
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              FocusFlow isn't just for students. Arm teachers with institutional analytics to identify cognitive fatigue before grades reflect the drop.
            </p>
            
            <div className="space-y-4">
              {[
                { label: "Attendance Monitoring", desc: "Verify real-time attendance through session heartbeat sync." },
                { label: "Friction Analytics", desc: "Discover which educational topics generate the highest student tab switching behavior." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#4DA3FF] mt-2.5"></div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-base">{item.label}</h4>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Fi Interface Simulation Card (Right) */}
          <div className="lg:col-span-8 backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full"></div>
            
            {/* Header of Simulated Dashboard */}
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#4DA3FF]/15 border border-[#4DA3FF]/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4DA3FF]" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">Period 4 - AP Computer Science</h3>
                  <p className="text-xs text-white/40 font-mono">24 STUDENTS ACTIVE</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-500/15 text-green-400 border border-green-500/20 text-[10px] font-mono tracking-wider font-semibold rounded-full uppercase">
                  Classroom Stable
                </span>
                <span className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors border border-white/5 text-white/60 hover:text-white">
                  <FileSpreadsheet className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Simulated Live Students Directory Grid */}
            <h4 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">Focus Directory</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {classroomStudents.map((student, idx) => (
                <div key={idx} className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex justify-between items-center transition-all cursor-pointer">
                  <div>
                    <span className="text-sm font-semibold text-white/90">{student.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase">{student.grade} GPA Scale</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span className="text-[10px] font-mono text-white/40">{student.focusTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold ${student.color}`}>{student.health}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insight Flags / Alerts Section */}
            <h4 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">FocusFlow AI Insight Core</h4>
            <div className="space-y-3">
              {classroomAlerts.map((flag, idx) => {
                const IconComponent = flag.icon;
                const isSelected = activeAlertIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveAlertIndex(isSelected ? null : idx)}
                    className={`border transition-all cursor-pointer rounded-2xl p-4 flex gap-4 ${isSelected ? "border-[#FF4D4D] bg-[#FF4D4D]/5" : "border-white/5 bg-white/[0.01] hover:bg-white/[0.02]"}`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${flag.severity === "High" ? "bg-[#FF4D4D]/15 text-[#FF4D4D]" : "bg-purple-500/15 text-purple-400"}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h5 className="font-semibold text-white text-sm">{flag.title}</h5>
                        <span className={`text-[9px] font-mono uppercase font-bold tracking-wider border px-2 py-0.5 rounded-full ${flag.severity === "High" ? "border-[#FF4D4D]/30 text-[#FF4D4D]" : "border-purple-500/30 text-purple-400"}`}>
                          {flag.severity} RISK
                        </span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed mt-1.5">{flag.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
