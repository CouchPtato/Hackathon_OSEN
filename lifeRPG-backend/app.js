const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/authRoutes'));
app.use('/quests', require('./routes/questRoutes'));
app.use('/activity', require('./routes/activityRoutes'));
app.use('/ai', require('./routes/aiRoutes'));
app.use('/leaderboard', require('./routes/leaderboardRoutes'));

module.exports = app;