import online from "../controllers/online";

class SocketIO {
  static connection() {
    // initialize globalRoom instance
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io");
      // add the user to the db as an online user
      online
        .addOnlineUser(socket.request.user)
        .then(user => {
          console.log("ONLINE USERS - ADDED", user);
          // get all the online users from the db
          online
            .getOnlineUsers()
            .then(users => {
              console.log("ALL ONLINE USERS", users);
              // emit the online users to the client
              this.io.emit("online", users);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });

      socket.on("online", () => {
        online
          .getOnlineUsers()
          .then(users => {
            this.io.emit("online", users);
          })
          .catch(error => {
            console.log(error);
          });
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove the user from the db as an online user
        online
          .removeOnlineUser(socket.request.user)
          .then(user => {
            console.log("ONLINE USERS - REMOVE");
            // get all the online users from the db
            online
              .getOnlineUsers()
              .then(users => {
                console.log("ALL ONLINE USERS", users);
                // emit the online users to the client
                this.io.emit("online", users);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  }
  static init(io) {
    // store io in a class property
    this.io = io;
    // initialize socketIO connection listener
    this.connection();
  }
}

export default SocketIO;
