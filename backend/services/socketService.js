import { Server } from 'socket.io';

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // For dev
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.on('join_booking_room', ({ transportId, travelDate }) => {
      if (transportId && travelDate) {
        const roomId = `${transportId}_${travelDate}`;
        socket.join(roomId);
        console.log(`Socket joined room: ${roomId}`);
      }
    });

    socket.on('disconnect', () => {
      // Disconnect handling if needed
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
