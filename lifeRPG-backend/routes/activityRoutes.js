const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { logActivity } = require('../controllers/activityController');

router.post('/', auth, logActivity);

module.exports = router;