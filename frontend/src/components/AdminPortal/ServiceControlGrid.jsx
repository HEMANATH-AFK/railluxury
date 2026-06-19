import React from 'react';
import { ToggleLeft, ToggleRight, Radio, ShieldCheck, DatabaseZap, ShieldAlert } from 'lucide-react';

const ServiceControlGrid = () => {
  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-6 shadow-2xl space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono flex items-center gap-2">
          <DatabaseZap size={16} /> Console Switches
        </h3>
        <span className="text-[10px] text-amber-500/80 font-mono">NODE OVERRIDES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Toggle 1: Maintenance Mode */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center text-gray-500">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Maintenance Mode</p>
              <p className="text-[9px] text-gray-500 font-mono">BLOCKS ALL PASSENGER BOOKINGS</p>
            </div>
          </div>
          <button className="text-gray-600 focus:outline-none" id="toggle-maint">
            <ToggleLeft size={36} />
          </button>
        </div>

        {/* Toggle 2: Broadcast Telemetry */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center text-emerald-500">
              <Radio size={18} className="animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Telemetry stream</p>
              <p className="text-[9px] text-gray-500 font-mono">BROADCASTS REAL-TIME FLIGHT DATA</p>
            </div>
          </div>
          <button className="text-emerald-500 focus:outline-none" id="toggle-telemetry">
            <ToggleRight size={36} />
          </button>
        </div>

        {/* Toggle 3: MFA Enforcement */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center text-gray-500">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">MFA Verification</p>
              <p className="text-[9px] text-gray-500 font-mono">ENFORCES PINPAD FOR LOGINS</p>
            </div>
          </div>
          <button className="text-gray-600 focus:outline-none" id="toggle-mfa">
            <ToggleLeft size={36} />
          </button>
        </div>

        {/* Toggle 4: Rate Limiting Bypass */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-amber-500/20 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center text-gray-500">
              <DatabaseZap size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Rate-Limit Bypass</p>
              <p className="text-[9px] text-gray-500 font-mono">ALLOWS BURST INGRESS TRAFFIC</p>
            </div>
          </div>
          <button className="text-gray-600 focus:outline-none" id="toggle-ratelimit">
            <ToggleLeft size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceControlGrid;
