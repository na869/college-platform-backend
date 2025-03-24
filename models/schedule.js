const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
  type: { type: String, enum: ['exam', 'event'] },
  title: String,
  date: Date,
  description: String,
});
module.exports = mongoose.model('Schedule', scheduleSchema);