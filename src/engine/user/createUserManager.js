const createUserManager = () => {
  const users = {};
  const usersID = [];
  return ({
    addUser(user) {
      users[user.username] = user;
      usersID.push(user.username);
      return this;
    },
    removeUser(username) {
      delete users[username];
      usersID.filter((id) => id === username);
      return this;
    },
    getUser: (username) => users[username],
    display: () => console.log('userManager users: ', users),
    update: () => users,
  });
};

module.exports = createUserManager;
