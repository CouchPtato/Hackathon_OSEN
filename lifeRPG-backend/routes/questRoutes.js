const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getQuests, createQuest, completeQuest } = require('../controllers/questController');

router.get('/', auth, getQuests);
router.post('/', auth, createQuest);
router.patch('/:id/complete', auth, completeQuest);

module.exports = router;