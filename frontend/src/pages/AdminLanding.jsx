import React from 'react';
import PortalHeader from '../components/AdminPortal/PortalHeader';
import SystemMetrics from '../components/AdminPortal/SystemMetrics';
import ServiceControlGrid from '../components/AdminPortal/ServiceControlGrid';
import LiveLogTerminal from '../components/AdminPortal/LiveLogTerminal';
import AccessHandshake from '../components/AdminPortal/AccessHandshake';
import SecurityAlertBanner from '../components/AdminPortal/SecurityAlertBanner';
import { ShieldAlert } from 'lucide-react';

const AdminLanding = () => {
  const [breach, setBreach] = React.useState(false);

  return (
    <div className="min-h-screen bg-admin-portal admin-grid text-white relative flex flex-col justify-between overflow-y-auto luxury-scrollbar">
      {/* Scanline Animation */}
      <div className="animate-scanline"></div>

      {/* Top Header Banner */}
      <PortalHeader breach={breach} />

      {/* Main Grid Deck */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Hand Controls & Telemetry */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold tracking-wider">
            <ShieldAlert size={14} className="animate-pulse" /> COMMAND PORTAL SIGN-IN REQUIRED
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase font-mono">
              Administrative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 glow-text-gold font-serif italic text-4xl">Control Console</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-[11px] font-mono leading-relaxed">
              OPERATIONAL HANDSHAKE INTEGRITY ENFORCED. ACCESS RESTRICTED TO PERSONNEL CLASSIFIED UNDER EXECUTIVE DECREE. ALL INGRESS HANDSHAKES AUDITED SECURELY.
            </p>
          </div>

          {/* Telemetry Sparklines and Gauges */}
          <SystemMetrics />

          {/* Console switches overrides */}
          <ServiceControlGrid />

          {/* Live scrolling logs terminal */}
          <LiveLogTerminal breach={breach} />
        </div>

        {/* Right Hand Access Gate */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-stretch w-full max-w-xl mx-auto lg:max-w-none">
          {/* Credentials with keypad validation */}
          <AccessHandshake />

          {/* Threat Monitor alerts */}
          <SecurityAlertBanner breach={breach} setBreach={setBreach} />
        </div>
      </main>

      {/* Control Footer */}
      <footer className="relative z-10 border-t border-amber-500/10 bg-slate-950/20 px-8 py-5 text-center text-[9px] text-gray-500 font-mono tracking-widest uppercase">
        Node: SG-102.RL.OPS | Shield Protocol: AES-256-GCM | Handshake Auth: OK
      </footer>
    </div>
  );
};

export default AdminLanding;
