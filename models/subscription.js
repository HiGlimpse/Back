const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  first:
  {
    type: String,
    unique: false
  },
  last: {
    type: String,
    unique: false
  }
});

module.exports = mongoose.model('subscription', subscriptionSchema);
