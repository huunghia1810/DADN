const Gasleak = require('./gasleak')

module.exports = function configure(app) {
  app.configure(Gasleak)
}
