import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Users, 
  Train, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  MapPin, 
  ArrowUpRight, 
  IndianRupee,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` }
      });
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kpis = [
    { label: 'Total Fleet', value: stats?.totalTransports || '...', icon: Train, color: 'text-indigo-600', bg: 'bg-indigo-50', change: '+12%' },
    { label: 'Active Users', value: stats?.totalUsers || '...', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+8%' },
    { label: 'Gross Revenue', value: stats ? `₹${stats.revenue.toLocaleString()}` : '...', icon: IndianRupee, color: 'text-amber-600', bg: 'bg-amber-50', change: '+24%' },
    { label: 'Success Rate', value: '99.4%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50', change: '+0.2%' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 pb-10">
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Executive <span className="text-indigo-600">Overview</span></h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-2">Real-time Command & Control Center</p>
          </div>
          <div className="flex gap-4">
            <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              <Calendar size={16}/> Last 30 Days
            </button>
            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-xl hover:bg-gray-800 transition-all flex items-center gap-2">
              <Layers size={16}/> Export Analytics
            </button>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <kpi.icon size={28}/>
                </div>
                <span className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                  <TrendingUp size={14}/> {kpi.change}
                </span>
              </div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</h4>
              <p className="text-3xl font-black text-gray-900">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Operations */}
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900">Recent Operations</h3>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">Full Ledger <ChevronRight size={14}/></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Passenger</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Transport</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Revenue</th>
                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats?.recentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">{booking.userId?.name?.[0]}</div>
                          <div>
                            <p className="text-sm font-black text-gray-900">{booking.userId?.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{booking.userId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-gray-900">{booking.transportId?.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">#{booking.transportId?.number}</p>
                      </td>
                      <td className="px-8 py-6 font-black text-indigo-600">₹{booking.totalAmount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Tracking Insights */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600 opacity-20 blur-[60px] rounded-full"></div>
              <h3 className="text-xl font-black mb-8 flex items-center gap-2"><Activity size={20} className="text-rose-500 animate-pulse"/> Fleet Health</h3>
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                    <Train size={24}/>
                  </div>
                  <div>
                    <p className="text-2xl font-black italic">94%</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">On-Time Performance</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
                    <MapPin size={24}/>
                  </div>
                  <div>
                    <p className="text-2xl font-black italic">126</p>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Waypoints</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                    OPEN COMMAND PANEL <ArrowUpRight size={18}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
