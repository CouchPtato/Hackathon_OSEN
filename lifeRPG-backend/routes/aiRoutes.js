const router = require('express').Router();
const { generateQuest } = require('../controllers/aiController');

router.post('/generate-quest', generateQuest);

module.exports = router;