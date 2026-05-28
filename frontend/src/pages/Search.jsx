import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Plane, Train, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'train');
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [date, setDate] = useState(searchParams.get('date') || new Date().toISOString().split('T')[0]);
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setSearchParams({ type: activeTab, source, destination, date });
    try {
      const { data } = await axios.get(`http://localhost:5000/api/transports`, {
        params: { type: activeTab, source, destination }
      });
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [activeTab]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 mb-8">
        <div className="flex bg-gray-50 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('train')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'train' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Train size={18} /> Trains
          </button>
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'flight' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Plane size={18} /> Flights
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="From"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="To"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="date"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white font-medium rounded-xl py-3 hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-3xl animate-pulse"></div>
          ))
        ) : results.length > 0 ? (
          results.map(transport => (
            <div key={transport._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  {activeTab === 'train' ? <Train size={24} /> : <Plane size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{transport.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{transport.number}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto px-4">
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-bold">{transport.departureTime ? format(new Date(transport.departureTime), 'HH:mm') : '--:--'}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{transport.source}</p>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-gray-200 relative min-w-[120px]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <Clock size={12} className="inline mr-1" />
                    {transport.durationMinutes ? `${Math.floor(transport.durationMinutes / 60)}h ${transport.durationMinutes % 60}m` : 'Direct'}
                  </div>
                </div>
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-bold">{transport.arrivalTime ? format(new Date(transport.arrivalTime), 'HH:mm') : '--:--'}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{transport.destination}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-right">
                  <div className="flex gap-1 mb-1 justify-end">
                    {transport.classes?.map(c => (
                      <span key={c.className} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-bold">{c.className}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">₹{transport.startingPrice}</p>
                </div>
                <Link
                  to={`/select-class/${transport._id}?date=${date}`}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Select Class
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Plane size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
