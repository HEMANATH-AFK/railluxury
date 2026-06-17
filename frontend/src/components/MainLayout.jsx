import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Train, User, Menu, X, Phone, Mail, MapPin, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book tickets', path: '/search' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-600/20">
                  <Train size={22} />
                </div>
                <span className="text-xl font-black tracking-tight text-primary uppercase">Rail<span className="text-accent italic">Luxury</span></span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-black uppercase tracking-widest transition-all ${
                    isActive(link.path) ? 'text-primary' : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-xs font-black uppercase tracking-widest text-secondary hover:text-red-700 transition-colors">
                  Control Center
                </Link>
              )}
              
              {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                  <Link to="/dashboard" className="flex items-center gap-2 text-sm font-black text-gray-900 hover:text-primary transition-colors">
                    <User size={16} className="text-accent" />
                    {user.name.split(' ')[0]}
                  </Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="p-2 text-gray-400 hover:text-secondary transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-50 p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-gray-600 font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Train size={18} />
                </div>
                <span className="text-lg font-black text-primary uppercase">RailLuxury</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">Redefining the art of travel with India's most premium reservation experience.</p>
            </div>
            
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li><Link to="/" className="hover:text-primary transition-colors">Book a Train</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Flight Search</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Reservations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Contact</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600">
                <li className="flex items-center gap-2"><Phone size={14} className="text-accent" /> +91 1800-675-098</li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-accent" /> support@railluxury.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Newsletter</h4>
              <div className="flex gap-2">
                <input type="text" placeholder="Email" className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent" />
                <button className="p-2 bg-primary text-white rounded-lg"><Mail size={18}/></button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            © 2026 RailLuxury Systems. All Rights Reserved. <br />
            DEVELOPED BY PSYCHOPATH                  
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
