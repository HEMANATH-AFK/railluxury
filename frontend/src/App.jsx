import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Search from './pages/Search';
import ClassSelection from './pages/ClassSelection';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserList from './pages/AdminUserList';
import AdminTransports from './pages/AdminTransports';
import AdminBookings from './pages/AdminBookings';
import AdminPayments from './pages/AdminPayments';
import AdminTracking from './pages/AdminTracking';
import AdminNotifications from './pages/AdminNotifications';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './components/MainLayout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/select-class/:id" element={<ClassSelection />} />
            <Route path="/book/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/admin/transports" element={<AdminTransports />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/tracking" element={<AdminTracking />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </MainLayout>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
