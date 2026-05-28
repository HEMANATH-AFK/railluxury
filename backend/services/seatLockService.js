import SeatLock from '../models/SeatLock.js';
import ConfirmedSeat from '../models/ConfirmedSeat.js';
import { getIO } from './socketService.js';

export const lockSeats = async (transportId, travelDate, className, seats, userId) => {
  const isConfirmed = await ConfirmedSeat.findOne({ transportId, travelDate, className, seatNumber: { $in: seats } });
  if (isConfirmed) {
    throw new Error('One or more selected seats are already booked.');
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); 

  await SeatLock.deleteMany({ transportId, travelDate, className, seatNumber: { $in: seats }, expiresAt: { $lt: now } });
  await SeatLock.deleteMany({ transportId, travelDate, className, seatNumber: { $in: seats }, lockedBy: userId });

  try {
    const newLocks = seats.map(seatNumber => ({ transportId, travelDate, className, seatNumber, lockedBy: userId, expiresAt }));
    await SeatLock.insertMany(newLocks, { ordered: true });
    
    // Broadcast lock to room (including className to distinguish)
    const roomId = `${transportId}_${travelDate}_${className}`;
    getIO().to(roomId).emit('seat_locked', { seats, lockedBy: userId });

    return true;
  } catch (error) {
    await SeatLock.deleteMany({ transportId, travelDate, className, seatNumber: { $in: seats }, lockedBy: userId });
    throw new Error('One or more selected seats are currently locked by another user.');
  }
};

export const releaseSeatLocks = async (transportId, travelDate, className, seats, userId) => {
  await SeatLock.deleteMany({
    transportId,
    travelDate,
    className,
    seatNumber: { $in: seats },
    lockedBy: userId
  });
  
  const roomId = `${transportId}_${travelDate}_${className}`;
  getIO().to(roomId).emit('seat_unlocked', { seats });
};

export const getUnavailableSeats = async (transportId, travelDate, className) => {
  const confirmed = await ConfirmedSeat.find({ transportId, travelDate, className }).select('seatNumber -_id');
  const now = new Date();
  const locked = await SeatLock.find({ transportId, travelDate, className, expiresAt: { $gt: now } }).select('seatNumber -_id');
  
  const unavailableSeatNumbers = [
    ...confirmed.map(c => c.seatNumber),
    ...locked.map(l => l.seatNumber)
  ];
  
  return [...new Set(unavailableSeatNumbers)];
};
