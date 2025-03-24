const mongoose = require('mongoose');
const clubSchema = new mongoose.Schema({
  name: String,
  description: String,
  coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
module.exports = mongoose.model('Club', clubSchema);