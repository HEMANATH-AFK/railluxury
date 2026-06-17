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
            {/* Search form slot */}
            <div className="glass-panel p-6 rounded-3xl glow-border-gold shadow-2xl">
              <p className="text-gray-400 text-xs uppercase tracking-widest text-center">Bespoke Travel Desk</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
