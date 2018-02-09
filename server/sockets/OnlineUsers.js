import online from "../controllers/online";

class OnlineUsers {
  static addOnlineUser(socket, io) {
    online
      .addOnlineUser(socket.request.user)
      .then(user => {
        // get all the online users from the db
        online
          .getOnlineUsers()
          .then(users => {
            // emit the online users to the client
            io.emit("online", users);
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
          io.emit("online", users);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
  static removeOnlineUser(socket, io) {
    online
      .removeOnlineUser(socket.request.user)
      .then(user => {
        // get all the online users from the db
        online
          .getOnlineUsers()
          .then(users => {
            // emit the online users to the client
            io.emit("online", users);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default OnlineUsers;