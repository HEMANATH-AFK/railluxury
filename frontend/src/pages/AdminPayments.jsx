import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Search, CreditCard, ExternalLink, IndianRupee, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/admin/payments', {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` }
      });
      setPayments(data);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter(p => 
    p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
            <div className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
              <ShieldCheck size={14}/> Secure SSL
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            <input
              type="text"
              placeholder="Search by Transaction ID or Email..."
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
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">User / Method</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-400" size={18}/>
                      <p className="text-xs font-mono font-bold text-gray-900">{item.transactionId}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900 text-sm">{item.userId?.email || 'N/A'}</p>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.paymentMethod}</p>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-900">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={14} className="text-gray-400"/>
                      {item.amount}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg w-fit ${
                      item.status === 'success' ? 'bg-green-50 text-green-600' : 
                      item.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'success' ? 'bg-green-500' : 
                        item.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></div>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <ExternalLink size={18}/>
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

export default AdminPayments;
