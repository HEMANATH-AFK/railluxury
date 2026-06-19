import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Home, Shield } from 'lucide-react';

const PortalHeader = () => {
  const [latency, setLatency] = React.useState(12);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="relative z-10 border-b border-amber-500/10 bg-slate-950/40 backdrop-blur-xl px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
          <Train size={22} className="stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 uppercase font-mono">
            Rail<span className="italic font-sans text-white lowercase">Luxury</span> Systems
          </h1>
          <p className="text-[9px] text-amber-500/80 font-mono tracking-[0.25em] uppercase">Control Deck Gateway</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Status Nodes */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>NODE: SG-102</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>PING: {latency}ms</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/5">
            <Shield size={12} className="text-amber-500" />
            <span>SEC-LVL: 5</span>
          </div>
        </div>

        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-amber-500/50 transition-all font-mono"
        >
          <Home size={14} className="text-amber-500" /> Back to Orbit
        </Link>
      </div>
    </header>
  );
};

export default PortalHeader;
