import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Transport from '../models/Transport.js';
import Payment from '../models/Payment.js';
import LiveTrackingState from '../models/LiveTrackingState.js';


// 5. Tracking Control
export const resetTracking = async (req, res) => {
  try {
    await LiveTrackingState.deleteMany({});
    res.json({ message: 'All tracking states reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Broadcast Notifications
export const broadcastNotification = async (req, res) => {
  const { message, type } = req.body;
  try {
    // Mocking a broadcast by logging
    console.log(`📡 BROADCAST [${type}]: ${message}`);
    // In real app, we would loop through users and send emails/sms
    res.json({ message: `Broadcast sent successfully to all users via ${type}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. System Settings (Mocked)
let systemSettings = {
  dynamicPricing: true,
  refundAutoProcessing: false,
  admin2FA: 'Strong Enforcement'
};

export const getSystemSettings = async (req, res) => {
  res.json(systemSettings);
};

export const updateSystemSettings = async (req, res) => {
  systemSettings = { ...systemSettings, ...req.body };
  res.json({ message: 'Settings updated successfully', settings: systemSettings });
};

// 1. Dashboard Overview Analytics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();
    const totalTransports = await Transport.countDocuments();
    
    const revenueData = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const recentBookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('transportId', 'name number')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalBookings,
      totalTransports,
      revenue: revenueData[0]?.totalRevenue || 0,
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. User Management
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Transport Management
export const updateTransportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'on-time', 'delayed', 'cancelled'
  try {
    const transport = await Transport.findByIdAndUpdate(id, { status }, { new: true });
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Booking & Payment Management
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('transportId', 'name number type')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
