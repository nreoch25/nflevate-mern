import Online from "../models/online";

export default {
  addOnlineUser: user => {
    const newOnline = new Online();
    newOnline.username = user.username;
    newOnline.save(error => {
      if (error) {
        return console.log(error.message);
      }
      console.log("ONLINE USER ADDED", newOnline);
    });
  },
  removeOnlineUser: user => {
    Online.remove({ username: user.username }, error => {
      if (error) {
        return console.log(error.message);
      }
      console.log("ONLINE USER REMOVED");
    });
  }
};
