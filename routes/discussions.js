const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const discussions = await Discussion.find().populate('author', 'name').populate('comments.author', 'name');
  res.json(discussions);
});

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const discussion = new Discussion({ title, content, author: req.user.id });
  await discussion.save();
  res.status(201).json(discussion);
});

router.post('/:id/comments', auth, async (req, res) => {
  const { content } = req.body;
  const discussion = await Discussion.findById(req.params.id);
  discussion.comments.push({ content, author: req.user.id });
  await discussion.save();
  res.json(discussion);
});

module.exports = router;