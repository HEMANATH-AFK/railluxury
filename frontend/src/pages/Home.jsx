import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, Plane, MapPin, Calendar, Search, ArrowRight, Shield, Clock, Map, Globe, Star,
  Compass, Award, User, ChevronDown, HelpCircle, Mail, MapPinned, CreditCard, ChevronRight, Menu, X
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  // Search Form State
  const [type, setType] = useState('train');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Amenities Carousel State
  const [activeAmenity, setActiveAmenity] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      navigate(`/search?type=${type}&source=${source}&destination=${destination}&date=${date}&guests=${guests}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-luxury-dark text-white font-sans overflow-x-hidden luxury-scrollbar">
      {/* Hero Section Container */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-900/30 to-purple-900/0 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/10 to-red-900/0 blur-[100px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Hero Content Wrapper */}
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">Railluxury Elite Escapes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Bespoke Voyages for the <br />
              <span className="text-gold-gradient">Discerning Traveler</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-xl font-light leading-relaxed"
            >
              Ditch the ordinary. Journey through breathtaking landscapes aboard private high-speed cabins, five-star heritage trains, and tailored aviation fleets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button 
                onClick={() => document.getElementById('fleet-showcase')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 rounded-xl bg-accent text-gray-900 font-bold hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-accent/20"
              >
                Explore Fleet <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => document.getElementById('vip-club')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Join VIP Club
              </button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSearch} className="glass-panel p-6 rounded-3xl glow-border-gold shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  <Compass size={16} className="animate-spin-slow" /> Bespoke Booking
                </span>
                <span className="text-[10px] bg-accent/15 text-accent border border-accent/20 px-2 py-0.5 rounded-full font-bold uppercase">
                  VIP Mode
                </span>
              </div>

              {/* Trip Type Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
                {[
                  { id: 'train', label: 'Train', icon: Train },
                  { id: 'flight', label: 'Flight', icon: Plane },
                  { id: 'charter', label: 'Charter', icon: Compass },
                  { id: 'cruise', label: 'Cruise', icon: Globe }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = type === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setType(tab.id)}
                      className={`relative py-2.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-accent text-gray-900 font-extrabold shadow-lg' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-[10px] uppercase tracking-wider">{tab.label}</span>
                      {isActive && (
                        <motion.span 
                          layoutId="activeTabOutline"
                          className="absolute inset-0 rounded-lg border-2 border-accent pointer-events-none"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Departure Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-accent uppercase tracking-widest block">Departing From</label>
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-accent/50 focus-within:bg-white/10 transition-all">
                  <MapPin className="text-accent mr-3 shrink-0" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter departure city" 
                    className="bg-transparent text-white placeholder-gray-500 font-medium outline-none w-full text-sm"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['Delhi', 'Mumbai', 'Chennai'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSource(city)}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-accent/40 transition-all cursor-pointer"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-accent uppercase tracking-widest block">Arriving At</label>
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-accent/50 focus-within:bg-white/10 transition-all">
                  <MapPin className="text-accent mr-3 shrink-0" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter destination city" 
                    className="bg-transparent text-white placeholder-gray-500 font-medium outline-none w-full text-sm"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['Bangalore', 'Goa', 'Kolkata', 'Hyderabad'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setDestination(city)}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-accent/40 transition-all cursor-pointer"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Guests Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest block">Departure Date</label>
                  <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-3 focus-within:border-accent/50 focus-within:bg-white/10 transition-all">
                    <Calendar className="text-accent mr-2 shrink-0 cursor-pointer" size={16} />
                    <input 
                      type="date" 
                      className="bg-transparent text-white font-medium outline-none w-full text-xs cursor-pointer select-none"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-accent uppercase tracking-widest block">Guests</label>
                  <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-3 focus-within:border-accent/50 focus-within:bg-white/10 transition-all justify-between">
                    <div className="flex items-center gap-2">
                      <User className="text-accent shrink-0" size={16} />
                      <span className="text-white text-xs font-medium">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        type="button" 
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                        className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white font-black text-xs cursor-pointer active:scale-90 select-none"
                      >
                        -
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setGuests(prev => Math.min(10, prev + 1))}
                        className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white font-black text-xs cursor-pointer active:scale-90 select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-4 rounded-xl bg-accent text-gray-900 font-extrabold text-sm tracking-widest uppercase hover:bg-yellow-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Designing Route...
                  </>
                ) : (
                  <>
                    <Search size={16} /> Search Routes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
