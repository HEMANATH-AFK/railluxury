import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Train } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Plane size={18} />
              </div>
              <span className="font-semibold text-xl tracking-tight text-gray-900">Ticketer</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/search" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              Search
            </Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/dashboard" // We can build a quick login within Dashboard or modal. Let's just point to dashboard which forces login
                className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
