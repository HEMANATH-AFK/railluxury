import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const SecurityAlertBanner = () => {
  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-6 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" size={18} />
          <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono">
            Security Shield Status
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          THREAT LEVEL: SECURE
        </div>
      </div>

      <div className="space-y-3 font-mono text-[10px] text-gray-400">
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>SHA-256 FILE INTEGRITY CHECK:</span>
          <span className="text-emerald-400 font-bold">PASS</span>
        </div>
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>PORT ACCESS FIREWALL FILTER:</span>
          <span className="text-emerald-400 font-bold">ACTIVE</span>
        </div>
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>SSL HANDSHAKE ENCRYPTION:</span>
          <span className="text-emerald-400 font-bold">PASS (256-BIT TLS 1.3)</span>
        </div>
      </div>

      {/* Override simulator block for next commit */}
      <div id="override-action-placeholder"></div>
    </div>
  );
};

export default SecurityAlertBanner;
