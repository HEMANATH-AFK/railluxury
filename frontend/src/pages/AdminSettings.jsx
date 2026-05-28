import AdminLayout from '../components/AdminLayout';
import { Settings, Shield, Globe, Database, Key, Server, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const handleSave = () => {
    toast.success('System settings updated successfully!');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Settings className="text-indigo-600" /> Platform Configuration
            </h2>
          </div>

          <div className="p-8 space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Globe size={16}/> Global Rules</h3>
                <p className="text-xs text-gray-500">Regional behavior & localization.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold">Dynamic Pricing Engine</p>
                    <p className="text-xs text-gray-500">Adjust ticket prices based on occupancy.</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold">Refund Auto-Processing</p>
                    <p className="text-xs text-gray-500">Automatically refund cancelled tickets.</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Shield size={16}/> Security</h3>
                <p className="text-xs text-gray-500">Authentication & Access control.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin 2FA Requirement</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600">
                    <option>Strong Enforcement</option>
                    <option>Optional for Staff</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Database size={16}/> API Keys</h3>
                <p className="text-xs text-gray-500">Manage third-party integrations.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="p-4 bg-gray-900 text-white rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server size={18} className="text-gray-500" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Razorpay Production</p>
                      <p className="text-sm font-mono opacity-80">rzp_live_••••••••••••</p>
                    </div>
                  </div>
                  <Key size={18} className="text-gray-500 hover:text-white cursor-pointer" />
                </div>
              </div>
            </section>
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <Save size={18}/> Save Platform Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
