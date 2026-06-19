import React from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

const LiveLogTerminal = () => {
  const [logs, setLogs] = React.useState([
    'SYSTEM: Handshake protocol loaded successfully.',
    'SECURE: Cipher suite set to ECDHE-RSA-AES256-GCM-SHA384.',
    'NETWORK: Local interface online. IP: 10.0.4.92.',
    'DB-CONN: Connection pool created (Size: 20).',
    'CORE: RailLuxury operations monitor is listening...',
  ]);

  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-6 shadow-2xl space-y-4 flex flex-col h-[320px]">
      <div className="flex justify-between items-center pb-3 border-b border-white/5 shrink-0">
        <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono flex items-center gap-2">
          <Terminal size={16} /> Console Diagnostics
        </h3>
        <button className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-amber-500 transition-colors cursor-pointer">
          <RefreshCw size={12} className="animate-spin-slow" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2 p-4 bg-slate-950/70 border border-white/5 rounded-2xl luxury-scrollbar text-gray-300">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-amber-500/50 select-none">rlx_shell#</span>
            <span className={log.includes('SYSTEM') || log.includes('CONN') ? 'text-emerald-400 font-bold' : log.includes('SECURE') ? 'text-blue-400 font-bold' : ''}>{log}</span>
          </div>
        ))}
      </div>

      {/* Terminal input prompt placeholder for next commit */}
      <div className="shrink-0 flex items-center gap-2 font-mono text-xs bg-slate-950/40 px-4 py-3 border border-white/5 rounded-2xl" id="input-prompt">
        <span className="text-amber-500 font-bold select-none">$</span>
        <span className="text-gray-600">SHELL READ-ONLY MODE</span>
      </div>
    </div>
  );
};

export default LiveLogTerminal;
