import cron from 'node-cron';
import Transport from '../models/Transport.js';
import LiveTrackingState from '../models/LiveTrackingState.js';
import { getIO } from './socketService.js';

export const startTrackingSimulator = () => {
  // Update every 30 seconds
  cron.schedule('*/30 * * * * *', async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const transports = await Transport.find();

      for (const transport of transports) {
        let state = await LiveTrackingState.findOne({ 
          transportId: transport._id, 
          travelDate: today 
        });

        if (!state) {
          state = new LiveTrackingState({
            transportId: transport._id,
            travelDate: today,
            progressPercentage: 0,
            lastStationPassed: transport.route[0].station,
            nextStation: transport.route[1]?.station
          });
        }

        // Simulate progress (move 1-2% every 30 seconds)
        if (state.progressPercentage < 100) {
          state.progressPercentage = Math.min(100, state.progressPercentage + (Math.random() * 2));
          
          // Determine current segment based on progress
          const routeIndex = Math.floor((state.progressPercentage / 100) * (transport.route.length - 1));
          state.lastStationPassed = transport.route[routeIndex].station;
          state.nextStation = transport.route[routeIndex + 1]?.station || 'Destination Arrived';
          
          const totalDistance = transport.route[transport.route.length - 1].distanceFromSourceKm;
          state.distanceRemainingKm = Math.max(0, Math.round(totalDistance * (1 - state.progressPercentage / 100)));
          
          state.updatedAt = new Date();
          await state.save();

          // Broadcast update to tracking room
          const io = getIO();
          io.to(`tracking_${transport._id}`).emit('location_update', state);
        }
      }
    } catch (error) {
      console.error('Tracking simulation error:', error.message);
    }
  });
};
