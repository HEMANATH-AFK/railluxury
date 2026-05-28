import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Registration Successful. You may now log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card-premium space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-50 text-primary rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <UserPlus size={40} />
          </div>
          <h2 className="text-primary italic">Join RailLuxury</h2>
          <p className="text-gray-500 font-medium text-sm mt-2">Start your journey with India's most elite reservation network.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                className="input-rail" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                className="input-rail" 
                placeholder="name@executive.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Create Password</label>
            <div className="relative">
              <input 
                type="password" 
                className="input-rail" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-3">
             CREATE ACCOUNT
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 font-medium">
            Already a member? <Link to="/login" className="text-primary font-black hover:underline inline-flex items-center gap-1">Log In <ArrowRight size={14}/></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
