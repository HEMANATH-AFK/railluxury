import cron from 'node-cron';
import SeatLock from '../models/SeatLock.js';
import { getIO } from '../services/socketService.js';

export const startCronJobs = () => {
  // Run every 5 minutes for faster real-time cleanup visibility
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date();
      // Find expired locks before deleting to broadcast
      const expiredLocks = await SeatLock.find({ expiresAt: { $lt: now } });
      
      if (expiredLocks.length > 0) {
        // Group by roomId (transportId_travelDate) to emit bulk updates
        const groupedByRoom = {};
        expiredLocks.forEach(lock => {
          const roomId = `${lock.transportId}_${lock.travelDate}`;
          if (!groupedByRoom[roomId]) groupedByRoom[roomId] = [];
          groupedByRoom[roomId].push(lock.seatNumber);
        });

        await SeatLock.deleteMany({ expiresAt: { $lt: now } });

        const io = getIO();
        for (const [roomId, seats] of Object.entries(groupedByRoom)) {
          io.to(roomId).emit('seat_unlocked', { seats });
        }
        
        console.log(`Cleaned up and broadcasted ${expiredLocks.length} expired seat locks.`);
      }
    } catch (error) {
      console.error('Error in cron job:', error.message);
    }
  });
};
