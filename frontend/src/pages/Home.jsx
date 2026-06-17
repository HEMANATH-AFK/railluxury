import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, Plane, MapPin, Calendar, Search, ArrowRight, Shield, Clock, Map, Globe, Star,
  Compass, Award, User, ChevronDown, HelpCircle, Mail, MapPinned, ChevronRight, X
} from 'lucide-react';

import { HoverTilt, HoverMagnetic } from '@hemanath-afk/afk-motion';

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

  // Amenities Detail Modal State
  const [selectedAmenity, setSelectedAmenity] = useState(null);

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
                    <HoverMagnetic key={tab.id} style={{ width: '100%', display: 'flex' }}>
                      <button
                        type="button"
                        onClick={() => setType(tab.id)}
                        className={`relative py-2.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-all cursor-pointer w-full ${
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
                    </HoverMagnetic>
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
              <HoverMagnetic style={{ width: '100%', display: 'flex' }}>
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
              </HoverMagnetic>
            </form>
          </div>
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
            <HoverTilt maxTilt={10} scale={1.02} perspective={1500} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div
                className="glass-panel rounded-3xl overflow-hidden glow-border-gold flex flex-col group h-full"
              >
                <div className="h-64 bg-gradient-to-br from-red-950/80 to-indigo-900/60 relative flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541417901776-46654b2a8c93?auto=format&fit=crop&q=80&w=800')" }}></div>
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
              </div>
            </HoverTilt>

            {/* VIP Aviation Masterpiece Card */}
            <HoverTilt maxTilt={10} scale={1.02} perspective={1500} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div
                className="glass-panel rounded-3xl overflow-hidden glow-border-gold flex flex-col group h-full"
              >
                <div className="h-64 bg-gradient-to-br from-indigo-950/80 to-purple-900/60 relative flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800')" }}></div>
                  <div className="absolute top-4 left-4 bg-accent/20 border border-accent/30 text-accent px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    Aero Luxury
                  </div>
                  <Plane size={80} className="text-accent/30 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white">The Apex Gulfstream Suite</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Mach-speed travel meets residential comfort. Features private bedroom suites, an upscale champagne bar, noise-cancellation interiors, and custom meals.
                    </p>
                    <ul className="grid grid-cols-2 gap-2 pt-2">
                      {['Fully Flat Bed Seats', 'Michelin Star Chef', 'Global Wi-Fi Suite', 'Dedicated Air Hostess'].map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <Award size={12} className="text-accent" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Suite Reservation From</span>
                      <span className="text-xl font-black text-gold-gradient">₹32,000 <span className="text-xs text-gray-400 font-light">/ pax</span></span>
                    </div>
                    <button 
                      onClick={() => { setType('flight'); document.getElementById('search-desk')?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="px-4 py-2 text-xs font-bold bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent hover:text-gray-900 rounded-lg transition-all cursor-pointer"
                    >
                      Book Seat
                    </button>
                  </div>
                </div>
              </div>
            </HoverTilt>
          </div>
        </div>
      </section>

      {/* Signature Routes Section */}
      <section id="luxury-routes" className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit">
                <MapPinned size={14} className="text-accent animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase font-mono">Trending Signature Journeys</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Curated Travel <span className="text-gold-gradient">Masterpieces</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm font-light max-w-md md:text-right">
              Selected pathways designed to deliver scenic wonders alongside unparalleled hospitality and dining.
            </p>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { from: 'Delhi', to: 'Mumbai', type: 'flight', price: '₹32,000', duration: '2H 10M', rating: 4.9, bg: 'from-amber-950/40 to-yellow-950/20' },
              { from: 'Chennai', to: 'Bangalore', type: 'train', price: '₹8,500', duration: '4H 45M', rating: 4.8, bg: 'from-blue-950/40 to-indigo-950/20' },
              { from: 'Bangalore', to: 'Goa', type: 'flight', price: '₹18,000', duration: '1H 15M', rating: 4.9, bg: 'from-purple-950/40 to-pink-950/20' }
            ].map((route, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/search?type=${route.type}&source=${route.from}&destination=${route.to}&date=${date}`)}
                className={`glass-panel p-6 rounded-3xl glow-border-gold flex flex-col justify-between h-72 cursor-pointer relative overflow-hidden group bg-gradient-to-br ${route.bg}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300 font-bold uppercase tracking-wider">
                      {route.type === 'flight' ? 'VIP Aviation' : 'Royal Rail'}
                    </span>
                    <div className="flex items-center gap-1 text-accent text-xs font-bold">
                      <Star size={12} fill="currentColor" /> {route.rating}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Route Path</span>
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      {route.from} <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" /> {route.to}
                    </h4>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Duration</span>
                    <span className="text-xs text-gray-300 font-bold">{route.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Suite Ticket</span>
                    <span className="text-lg font-black text-gold-gradient">{route.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Amenities Section */}
      <section id="luxury-amenities" className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-950/40">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit mx-auto">
              <Award size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">World-Class Standards</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Bespoke Hospitality, <span className="text-gold-gradient">Tailored To You</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              We go beyond transportation. Our curated luxury packages provide elite support and amenities at every step of your travel checklist.
            </p>
          </div>

          {/* Grid list of amenities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Michelin Dining', desc: 'Savor gourmet dishes curated by world-class culinary artists, served in bespoke dining cabins.', icon: Shield },
              { title: 'Personal Butler', desc: 'A dedicated concierge is assigned to your suite, offering round-the-clock tailored assistance.', icon: Clock },
              { title: 'Vanguard Lounges', desc: 'Gain access to premium champagne and cigar lounges at all major transit terminals.', icon: Map }
            ].map((amenity, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl glow-border-gold space-y-6 hover:scale-[1.01] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <amenity.icon size={22} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">{amenity.title}</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{amenity.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAmenity(amenity)}
                  className="text-xs font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all cursor-pointer bg-transparent border-none outline-none mt-4"
                >
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Loyalty Banner Section */}
      <section id="vip-club" className="relative py-20 px-4 md:px-8 lg:px-16 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative glass-panel rounded-[40px] p-8 md:p-16 overflow-hidden glow-border-gold shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Ambient gold glow */}
            <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 max-w-2xl relative z-10 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit">
                <Star size={14} className="text-accent" />
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase font-mono">Invitation Only</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Unlock The <span className="text-gold-gradient">Elite Connoisseur</span> Club
              </h2>
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                Gain access to secret routes, complimentary cabin upgrades, private aviation charters, and dedicated client support. Join 12,000+ elite travelers who refuse to compromise.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate('/register')}
                className="w-full lg:w-auto px-8 py-4 rounded-xl bg-accent text-gray-900 font-extrabold text-sm tracking-widest uppercase hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 cursor-pointer"
              >
                Request Membership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-950/40">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit mx-auto">
              <User size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">VIP Reviews</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Shared Luxury, <span className="text-gold-gradient">Global Appreciations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Devon Lane", role: "CEO, NexaCorp", review: "The Maharaja Express presidential suite blew me away. Superb service, five-star culinary dinners, and GPS tracking meant I could plan my business calls effortlessly.", rating: 5 },
              { name: "Eleanor Pena", role: "Founder, Bloom Tech", review: "Bespoke aviation booking was flawless. Within minutes my flight schedule was resolved and the terminal lounge was ready. Pure elite class.", rating: 5 },
              { name: "Albert Flores", role: "Managing Director", review: "A truly magnificent experience. Travel details, gourmet snacks, butler care—everything is optimized. Highly recommended for executive travels.", rating: 5 }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl glow-border-gold space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm font-light italic leading-relaxed">
                    "{item.review}"
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h5 className="text-sm font-extrabold text-white">{item.name}</h5>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit mx-auto">
              <HelpCircle size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Frequent Inquiries</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Bespoke Booking <span className="text-gold-gradient">Clarifications</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I secure an Elite Club Membership?", a: "Membership is currently invitation-only for frequent flyers and premium train suite ticket holders. You can request a review using our request membership form." },
              { q: "What is the cancellation protocol for private charters?", a: "Cancellations made 48 hours prior to departures receive 100% credit or refund options. Cancellations inside 24 hours are subject to a 10% operational fee." },
              { q: "Are pets permitted in luxury train suites?", a: "Yes, Maharaja presidential suites feature premium pet-friendly compartments and custom dining recipes for your companion. Advanced booking is required." }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none hover:bg-white/5 transition-colors bg-transparent border-none"
                  >
                    <span className="text-base font-bold text-white">{faq.q}</span>
                    <ChevronDown size={18} className={`text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gray-950/40">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 md:p-12 glow-border-gold flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-md text-left">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest block font-mono flex items-center gap-1">
                <Mail size={12} /> Elite Dispatch
              </span>
              <h3 className="text-2xl font-black text-white">Subscribe to Luxury Dispatch</h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Receive secret pathways, luxury updates, and priority invitations directly in your VIP mailbox.
              </p>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Privilege Dispatch Confirmed!');
                e.target.reset();
              }}
              className="flex w-full md:w-auto items-center bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-accent/40 transition-all gap-2"
            >
              <input
                type="email"
                placeholder="Enter email address"
                required
                className="bg-transparent text-white text-xs outline-none px-3 py-2 w-full md:w-60 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-yellow-500 text-gray-900 font-extrabold px-6 py-2 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                Join List
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Secondary Navigation Footer */}
      <footer className="relative border-t border-white/5 py-12 px-4 md:px-8 lg:px-16 bg-gray-950/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Globe className="text-accent animate-spin-slow" size={24} />
            <span className="text-lg font-black tracking-widest text-white">RAILLUXURY</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <button onClick={() => document.getElementById('search-desk')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Booking Desk</button>
            <button onClick={() => document.getElementById('fleet-showcase')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Master Fleets</button>
            <button onClick={() => document.getElementById('luxury-routes')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Signature Routes</button>
            <button onClick={() => document.getElementById('luxury-amenities')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Privileges</button>
            <button onClick={() => document.getElementById('vip-club')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Elite Club</button>
          </div>

          <div className="text-[10px] text-gray-600 font-medium tracking-widest">
            © {new Date().getFullYear()} RAILLUXURY. All rights reserved.
          </div>
        </div>
      </footer>
      {/* Amenities Detail Modal */}
      <AnimatePresence>
        {selectedAmenity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAmenity(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-8 space-y-6 glow-border-gold shadow-2xl bg-gray-900 z-10"
            >
              <button
                onClick={() => setSelectedAmenity(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                {selectedAmenity.title === 'Michelin Dining' && <Shield size={28} />}
                {selectedAmenity.title === 'Personal Butler' && <Clock size={28} />}
                {selectedAmenity.title === 'Vanguard Lounges' && <Map size={28} />}
              </div>
              <div className="space-y-3">
                <span className="text-[10px] text-accent uppercase tracking-widest block font-bold">Elite Privilege Detail</span>
                <h3 className="text-3xl font-black text-white">{selectedAmenity.title}</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {selectedAmenity.desc} Our premium concierge department handles all specific requests. Enjoy customized menus, private reservation slots, and priority boarding support.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedAmenity(null)}
                  className="w-full py-3 rounded-xl bg-accent text-gray-900 font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 cursor-pointer transition-all"
                >
                  Acknowledge Privilege
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
