import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Train, 
  BookmarkCheck, 
  IndianRupee, 
  Activity, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { name: 'User Directory', icon: Users, path: '/admin/users' },
    { name: 'Fleet Control', icon: Train, path: '/admin/transports' },
    { name: 'Reservations', icon: BookmarkCheck, path: '/admin/bookings' },
    { name: 'Ledger', icon: IndianRupee, path: '/admin/payments' },
    { name: 'Telemetry', icon: Activity, path: '/admin/tracking' },
    { name: 'Broadcast', icon: Bell, path: '/admin/notifications' },
    { name: 'Platform', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Premium Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 280 : 100 }}
        className="bg-white border-r border-gray-100 flex flex-col relative z-20 shadow-2xl"
      >
        <div className="p-8 flex items-center gap-4 overflow-hidden h-24">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
            <Train size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black text-primary uppercase tracking-tighter"
            >
              Rail<span className="text-accent italic uppercase">Lux</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-xl shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-primary hover:bg-indigo-50'
              }`}
            >
              <item.icon size={22} className={location.pathname === item.path ? '' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && <span className="font-black text-sm uppercase tracking-widest">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-black text-sm uppercase tracking-widest">Terminate</span>}
          </button>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-10 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? <ChevronLeft size={16}/> : <ChevronRight size={16}/>}
        </button>
      </motion.aside>

      {/* Main Command Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
