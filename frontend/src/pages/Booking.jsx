import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { Check, Clock, User as UserIcon, ShieldCheck } from 'lucide-react';

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const className = searchParams.get('class');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [transport, setTransport] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [lockedSeatsByOthers, setLockedSeatsByOthers] = useState([]);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [lockExpiresAt, setLockExpiresAt] = useState(null);
  
  const [savedPassengers, setSavedPassengers] = useState([]);
  const [passengerForms, setPassengerForms] = useState([]);
  const [processing, setProcessing] = useState(false);
  
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/dashboard');
    }
    fetchData();

    // Socket Integration
    const socket = io('http://localhost:5000');
    const roomId = `${id}_${date}_${className}`;

    socket.emit('join_booking_room', { transportId: id, travelDate: date, className });

    socket.on('seat_locked', ({ seats, lockedBy }) => {
      if (lockedBy !== user?._id) {
        setLockedSeatsByOthers(prev => [...new Set([...prev, ...seats])]);
      }
    });

    socket.on('seat_unlocked', ({ seats }) => {
      setLockedSeatsByOthers(prev => prev.filter(s => !seats.includes(s)));
    });

    socket.on('seat_booked', ({ seats }) => {
      setBookedSeats(prev => [...new Set([...prev, ...seats])]);
      setLockedSeatsByOthers(prev => prev.filter(s => !seats.includes(s)));
    });

    return () => {
      socket.disconnect();
    };
  }, [id, date, user?._id]);

  const fetchData = async () => {
    try {
      const [transRes, availRes, passRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/transports/${id}`),
        axios.get(`http://localhost:5000/api/bookings/availability/${id}/${date}/${className}`),
        axios.get(`http://localhost:5000/api/passengers`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
      ]);
      setTransport(transRes.data);
      setBookedSeats(availRes.data.unavailableSeats);
      setSavedPassengers(passRes.data);
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    if (lockExpiresAt) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const diff = lockExpiresAt - now;
        if (diff <= 0) {
          clearInterval(timerRef.current);
          handleLockExpire();
        } else {
          setTimeLeft(Math.floor(diff / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [lockExpiresAt]);

  const handleLockExpire = () => {
    toast.error('Seat lock expired. Please select seats again.');
    setLockedSeats([]);
    setSelectedSeats([]);
    setPassengerForms([]);
    setLockExpiresAt(null);
    fetchData(); 
  };

  const handleSeatClick = (seatNumber) => {
    if (lockedSeats.length > 0) return; 
    if (bookedSeats.includes(seatNumber) || lockedSeatsByOthers.includes(seatNumber)) return;
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length >= 6) {
        return toast.error('You can only select up to 6 seats at once.');
      }
      setSelectedSeats(prev => [...prev, seatNumber]);
    }
  };

  const handleLockSeats = async () => {
    if (selectedSeats.length === 0) return toast.error('Select at least one seat');
    
    try {
      await axios.post(
        `http://localhost:5000/api/bookings/lock`,
        { transportId: id, travelDate: date, className, seats: selectedSeats },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setLockedSeats(selectedSeats);
      setLockExpiresAt(Date.now() + 5 * 60 * 1000); 
      setPassengerForms(selectedSeats.map(seat => ({ seatNumber: seat, name: '', age: '', gender: 'male' })));
      toast.success(`Successfully locked ${selectedSeats.length} seats for 5 minutes!`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to lock seats');
      fetchData(); 
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const newForms = [...passengerForms];
    newForms[index][field] = value;
    setPassengerForms(newForms);
  };

  const fillSavedPassenger = (formIndex, passenger) => {
    handlePassengerChange(formIndex, 'name', passenger.name);
    handlePassengerChange(formIndex, 'age', passenger.age);
    handlePassengerChange(formIndex, 'gender', passenger.gender);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    
    // Validation before API call
    if (!user?._id || !transport?._id) {
      return toast.error('User or Transport data missing. Please refresh.');
    }

    if (lockedSeats.length === 0) {
      return toast.error('Please lock your seats first');
    }
    
    if (passengerForms.length !== lockedSeats.length) {
      return toast.error('Passenger details mismatch. Please re-lock seats.');
    }

    for (const form of passengerForms) {
      if (!form.name || !form.age) {
        return toast.error('Please fill all passenger details');
      }
    }

    try {
      const bookingData = {
        userId: user._id,
        transportId: transport._id,
        className,
        travelDate: date,
        seats: lockedSeats,
        passengers: passengerForms
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/bookings/confirm`,
        bookingData,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      
      toast.success('Booking initiated! Proceeding to payment.');
      navigate(`/payment/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setProcessing(false);
    }
  };

  const renderSeatMap = () => {
    if (!transport) return null;
    const selectedClassObj = transport.classes.find(c => c.className === className);
    const totalSeats = selectedClassObj?.totalSeats || 40;
    const seats = Array.from({ length: totalSeats }, (_, i) => `S${i + 1}`);
    return (
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-6 bg-gray-50 rounded-3xl border border-gray-100">
        {seats.map(seat => {
          const isBooked = bookedSeats.includes(seat);
          const isLockedByOthers = lockedSeatsByOthers.includes(seat);
          const isSelected = selectedSeats.includes(seat);
          const isLockedByMe = lockedSeats.includes(seat);
          
          let seatClass = "h-14 rounded-xl font-medium transition-all flex items-center justify-center cursor-pointer border-2 ";
          
          if (isLockedByMe) {
            seatClass += "bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-105";
          } else if (isLockedByOthers) {
            seatClass += "bg-purple-100 border-purple-400 text-purple-700 cursor-not-allowed";
          } else if (isSelected) {
            seatClass += "bg-indigo-100 border-indigo-600 text-indigo-700";
          } else if (isBooked) {
            seatClass += "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed";
          } else {
            seatClass += "bg-white border-gray-200 hover:border-indigo-600 hover:text-indigo-600";
          }

          return (
            <div
              key={seat}
              onClick={() => handleSeatClick(seat)}
              className={seatClass}
            >
              {seat}
            </div>
          );
        })}
      </div>
    );
  };

  if (!user || !transport) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-bold text-indigo-600 animate-pulse">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-bold">Select your seats</h2>
          {selectedSeats.length > 0 && lockedSeats.length === 0 && (
            <button 
              onClick={handleLockSeats}
              className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ShieldCheck size={18}/>
              Lock {selectedSeats.length} Seats
            </button>
          )}
        </div>
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div> Available</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-gray-200 rounded"></div> Unavailable</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-indigo-100 border-2 border-indigo-600 rounded"></div> Selected</div>
          <div className="flex items-center gap-2 text-sm"><div className="w-4 h-4 bg-indigo-600 rounded"></div> Locked</div>
        </div>
        {renderSeatMap()}
      </div>

      <div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
          
          {lockedSeats.length > 0 ? (
            <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-sm text-indigo-600 font-semibold mb-1">{lockedSeats.length} Seats Locked</p>
                <p className="text-xs text-indigo-500">Complete booking before timer ends</p>
              </div>
              <div className="flex items-center gap-2 text-indigo-700 font-mono font-bold text-xl bg-white px-3 py-1 rounded-lg shadow-sm">
                <Clock size={18} />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-gray-500">
              Please select and lock your seats first
            </div>
          )}

          <form onSubmit={handleConfirmBooking} className="space-y-8">
            {passengerForms.map((form, index) => (
              <div key={form.seatNumber} className="relative p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-indigo-600">
                  Passenger {index + 1} (Seat {form.seatNumber})
                </div>

                {savedPassengers.length > 0 && (
                  <div className="mb-4 pt-2">
                    <label className="block text-xs font-medium text-gray-500 mb-2">Quick Select</label>
                    <div className="flex flex-wrap gap-2">
                      {savedPassengers.map(p => (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => fillSavedPassenger(index, p)}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium transition-colors"
                        >
                          <UserIcon size={12} /> {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                      value={form.name}
                      onChange={e => handlePassengerChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                        value={form.age}
                        onChange={e => handlePassengerChange(index, 'age', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                        value={form.gender}
                        onChange={e => handlePassengerChange(index, 'gender', e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">Total Amount ({lockedSeats.length} tickets)</span>
                <span className="text-3xl font-bold text-gray-900">₹{(transport?.classes?.find(c => c.className === className)?.basePrice || 0) * lockedSeats.length}</span>
              </div>
              <button
                type="submit"
                disabled={lockedSeats.length === 0}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
