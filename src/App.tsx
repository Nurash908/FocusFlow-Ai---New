/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import CognitiveOSCockpit from './components/CognitiveOSCockpit';
import TeacherDashboard from './components/TeacherDashboard';
import SDGImpact from './components/SDGImpact';
import Roadmap from './components/Roadmap';
import BusinessModel from './components/BusinessModel';
import CTA from './components/CTA';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
      {/* Neural Fog Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4DA3FF]/10 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#9B6DFF]/15 blur-[120px] pointer-events-none"></div>

      <nav className="relative z-10 px-10 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4DA3FF] to-[#9B6DFF] flex items-center justify-center shadow-[0_0_20px_rgba(77,163,255,0.4)]">
            <div className="w-4 h-4 bg-white rounded-full mix-blend-overlay"></div>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase font-display">FocusFlow AI</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-white/60">
          {['Features', 'Analytics', 'Enterprise', 'Roadmap'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Enter Focus Mode
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero />
        <Problem />
        <Solution />
        <CognitiveOSCockpit />
        <TeacherDashboard />
        <SDGImpact />
        <Roadmap />
        <BusinessModel />
        <CTA />
      </main>
    </div>
  );
}





