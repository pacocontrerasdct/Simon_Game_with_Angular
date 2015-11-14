var mongoose = require('mongoose');

var PlayerSchema = mongoose.Schema({
  name: String,
  email: String,
  level: { type : Number, default: 0 },
  score: { type : Number, default: 0 },
  createdAt: { type : Date, default: Date.now }

  // games: {
  //   level: { type : Number, default: 0 },
  //   score: { type : Number, default: 0 },
  //   createdAt: { type : Date, default: Date.now }
  // }
  
});

module.exports = mongoose.model('Player', PlayerSchema);