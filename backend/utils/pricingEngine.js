import ConfirmedSeat from '../models/ConfirmedSeat.js';
import SeatLock from '../models/SeatLock.js';

/**
 * Calculates dynamic price for a transport class
 * @param {Object} transport - The transport document
 * @param {String} className - The class to calculate price for
 * @param {String} travelDate - The travel date (YYYY-MM-DD)
 * @returns {Number} - The final calculated price
 */
export const calculateDynamicPrice = async (transport, className, travelDate) => {
  const transportClass = transport.classes.find(c => c.className === className);
  if (!transportClass) return 0;

  let finalPrice = transportClass.basePrice;

  // 1. Demand Multiplier (Surge Pricing)
  // Check how many seats are already taken (booked + active locks)
  const confirmedCount = await ConfirmedSeat.countDocuments({ transportId: transport._id, travelDate });
  const lockedCount = await SeatLock.countDocuments({ transportId: transport._id, travelDate, expiresAt: { $gt: new Date() } });
  
  const totalOccupied = confirmedCount + lockedCount;
  const occupancyRate = totalOccupied / transportClass.totalSeats;

  if (occupancyRate > 0.8) {
    finalPrice *= 1.5; // 50% surge
  } else if (occupancyRate > 0.5) {
    finalPrice *= 1.2; // 20% surge
  }

  // 2. Time Multiplier (Last-minute booking)
  // Note: Since transport.route has specific departure times, we'd ideally check against that.
  // For simplicity, we check against the travelDate.
  const now = new Date();
  const departureDate = new Date(travelDate);
  const diffHours = (departureDate - now) / (1000 * 60 * 60);

  if (diffHours > 0 && diffHours < 24) {
    finalPrice *= 1.2; // 20% extra for < 24h
  }

  return Math.round(finalPrice);
};
