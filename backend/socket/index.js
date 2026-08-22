function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Join a specific trip room for live group collaboration
    socket.on('join_trip', ({ tripId, userName }) => {
      const room = `trip_${tripId}`;
      socket.join(room);
      console.log(`[Socket.io] User ${userName} joined room ${room}`);

      socket.to(room).emit('user_joined', {
        message: `${userName} joined the trip planning room.`,
        socketId: socket.id
      });
    });

    // Leave trip room
    socket.on('leave_trip', ({ tripId, userName }) => {
      const room = `trip_${tripId}`;
      socket.leave(room);
      socket.to(room).emit('user_left', {
        message: `${userName} left the trip room.`
      });
    });

    // Realtime trip itinerary update broadcast
    socket.on('itinerary_updated', ({ tripId, updatedBy, changes }) => {
      const room = `trip_${tripId}`;
      socket.to(room).emit('itinerary_changed', {
        updatedBy,
        changes,
        timestamp: new Date()
      });
    });

    // In-trip group chat message
    socket.on('send_group_message', ({ tripId, senderName, text }) => {
      const room = `trip_${tripId}`;
      io.to(room).emit('group_message_received', {
        senderName,
        text,
        timestamp: new Date()
      });
    });

    // Activity voting in group trip
    socket.on('vote_activity', ({ tripId, activityId, activityName, voterName, voteType }) => {
      const room = `trip_${tripId}`;
      io.to(room).emit('activity_vote_updated', {
        activityId,
        activityName,
        voterName,
        voteType
      });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = setupSocket;
