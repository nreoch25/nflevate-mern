class Global {
  constructor() {
    console.log("CONSTRUCTOR");
    this.globalUsers = [];
    this.currentUser = null;
  }
  addUser(id, user) {
    this.currentUser = user.username;
    if (!this.globalUsers.includes(this.currentUser)) {
      this.globalUsers.push(this.currentUser);
    }
  }
  removeUser() {
    let newUsers = [];
    if (this.globalUsers.includes(this.currentUser)) {
      newUsers = this.globalUsers.filter(user => user !== this.currentUser);
    }
    this.globalUsers = newUsers;
    console.log(this.globalUsers);
  }
  getUsers() {
    return this.globalUsers;
  }
}

export default Global;
