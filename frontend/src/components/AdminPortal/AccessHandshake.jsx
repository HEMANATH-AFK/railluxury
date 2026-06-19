import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AccessHandshake = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in credentials.');
      return;
    }
    if (pin.length < 4) {
      toast.error('Multi-factor PIN handshake incomplete (4 digits required).');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.role === 'admin') {
        toast.success('Handshake Verified. Welcome to the Bridge.');
      } else {
        logout();
        toast.error('Access Denied: Account lacks executive credentials.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Handshake failed: Credentials mismatch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel-dark glow-border-admin rounded-[32px] p-8 w-full shadow-2xl relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[30px] rounded-full"></div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-mono">
          GATEWAY CONTROL
        </h3>
        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">ADMINISTRATIVE HANDSHAKE</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-mono">Terminal Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono" 
              placeholder="admin@railluxury.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-mono">Access Passkey</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono" 
              placeholder="••••••••"
              required
            />
          </div>

          {/* High-Tech Security PINpad */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 font-mono">Security Pin</label>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                      i < pin.length ? 'bg-amber-500 border-amber-500 shadow-md shadow-amber-500/50 scale-110' : 'bg-transparent border-white/10'
                    }`}
                  ></span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button 
                  key={num} 
                  type="button"
                  onClick={() => pin.length < 4 && setPin((prev) => prev + num)}
                  className="bg-slate-900/40 border border-white/5 hover:border-amber-500/20 active:bg-amber-500/10 font-bold py-3 rounded-xl hover:text-amber-400 transition-all font-mono cursor-pointer text-xs"
                >
                  {num}
                </button>
              ))}
              <button 
                type="button" 
                onClick={() => setPin('')}
                className="bg-slate-900/40 border border-white/5 hover:border-red-500/20 active:bg-red-500/10 text-red-500 font-bold py-3 rounded-xl font-mono cursor-pointer text-xs"
              >
                C
              </button>
              <button 
                type="button"
                onClick={() => pin.length < 4 && setPin((prev) => prev + '0')}
                className="bg-slate-900/40 border border-white/5 hover:border-amber-500/20 active:bg-amber-500/10 font-bold py-3 rounded-xl hover:text-amber-400 transition-all font-mono cursor-pointer text-xs"
              >
                0
              </button>
              <div className="bg-slate-950/20 border border-white/5 text-[8px] text-gray-500 font-mono rounded-xl flex items-center justify-center select-none uppercase tracking-tighter">
                PINPAD
              </div>
            </div>
          </div>
        </div>

        {/* Access validation button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-amber-800 disabled:to-slate-900 disabled:text-white/40 disabled:cursor-not-allowed text-slate-950 font-black text-xs tracking-widest py-4 rounded-2xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 font-mono"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              VERIFYING CORE...
            </>
          ) : (
            'AUTHENTICATE ACCESS'
          )}
        </button>
      </form>
    </div>
  );
};

export default AccessHandshake;
