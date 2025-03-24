const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const schedules = await Schedule.find();
  res.json(schedules);
});

router.post('/', auth, async (req, res) => {
  const schedule = new Schedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
});

module.exports = router;