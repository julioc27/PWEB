const express = require('express');

const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.autenticar);
router.get('/logout', LoginController.logout);

module.exports = router;