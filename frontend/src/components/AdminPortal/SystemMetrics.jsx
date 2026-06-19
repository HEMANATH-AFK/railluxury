import React from 'react';
import { Cpu, Database } from 'lucide-react';

const SystemMetrics = () => {
  const [cpuHistory, setCpuHistory] = React.useState([20, 25, 30, 22, 28, 35, 18, 24, 29, 31, 26, 23]);
  const [memoryUsage, setMemoryUsage] = React.useState(1.24);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory((prev) => [...prev.slice(1), Math.floor(Math.random() * 30) + 15]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsage((prev) => {
        const diff = (Math.random() * 0.1 - 0.05);
        return parseFloat((Math.max(1.1, Math.min(2.5, prev + diff))).toFixed(2));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
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
            <div className="h-12 bg-slate-900/60 rounded-xl flex items-end overflow-hidden p-2 gap-1 border border-white/5 justify-between">
              {cpuHistory.map((val, idx) => (
                <div 
                  key={idx} 
                  className="bg-amber-500/80 rounded-t w-full transition-all duration-300 hover:bg-amber-400 cursor-pointer" 
                  style={{ height: `${val}%` }}
                  title={`Core Load: ${val}%`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono">
            <span>AVG: {(cpuHistory.reduce((a, b) => a + b, 0) / cpuHistory.length).toFixed(1)}%</span>
            <span>TEMP: 42°C</span>
          </div>
        </div>

        {/* RAM allocation */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-gray-500 tracking-wider uppercase font-mono">MEM LOAD</span>
            <span className="text-xs text-amber-500 font-bold font-mono">{memoryUsage.toFixed(2)} GB / 8.0 GB</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-4">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${(memoryUsage / 8.0) * 100}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-4">
            <span>ACTIVE: {((memoryUsage / 8.0) * 100).toFixed(1)}%</span>
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
