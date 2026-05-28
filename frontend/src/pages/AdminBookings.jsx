import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Search, Eye, Filter, IndianRupee, User, Train, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` }
      });
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const filtered = bookings.filter(b => 
    b._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.transportId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Reservations</h2>
            <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              {bookings.length} Total
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input
                type="text"
                placeholder="Search by ID, User or Transport..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-2xl transition-all">
              <Filter size={20}/>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Passenger / User</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transport</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-xs font-mono font-bold text-indigo-600">#{item._id.substring(item._id.length - 8).toUpperCase()}</p>
                    <p className="text-[10px] text-gray-400">{format(new Date(item.createdAt), 'MMM dd, HH:mm')}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <User size={14}/>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.userId?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{item.passengers.length} Passenger(s)</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <Train size={16} className="text-indigo-400"/>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.transportId?.name}</p>
                        <p className="text-xs text-gray-400">{item.className} | {item.seats.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-900">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={14} className="text-gray-400"/>
                      {item.totalAmount}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'confirmed' ? 'bg-green-50 text-green-600' : 
                      item.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Eye size={18}/>
                    </button>
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

export default AdminBookings;
