const express = require('express');
const router = express.Router();
const Club = require('../models/club');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  const clubs = await Club.find().populate('coordinator', 'name').populate('members', 'name');
  res.json(clubs);
});

router.post('/', [auth, admin], async (req, res) => {
  const { name, description } = req.body;
  const club = new Club({ name, description, coordinator: req.user.id });
  await club.save();
  res.status(201).json(club);
});

router.post('/:id/join', auth, async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club.members.includes(req.user.id)) {
    club.members.push(req.user.id);
    await club.save();
  }
  res.json(club);
});

module.exports = router;