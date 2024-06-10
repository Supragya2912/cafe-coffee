const router= require('express').Router();
const { registerUser, loginUser, getProfile } = require('../controllers/auth');
const authCheck = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/get-profile',authCheck, getProfile);


module.exports = router;