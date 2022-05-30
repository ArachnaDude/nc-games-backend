// need to return [username, avatar_url, name]

exports.formatUserData = (userData) => {
  return userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};
