export default io => {
  io.on("connection", socket => {
    console.log("New User Connected");
    socket.on("authenticatedUser", user => {
      console.log("AUTHENTICATED USER", user);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  });
};
