import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const SecurityAlertBanner = () => {
  const [breach, setBreach] = React.useState(false);

  return (
    <div className={`glass-panel-dark rounded-[32px] p-6 shadow-2xl space-y-4 border transition-all duration-500 ${
      breach ? 'border-red-500/50 bg-red-950/10' : 'border-amber-500/20'
    }`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          {breach ? (
            <ShieldAlert className="text-red-500 animate-pulse" size={18} />
          ) : (
            <ShieldCheck className="text-emerald-400" size={18} />
          )}
          <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono">
            Security Shield Status
          </h3>
        </div>
        
        {breach ? (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono font-bold animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            STATUS: CRITICAL BREACH
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            THREAT LEVEL: SECURE
          </div>
        )}
      </div>

      {breach && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-[10px] font-mono leading-relaxed">
          <AlertTriangle size={18} className="shrink-0 animate-pulse mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wider">MOCK THREAT PROTOCOL ENGAGED</p>
            <p className="mt-1 text-gray-400">Handshake gateway nodes restricted. Telemetry logger reporting concurrent administrative bypass attempt from external console.</p>
          </div>
        </div>
      )}

      <div className="space-y-3 font-mono text-[10px] text-gray-400">
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>SHA-256 FILE INTEGRITY CHECK:</span>
          <span className={breach ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
            {breach ? 'WARNING: INTEGRITY TAMPERED' : 'PASS'}
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>PORT ACCESS FIREWALL FILTER:</span>
          <span className={breach ? 'text-amber-500 font-bold' : 'text-emerald-400 font-bold'}>
            {breach ? 'RESTRICTED IPS BLOCKING' : 'ACTIVE'}
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
          <span>SSL HANDSHAKE ENCRYPTION:</span>
          <span className="text-emerald-400 font-bold">PASS (256-BIT TLS 1.3)</span>
        </div>
      </div>

      <div className="pt-2">
        {breach ? (
          <button 
            type="button" 
            onClick={() => setBreach(false)}
            className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 font-black text-[10px] tracking-widest py-3 rounded-2xl transition-all cursor-pointer font-mono uppercase"
          >
            DISMISS SECURITY PROTOCOL
          </button>
        ) : (
          <button 
            type="button" 
            onClick={() => setBreach(true)}
            className="w-full bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 text-amber-500/80 hover:text-amber-400 font-black text-[10px] tracking-widest py-3 rounded-2xl transition-all cursor-pointer font-mono uppercase"
          >
            TEST THREAT SIMULATION
          </button>
        )}
      </div>
    </div>
  );
};

export default SecurityAlertBanner;
