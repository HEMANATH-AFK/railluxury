import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ChevronLeft, Train } from 'lucide-react';

const AdminLanding = () => {
  return (
    <div className="min-h-screen bg-admin-portal admin-grid text-white relative flex flex-col justify-between overflow-hidden">
      {/* Scanline Animation */}
      <div className="animate-scanline"></div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-white/5 bg-slate-950/40 backdrop-blur-md px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <Train size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 uppercase">
              Rail<span className="italic">Luxury</span> Systems
            </h1>
            <p className="text-[10px] text-amber-500/80 font-mono tracking-[0.2em] uppercase">Executive Command Gateway</p>
          </div>
        </div>

        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-amber-500/50 transition-all"
        >
          <ChevronLeft size={14} className="text-amber-500" /> Return Home
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side Info Panel */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
            <ShieldAlert size={14} className="animate-pulse" /> SECURITY HANDSHAKE REQUIRED
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Administrative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 glow-text-gold font-serif italic">Portal Gateway</span>
            </h2>
            <p className="text-gray-400 max-w-lg text-sm font-medium leading-relaxed">
              Welcome to the RailLuxury secure operations dashboard. Access here is strictly limited to authorized personnel with executive level clearance. Authorization audits are active.
            </p>
          </div>

          {/* Placeholders for Terminal & Stats (Implemented in next commits) */}
          <div id="terminal-placeholder"></div>
          <div id="stats-placeholder"></div>
        </div>

        {/* Right Side Credentials Card (Implemented in next commits) */}
        <div className="w-full lg:w-96 flex justify-center">
          <div id="credentials-placeholder"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/20 px-8 py-6 text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase">
        System Node: SG-102.RL.OPS | Latency: 12ms | Security Protocol: AES-256-GCM
      </footer>
    </div>
  );
};

export default AdminLanding;
