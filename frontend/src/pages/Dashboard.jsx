import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Train, Plane, Calendar, CreditCard, User, Clock, ArrowRight, Activity, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/bookings/mybookings', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setBookings(data.filter(b => b.status !== 'cancelled'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to terminate this elite reservation? This action is irreversible.')) return;
    
    try {
      await axios.post(`http://localhost:5000/api/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Reservation Terminated Successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancellation Failed');
    }
  };

  if (!user) return <div className="text-center py-20 font-black text-primary uppercase tracking-widest animate-pulse">Establishing Secure Session...</div>;

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-primary leading-tight">Welcome back, <br/> <span className="text-secondary italic">{user.name.split(' ')[0]}</span></h1>
          <p className="text-gray-500 font-medium">Here's your luxury travel summary for today.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => navigate('/search')}
            className="flex-1 md:flex-none btn-primary flex items-center gap-2 justify-center"
          >
            <Train size={18}/> BOOK NEW
          </button>
          <button className="flex-1 md:flex-none btn-secondary flex items-center gap-2 justify-center">
            <Activity size={18}/> TRACK LIVE
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-premium flex items-center gap-6 border-l-4 border-l-primary">
          <div className="w-14 h-14 bg-indigo-50 text-primary rounded-2xl flex items-center justify-center shrink-0">
            <Calendar size={28}/>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Upcoming Journeys</p>
            <p className="text-3xl font-black text-gray-900">{bookings.length}</p>
          </div>
        </div>
        <div className="card-premium flex items-center gap-6 border-l-4 border-l-accent">
          <div className="w-14 h-14 bg-amber-50 text-accent rounded-2xl flex items-center justify-center shrink-0">
            <CreditCard size={28}/>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Loyalty Points</p>
            <p className="text-3xl font-black text-gray-900">4,250</p>
          </div>
        </div>
        <div className="card-premium flex items-center gap-6 border-l-4 border-l-secondary">
          <div className="w-14 h-14 bg-red-50 text-secondary rounded-2xl flex items-center justify-center shrink-0">
            <Clock size={28}/>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time Travelled</p>
            <p className="text-3xl font-black text-gray-900">84h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-primary">Recent Reservations</h3>
            <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline">View History</button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse"></div>)
            ) : bookings.length > 0 ? (
              bookings.map((booking, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={booking._id} 
                  className="card-premium flex flex-col md:flex-row justify-between items-center group relative overflow-hidden"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {booking.transportId?.type === 'train' ? <Train size={24}/> : <Plane size={24}/>}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900">{booking.transportId?.name}</h4>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <MapPin size={12}/> {booking.transportId?.source} → {booking.transportId?.destination}
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{booking.travelDate}</p>
                    <p className="text-sm font-bold text-gray-500">{booking.className} | {booking.passengers.length} Pax</p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto">
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="flex-1 md:flex-none px-4 py-2 text-xs font-black text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100 uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <ArrowRight className="text-gray-200 group-hover:text-accent group-hover:translate-x-2 transition-all hidden md:block" size={24}/>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-bold italic">No active elite reservations found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Widget */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden group h-fit">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:scale-150 transition-all duration-1000"></div>
            <h4 className="font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest"><Activity size={18} className="text-accent"/> Live Telemetry</h4>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gatimaan Express</span>
                <span className="text-lg font-black text-accent italic">74%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '74%' }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                ></motion.div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase tracking-wide">Passing <span className="text-white">Agra Junction</span> • Arrival: <span className="text-accent">11:45 PM</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
