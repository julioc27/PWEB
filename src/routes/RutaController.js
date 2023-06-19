const express = require('express');


const RutaController = require('../controllers/Controller');


const router = express.Router();

router.get('/crearrutina', RutaController.crearrutina);
router.post('/crearrutina', RutaController.generarTabla);
router.get('/crearrutina', RutaController.cargarTabla);
//router.post('/crearrutina', RutaController.cargarTabla);

router.get('/tablaUser', RutaController.amigos);

router.post('/usuarios/{{usuario}}/seguir', RutaController.seguir);







module.exports = router;