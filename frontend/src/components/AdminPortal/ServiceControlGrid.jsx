import React from 'react';
import { ToggleLeft, ToggleRight, Radio, ShieldCheck, DatabaseZap, ShieldAlert } from 'lucide-react';

const ServiceControlGrid = () => {
  const [maintenance, setMaintenance] = React.useState(false);
  const [telemetry, setTelemetry] = React.useState(true);
  const [mfa, setMfa] = React.useState(false);
  const [rateLimit, setRateLimit] = React.useState(false);

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
        <div className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
          maintenance ? 'bg-red-500/5 border-red-500/20 shadow-lg shadow-red-500/5' : 'bg-slate-950/40 border-white/5 hover:border-amber-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              maintenance ? 'bg-red-500/10 text-red-500' : 'bg-slate-900/80 text-gray-500'
            }`}>
              <ShieldAlert size={18} className={maintenance ? 'animate-pulse' : ''} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Maintenance Mode</p>
              <p className="text-[9px] text-gray-500 font-mono">BLOCKS ALL PASSENGER BOOKINGS</p>
            </div>
          </div>
          <button onClick={() => setMaintenance(!maintenance)} className="focus:outline-none cursor-pointer">
            {maintenance ? (
              <ToggleRight size={36} className="text-red-500" />
            ) : (
              <ToggleLeft size={36} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Toggle 2: Broadcast Telemetry */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
          telemetry ? 'bg-emerald-500/5 border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'bg-slate-950/40 border-white/5 hover:border-amber-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              telemetry ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-900/80 text-gray-500'
            }`}>
              <Radio size={18} className={telemetry ? 'animate-pulse' : ''} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Telemetry stream</p>
              <p className="text-[9px] text-gray-500 font-mono">BROADCASTS REAL-TIME FLIGHT DATA</p>
            </div>
          </div>
          <button onClick={() => setTelemetry(!telemetry)} className="focus:outline-none cursor-pointer">
            {telemetry ? (
              <ToggleRight size={36} className="text-emerald-500" />
            ) : (
              <ToggleLeft size={36} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Toggle 3: MFA Enforcement */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
          mfa ? 'bg-amber-500/5 border-amber-500/20 shadow-lg shadow-amber-500/5' : 'bg-slate-950/40 border-white/5 hover:border-amber-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              mfa ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-900/80 text-gray-500'
            }`}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">MFA Verification</p>
              <p className="text-[9px] text-gray-500 font-mono">ENFORCES PINPAD FOR LOGINS</p>
            </div>
          </div>
          <button onClick={() => setMfa(!mfa)} className="focus:outline-none cursor-pointer">
            {mfa ? (
              <ToggleRight size={36} className="text-amber-500" />
            ) : (
              <ToggleLeft size={36} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Toggle 4: Rate Limiting Bypass */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
          rateLimit ? 'bg-blue-500/5 border-blue-500/20 shadow-lg shadow-blue-500/5' : 'bg-slate-950/40 border-white/5 hover:border-amber-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              rateLimit ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-900/80 text-gray-500'
            }`}>
              <DatabaseZap size={18} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-mono">Rate-Limit Bypass</p>
              <p className="text-[9px] text-gray-500 font-mono">ALLOWS BURST INGRESS TRAFFIC</p>
            </div>
          </div>
          <button onClick={() => setRateLimit(!rateLimit)} className="focus:outline-none cursor-pointer">
            {rateLimit ? (
              <ToggleRight size={36} className="text-blue-500" />
            ) : (
              <ToggleLeft size={36} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceControlGrid;
