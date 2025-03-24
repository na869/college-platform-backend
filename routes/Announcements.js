const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  const announcements = await Announcement.find().populate('author', 'name');
  res.json(announcements);
});

router.post('/', [auth, admin], async (req, res) => {
  const { title, content } = req.body;
  const announcement = new Announcement({ title, content, author: req.user.id });
  await announcement.save();
  io.emit('newAnnouncement', announcement);
  res.status(201).json(announcement);
});

module.exports = router;