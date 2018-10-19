const users = {}

function addUser (userinfo) {
  if (users[userinfo.username]) return false
  users[userinfo.username] = userinfo
  return true
}

function getUser (userinfo) {
  return users[userinfo.username]
}

function updateUser (userinfo) {
  if (users[userinfo.username]) return false
  users[userinfo.username] = userinfo
  return true
}

module.exports = {
  addUser: addUser,
  getUser: getUser,
  updateUser: updateUser
}
