import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Smartphone, Landmark, CheckCircle2, AlertCircle, Clock, ChevronRight } from 'lucide-react';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState('UPI');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setBooking(data);
      } catch (error) {
        toast.error('Booking not found or expired');
        navigate('/search');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('Payment timeout. Seat locks released.');
          navigate('/search');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id, user?.token, navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // 1. Create Payment Session
      const { data: payment } = await axios.post(`http://localhost:5000/api/payment/create`, 
        { bookingId: id, paymentMethod: method },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      // 2. Simulate Payment Delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Verify Payment
      await axios.post(`http://localhost:5000/api/payment/verify`,
        { transactionId: payment.transactionId, status: 'success' },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      toast.success('Payment Successful! Ticket confirmed.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading payment details...</div>;
  if (!booking) return null;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-green-500" /> Payment Options
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {['UPI', 'CARD', 'NETBANKING'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                  method === m ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    method === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {m === 'UPI' && <Smartphone size={24} />}
                    {m === 'CARD' && <CreditCard size={24} />}
                    {m === 'NETBANKING' && <Landmark size={24} />}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{m === 'UPI' ? 'UPI (GPay, PhonePe)' : m === 'CARD' ? 'Credit / Debit Card' : 'Net Banking'}</p>
                    <p className="text-sm text-gray-500">Secure & Instant</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  method === m ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                }`}>
                  {method === m && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full mt-8 bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </>
            ) : (
              <>Confirm & Pay ₹{booking.totalAmount}</>
            )}
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-sm text-amber-800">
            Do not refresh the page or click back button while the payment is in progress. 
            Your transaction is secured with 256-bit encryption.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <span className="text-indigo-100 font-medium">Payment Timer</span>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <Clock size={16} />
              <span className="font-mono font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Transport</p>
              <p className="text-xl font-bold">{booking.transportId.name}</p>
              <p className="text-sm text-indigo-100 opacity-80">{booking.transportId.number}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Class</p>
                <p className="font-bold">{booking.className}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Seats</p>
                <p className="font-bold">{booking.seats.join(', ')}</p>
              </div>
            </div>

            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Passengers</p>
              <div className="space-y-1">
                {booking.passengers.map((p, idx) => (
                  <p key={idx} className="text-sm font-medium">{p.name} ({p.age}, {p.gender[0].toUpperCase()})</p>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <p className="text-indigo-100">Total Payable</p>
              <p className="text-3xl font-black">₹{booking.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Refund Policy</h3>
          <ul className="text-sm text-gray-500 space-y-3">
            <li className="flex gap-2">
              <ChevronRight size={14} className="shrink-0 mt-1" />
              Full refund if cancelled before 48 hours.
            </li>
            <li className="flex gap-2">
              <ChevronRight size={14} className="shrink-0 mt-1" />
              50% refund for cancellations within 24 hours.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
