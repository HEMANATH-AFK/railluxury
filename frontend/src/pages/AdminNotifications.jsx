import AdminLayout from '../components/AdminLayout';
import { Bell, Send, Mail, MessageSquare, Users, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminNotifications = () => {
  const handleSend = (type) => {
    toast.success(`${type} Broadcast Dispatched!`);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Bell className="text-indigo-600" /> Broadcast Center
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message Content</label>
              <textarea 
                placeholder="Enter important alert or update..."
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none min-h-[150px]"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleSend('Email')}
                className="p-6 border-2 border-indigo-50 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left group"
              >
                <Mail size={24} className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold">Email Blast</p>
                <p className="text-xs text-gray-500">To all active users</p>
              </button>
              
              <button 
                onClick={() => handleSend('SMS')}
                className="p-6 border-2 border-gray-50 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left group"
              >
                <Smartphone size={24} className="text-gray-400 group-hover:text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold">SMS Alert</p>
                <p className="text-xs text-gray-500">Critical delays only</p>
              </button>
            </div>

            <button 
              onClick={() => handleSend('Global')}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <Send size={18}/> Dispatch Global Notification
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Audience Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Email Users</p>
                <p className="text-2xl font-black">12.4k</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Push Opt-in</p>
                <p className="text-2xl font-black">8.2k</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="font-bold text-gray-900 mb-6">Recent Dispatches</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Holiday Surge Warning</p>
                    <p className="text-xs text-gray-500">Sent to 4,200 users • 2h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
