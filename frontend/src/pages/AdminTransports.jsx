import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Search, Plus, MapPin, Calendar, Clock, Edit3, Trash2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminTransports = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/transports');
      setTransports(data);
    } catch (error) {
      toast.error('Failed to fetch transports');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/transport/${id}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` } }
      );
      toast.success(`Status updated to ${status}`);
      fetchTransports();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filtered = transports.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Transport Fleet</h2>
            <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus size={20}/>
            </button>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            <input
              type="text"
              placeholder="Search by name or number..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transport</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Route</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Schedule</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold uppercase">
                        {item.type[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">#{item.number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400"/>
                      {item.source} → {item.destination}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12}/> {item.departureDays?.join(', ') || 'Daily'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                        <Clock size={12}/> {item.departureTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={item.status || 'on-time'}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer ${
                        item.status === 'on-time' ? 'bg-green-50 text-green-600' : 
                        item.status === 'delayed' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      <option value="on-time">On Time</option>
                      <option value="delayed">Delayed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Edit3 size={18}/>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTransports;
