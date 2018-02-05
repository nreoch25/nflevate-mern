import Online from "../models/online";

export default {
  addOnlineUser: user => {
    return new Promise((resolve, reject) => {
      const newOnline = new Online();
      newOnline.username = user.username;
      newOnline.save(error => {
        if (error) {
          return reject(error.message);
        }
        resolve(newOnline);
      });
    });
  },
  removeOnlineUser: user => {
    return new Promise((resolve, reject) => {
      Online.remove({ username: user.username }, (error, user) => {
        if (error) {
          return reject(error.message);
        }
        resolve(user);
      });
    });
  },
  getOnlineUsers: () => {
    return new Promise((resolve, reject) => {
      Online.find({}, (error, users) => {
        if (error) {
          return reject(error.message);
        }
        resolve(users);
      });
    });
  }
};
