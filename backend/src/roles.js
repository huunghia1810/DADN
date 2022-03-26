module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('login', (data) => {
    data.user['lastLoggedIn'] = new Date();
    app.service('users').patch(data.user.id, data.user);
  })
}
