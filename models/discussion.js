const mongoose = require('mongoose');
const discussionSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ content: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Discussion', discussionSchema);