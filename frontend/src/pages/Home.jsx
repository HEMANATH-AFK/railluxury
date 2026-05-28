import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, Plane, MapPin, Calendar, Search, ArrowRight, Shield, Clock, Map, Globe, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [type, setType] = useState('train');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?type=${type}&source=${source}&destination=${destination}&date=${date}`);
  };

  const popularRoutes = [
    { from: 'Chennai', to: 'Bangalore', price: '₹850', color: 'bg-indigo-600', icon: <Train size={40}/> },
    { from: 'Delhi', to: 'Mumbai', price: '₹1,200', color: 'bg-emerald-600', icon: <Plane size={40}/> },
    { from: 'Kolkata', to: 'Hyderabad', price: '₹1,450', color: 'bg-amber-600', icon: <Train size={40}/> },
    { from: 'Bangalore', to: 'Goa', price: '₹950', color: 'bg-rose-600', icon: <Plane size={40}/> },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section - Gradient & Icon Based */}
      <section className="relative h-[550px] rounded-[40px] overflow-hidden bg-gradient-to-br from-primary via-indigo-900 to-black p-8 md:p-16 flex items-center">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Globe size={600} className="text-white -mr-40 mt-[-100px]" />
        </div>
        
        <div className="relative z-10 max-w-3xl">

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1]"
          >
            <span className="text-indigo-200">Travel in</span> <span className="text-accent italic">Luxury</span>,<br/> 
            <span className="text-indigo-200">Reach in</span> <span className="text-indigo-400">Style.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-10 font-medium max-w-xl"
          >
            No more cluttered screens. Experience the sophisticated way to book your next premium journey.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-3xl p-3 rounded-[32px] border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSearch} className="bg-white rounded-[24px] p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex items-center px-4 py-3 gap-3 border-r border-gray-50">
                <MapPin className="text-primary shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">From</p>
                  <input 
                    type="text" 
                    placeholder="Source" 
                    className="font-bold text-gray-900 outline-none w-full text-sm"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center px-4 py-3 gap-3 border-r border-gray-50">
                <MapPin className="text-secondary shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">To</p>
                  <input 
                    type="text" 
                    placeholder="Destination" 
                    className="font-bold text-gray-900 outline-none w-full text-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center px-4 py-3 gap-3">
                <Calendar className="text-accent shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                  <input 
                    type="date" 
                    className="font-bold text-gray-900 outline-none w-full text-sm cursor-pointer"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-primary text-white rounded-2xl font-black py-4 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Search size={18} /> SEARCH
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Mode Switcher */}
      <section className="flex justify-center">
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-50 flex gap-1">
          <button 
            onClick={() => setType('train')}
            className={`px-10 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${type === 'train' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-700'}`}
          >
            <Train size={16}/> TRAIN
          </button>
          <button 
            onClick={() => setType('flight')}
            className={`px-10 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${type === 'flight' ? 'bg-secondary text-white shadow-lg' : 'text-gray-400 hover:text-gray-700'}`}
          >
            <Plane size={16}/> FLIGHT
          </button>
        </div>
      </section>

      {/* Popular Routes - Icon based cards */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-primary text-2xl font-black">Trending Routes</h2>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Selected for your elite comfort</p>
          </div>
          <button className="text-primary font-black text-xs flex items-center gap-2 hover:gap-4 transition-all">
            VIEW FLEET <ArrowRight size={14}/>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/search?type=${type}&source=${route.from}&destination=${route.to}&date=${date}`)}
              className="card-premium overflow-hidden !p-0 cursor-pointer group"
            >
              <div className={`h-32 ${route.color} relative flex items-center justify-center text-white/20 overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="scale-[3] rotate-12 transition-transform duration-500 group-hover:scale-[3.5] group-hover:rotate-0">
                  {route.icon}
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                  {route.price}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{route.from} → {route.to}</h4>
                <div className="flex items-center gap-4 mt-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12}/> 4H AVG</span>
                  <span className="flex items-center gap-1"><Shield size={12}/> SECURED</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-primary rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent mx-auto md:mx-0">
              <Shield size={28}/>
            </div>
            <h4 className="text-xl font-black">Secure Protocol</h4>
            <p className="text-indigo-200 text-sm font-medium leading-relaxed">End-to-end encryption for every reservation and financial data point.</p>
          </div>
          <div className="space-y-4 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 md:px-12">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent mx-auto md:mx-0">
              <Clock size={28}/>
            </div>
            <h4 className="text-xl font-black">Live Telemetry</h4>
            <p className="text-indigo-200 text-sm font-medium leading-relaxed">Sub-second tracking for all active trains and flights across the network.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent mx-auto md:mx-0">
              <Map size={28}/>
            </div>
            <h4 className="text-xl font-black">Elite Logistics</h4>
            <p className="text-indigo-200 text-sm font-medium leading-relaxed">Optimized route management providing the fastest and most comfortable journeys.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
