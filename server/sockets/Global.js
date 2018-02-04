class Global {
  static addUser(id, user) {
    console.log("ADD USER", id, user);
    const { username } = user.username;
    this.globalUsers.push(username);
  }
  static removeUser(id) {
    console.log("REMOVE USER", id);
  }
}

export default Global;
