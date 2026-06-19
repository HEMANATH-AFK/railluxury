import React from 'react';
import { Cpu, Database, HardDrive } from 'lucide-react';

const SystemMetrics = () => {
  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-6 shadow-2xl space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono flex items-center gap-2">
          <Cpu size={16} /> Console Telemetry
        </h3>
        <span className="text-[10px] text-gray-500 font-mono">NODE: ONLINE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU utilization */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-500 tracking-wider uppercase font-mono">CPU LOAD</span>
            <span className="text-xs text-amber-500 font-bold font-mono">4 Cores</span>
          </div>
          <div className="my-2">
            {/* Sparkline placeholder for next commit */}
            <div className="h-12 bg-white/5 rounded-lg flex items-end overflow-hidden p-1 gap-0.5" id="cpu-sparkline">
              <span className="text-[10px] text-gray-600 w-full text-center py-2 font-mono">AWAITING CORRELATION</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono">
            <span>AVG: 24.5%</span>
            <span>TEMP: 42°C</span>
          </div>
        </div>

        {/* RAM allocation */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-500 tracking-wider uppercase font-mono">MEM LOAD</span>
            <span className="text-xs text-amber-500 font-bold font-mono">1.2 GB / 8.0 GB</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-4">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-4">
            <span>ACTIVE: 15.0%</span>
            <span>SWAP: 0.1%</span>
          </div>
        </div>

        {/* Storage status */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-500 tracking-wider uppercase font-mono">DB MEMORY</span>
            <span className="text-xs text-emerald-500 font-bold font-mono">HEALTHY</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Database size={24} className="text-amber-500/80" />
            <div>
              <p className="text-lg font-bold tracking-tight">12.4 GB</p>
              <p className="text-[9px] text-gray-500 font-mono">FREE STORAGE SPACE</p>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-2">
            <span>POOL SIZE: 20</span>
            <span>LATENCY: 1.2ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;
