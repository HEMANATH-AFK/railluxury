import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Access Granted. Welcome to the Elite Circle.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card-premium space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-50 text-primary rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-primary italic">Secure Access</h2>
          <p className="text-gray-500 font-medium text-sm mt-2">Enter your credentials to manage your elite travels.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                className="input-rail" 
                placeholder="name@executive.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <input 
                type="password" 
                className="input-rail" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-3">
            <LogIn size={20}/> AUTHORIZE ACCESS
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 font-medium">
            New to RailLuxury? <Link to="/register" className="text-primary font-black hover:underline inline-flex items-center gap-1">Create Account <ArrowRight size={14}/></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
