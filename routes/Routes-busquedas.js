/*
ruta: api/todo/
*/

const {Router} = require('express');
//
const {getTodo,getEspeficicaColeccion}= require('../controllers/buscar-controller');
//
const { validarJWT } = require('../middlewares/validar-jwt');
//
const router= Router();

//===============================================================//

//get(Buscar)
router.get('/:busqueda',validarJWT,getTodo);


//Busqueda especifica
router.get('/coleccion/:tabla/:busqueda',validarJWT,getEspeficicaColeccion);

//exportanto las rutas 
module.exports = router;