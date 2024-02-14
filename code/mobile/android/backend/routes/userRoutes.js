const express = require('express');
const { registerDriver, loginDriver, createLogBook, getLogBooks } = require('../controllers/userController');


const router = express.Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);
router.post('/createlogbook', createLogBook);
router.get('/getlogbook', getLogBooks);

module.exports = router;



