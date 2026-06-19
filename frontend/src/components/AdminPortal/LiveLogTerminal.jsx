import React from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

const LiveLogTerminal = ({ breach }) => {
  const [logs, setLogs] = React.useState([
    'SYSTEM: Handshake protocol loaded successfully.',
    'SECURE: Cipher suite set to ECDHE-RSA-AES256-GCM-SHA384.',
    'NETWORK: Local interface online. IP: 10.0.4.92.',
    'DB-CONN: Connection pool created (Size: 20).',
    'CORE: RailLuxury operations monitor is listening...',
  ]);
  const [cmdText, setCmdText] = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [historyIdx, setHistoryIdx] = React.useState(-1);
  const logEndRef = React.useRef(null);

  React.useEffect(() => {
    if (breach) {
      setLogs((prev) => [...prev, 'ALERT: Critical threat protocol override simulation detected!'].slice(-6));
    } else {
      setLogs((prev) => [...prev, 'SYSTEM: Threat protocol override simulated resolved.'].slice(-6));
    }
  }, [breach]);

  React.useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cmdText.trim()) return;

    const typedCmd = cmdText.trim();
    setLogs((prev) => [...prev, `cmd: ${typedCmd}`]);
    setHistory((prev) => [...prev, typedCmd]);
    setHistoryIdx(-1);

    const cleanCmd = typedCmd.toLowerCase();
    
    setTimeout(() => {
      if (cleanCmd === '/clear') {
        setLogs([]);
      } else if (cleanCmd === '/help') {
        setLogs((prev) => [
          ...prev,
          'SYSTEM: Available Gateway commands:',
          '  /help    - List administrative options',
          '  /status  - Query active database & node statuses',
          '  /sysinfo - Display operational runtime info',
          '  /clear   - Flush telemetry diagnostic buffer'
        ]);
      } else if (cleanCmd === '/status') {
        setLogs((prev) => [
          ...prev,
          'STATUS: Core network handshake responding at 12ms.',
          'STATUS: MongoDB instances reporting 100% telemetry availability.'
        ]);
      } else if (cleanCmd === '/sysinfo') {
        setLogs((prev) => [
          ...prev,
          'SYS-INFO: RailLuxury Core operations shell [v1.0.4-LNK]',
          'SYS-INFO: Running Node: SG-102.RL.OPS',
          'SYS-INFO: Active Handshake encryption: AES-256-GCM'
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          `ERR: Unrecognized command '${typedCmd}'. Type /help for commands.`
        ]);
      }
    }, 150);

    setCmdText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < history.length) {
        setHistoryIdx(nextIdx);
        setCmdText(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx >= 0) {
        setHistoryIdx(nextIdx);
        setCmdText(history[history.length - 1 - nextIdx]);
      } else {
        setHistoryIdx(-1);
        setCmdText('');
      }
    }
  };

  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-6 shadow-2xl space-y-4 flex flex-col h-[320px]">
      <div className="flex justify-between items-center pb-3 border-b border-white/5 shrink-0">
        <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono flex items-center gap-2">
          <Terminal size={16} /> Console Diagnostics
        </h3>
        <button 
          onClick={() => setLogs((prev) => [...prev, 'SYSTEM: Diagnostic buffer refreshed.'])}
          className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-amber-500 transition-colors cursor-pointer"
        >
          <RefreshCw size={12} className="animate-spin-slow" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2 p-4 bg-slate-950/70 border border-white/5 rounded-2xl luxury-scrollbar text-gray-300">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-amber-500/50 select-none">rlx_shell#</span>
            <span className={
              log.includes('cmd: ') ? 'text-amber-400 font-bold' : 
              log.includes('SYSTEM') || log.includes('CONN') || log.includes('STATUS') ? 'text-emerald-400 font-bold' : 
              log.includes('SECURE') || log.includes('SYS-INFO') ? 'text-blue-400 font-bold' : 
              log.includes('ERR:') ? 'text-red-400 font-bold' : ''
            }>{log}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* Terminal input prompt */}
      <form onSubmit={handleSubmit} className="shrink-0 flex items-center gap-2 font-mono text-xs bg-slate-950/40 px-4 py-3 border border-white/5 rounded-2xl focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/50 transition-all">
        <span className="text-amber-500 font-bold select-none">$</span>
        <input 
          type="text" 
          value={cmdText}
          onChange={(e) => setCmdText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type console command (e.g. /help)..."
          className="flex-1 bg-transparent text-white outline-none border-none placeholder-gray-600 font-mono text-xs"
        />
      </form>
    </div>
  );
};

export default LiveLogTerminal;
