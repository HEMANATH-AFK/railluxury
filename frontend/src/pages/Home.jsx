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
        <div className="relative z-10 max-w-7xl w-full flex flex-col gap-16 md:gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
            <form id="search-desk" onSubmit={handleSearch} className="glass-panel p-6 rounded-3xl glow-border-gold shadow-2xl space-y-6">
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

          {/* Live Statistics Ticker */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center"
          >
            {[
              { value: "48+", label: "Active Luxury Suites", sub: "Global Routes" },
              { value: "99.8%", label: "Punctuality SLA", sub: "Guaranteed Comfort" },
              { value: "12,500+", label: "Elite Club Members", sub: "Five-Star Reviews" },
              { value: "0ms", label: "Telemetry Latency", sub: "Live GPS Sync" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col justify-center px-4 pt-4 lg:pt-0 first:pt-0">
                <span className="text-2xl md:text-3xl font-black text-gold-gradient block">{stat.value}</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider mt-1">{stat.label}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fleet Showcase Section */}
      <section id="fleet-showcase" className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-950/40">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit mx-auto">
              <Compass size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">The Masterpiece Fleets</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Bespoke Engineering, <span className="text-gold-gradient">Unparalleled Luxury</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Every detail is tailored for the ultimate connoisseur. Choose from our curated catalog of ultra-luxury railways and private aviation models.
            </p>
          </div>

          {/* Fleet Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* VIP Train Masterpiece Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl overflow-hidden glow-border-gold flex flex-col group"
            >
              <div className="h-64 bg-gradient-to-br from-red-950/80 to-indigo-900/60 relative flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute top-4 left-4 bg-accent/20 border border-accent/30 text-accent px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Royal Rail
                </div>
                <Train size={80} className="text-accent/30 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white">The Maharaja Palace Express</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    A moving palace featuring presidential suites, marble-finished en-suite bathrooms, fine dining carriages, and a panoramic observation lounge.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 pt-2">
                    {['Personal Butler Service', 'Gourmet Dining Cars', 'Panoramic Bar Car', 'En-suite Shower Cabin'].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Award size={12} className="text-accent" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Suite Reservation From</span>
                    <span className="text-xl font-black text-gold-gradient">₹18,500 <span className="text-xs text-gray-400 font-light">/ pax</span></span>
                  </div>
                  <button 
                    onClick={() => { setType('train'); document.getElementById('search-desk')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-4 py-2 text-xs font-bold bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent hover:text-gray-900 rounded-lg transition-all cursor-pointer"
                  >
                    Select Cabin
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
