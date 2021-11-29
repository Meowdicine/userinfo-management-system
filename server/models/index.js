const {url} = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = {
  url,
  mongoose,
  User: require('./user.js')(mongoose),
  Provider: require('./provider.js')(mongoose)
}
