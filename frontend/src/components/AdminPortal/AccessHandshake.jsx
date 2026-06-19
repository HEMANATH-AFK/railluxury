import React from 'react';

const AccessHandshake = () => {
  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-8 w-full shadow-2xl relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full"></div>
      
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-mono">
          GATEWAY CONTROL
        </h3>
        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">ADMINISTRATIVE HANDSHAKE</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-mono">Terminal Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono" 
              placeholder="admin@railluxury.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-mono">Access Passkey</label>
            <input 
              type="password" 
              className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono" 
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* PIN-pad and login button will be added in subsequent commits */}
        <div id="pinpad-placeholder"></div>
      </form>
    </div>
  );
};

export default AccessHandshake;
