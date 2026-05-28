import AdminLayout from '../components/AdminLayout';
import { Activity, MapPin, Navigation, Send, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminTracking = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-50/30">
            {/* Mock Map Background */}
            <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
          <Navigation size={64} className="text-indigo-600 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-gray-900">Live GPS Monitoring</h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">Simulating real-time satellite tracking for 120+ active transports across the Indian subcontinent.</p>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
              <Activity size={18}/> Reset Simulator
            </button>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
              <MapPin size={18}/> Refresh Nodes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Tracking Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Simulation Speed</label>
                <input type="range" className="w-full accent-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-sm font-medium">Auto-Refresh</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
              <AlertTriangle size={18}/> Signal Status
            </div>
            <p className="text-sm text-amber-800">Satellite link is stable. Currently tracking 86 Trains and 34 Flights with 98% precision.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTracking;
