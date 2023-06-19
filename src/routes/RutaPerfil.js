const express = require('express');
const PerfilController = require('../controllers/PerfilController');

const router = express.Router();

router.get('/modificarPerfil', PerfilController.modificarPerfil);
router.post('/modificarPerfil', PerfilController.updatePerfil);
//router.post('/modificarPerfil', PerfilController.index)
router.post('/modificarPerfil', PerfilController.cambiarFoto)

module.exports = router;