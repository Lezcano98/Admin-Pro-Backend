/*
ruta : /api/hospitales'
*/

//importaciones
const {Router} = require('express');
//
const {check} = require('express-validator');
//
const {getHospitales,CrearHospitales,ActualizarHospitales,EliminarHospitales} = require('../controllers/hospitales-controller');
//
const {validarCampos} = require('../middlewares/validar-campos');
//
const { validarJWT } = require('../middlewares/validar-jwt');

//=================================================================================///
const router= Router();


//get(Consultar)
router.get('/',getHospitales);

//post (Agregar)
router.post('/',
    [
     validarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     validarCampos
    ],
CrearHospitales);

//Put(Actualizar) nota:tener en cuenta los :id para evitar errores 
router.put('/:id',
    [
        check('nombre','El nombre del hospital es requerido').not().isEmpty(),
        validarJWT
    ],
ActualizarHospitales
);

//Delete (Borrar)
router.delete('/:id',validarJWT,EliminarHospitales);


//exportanto las rutas 
module.exports = router;



