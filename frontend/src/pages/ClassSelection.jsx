import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ShieldCheck, Zap, Coffee, Bed, Wind } from 'lucide-react';

const ClassSelection = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const navigate = useNavigate();
  
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/transports/${id}`);
        setTransport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransport();
  }, [id]);

  if (loading) return <div className="text-center py-20 animate-pulse">Loading classes...</div>;
  if (!transport) return <div className="text-center py-20">Transport not found</div>;

  const getClassFeatures = (className) => {
    const features = {
      'SL': [<Bed size={14}/>, 'Sleeper', <Wind size={14}/>, 'Non-AC'],
      '3A': [<Bed size={14}/>, 'AC 3 Tier', <ShieldCheck size={14}/>, 'Beddings'],
      '2A': [<Bed size={14}/>, 'AC 2 Tier', <ShieldCheck size={14}/>, 'Privacy'],
      '1A': [<Bed size={14}/>, 'AC 1 Tier', <Coffee size={14}/>, 'Meals Incl.'],
      'CC': [<Wind size={14}/>, 'AC Chair Car', <Zap size={14}/>, 'Fast'],
      'Economy': [<Wind size={14}/>, 'Standard', <Coffee size={14}/>, 'Snacks'],
      'Business': [<ShieldCheck size={14}/>, 'Premium', <Coffee size={14}/>, 'Full Meals']
    };
    return features[className] || [<Zap size={14}/>, 'Standard Service'];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <span>Home</span> <ChevronRight size={14}/>
        <span className="text-indigo-600 font-medium">{transport.type === 'train' ? 'Train' : 'Flight'} Selection</span> <ChevronRight size={14}/>
        <span className="text-gray-900 font-bold">Class Selection</span>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Class</h2>
        <p className="text-gray-500">Available classes for {transport.name} ({transport.number})</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transport.classes.map((cls) => {
          const features = getClassFeatures(cls.className);
          return (
            <div 
              key={cls.className}
              className="bg-white border-2 border-gray-100 rounded-3xl p-6 hover:border-indigo-600 transition-all group cursor-pointer shadow-sm hover:shadow-xl"
              onClick={() => navigate(`/book/${id}?date=${date}&class=${cls.className}`)}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {cls.className}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Price</p>
                  <p className="text-2xl font-black text-gray-900">₹{cls.basePrice}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">{features[0]}</span>
                  {features[1]}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">{features[2]}</span>
                  {features[3]}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{cls.totalSeats} Seats Available</span>
                </div>
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={18}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassSelection;
