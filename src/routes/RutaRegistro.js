const express = require('express');
const RegistroController = require('../controllers/RegistroController');

const router = express.Router();

router.get('/registro', RegistroController.registro);
router.post('/registro', RegistroController.Registrar);

module.exports = router;