/*
Ruta: /api/medicos
*/

//importaciones
const {Router} = require('express');
//
const {check} = require('express-validator');
//
const {
    getMedicos,
    CrearMedicos,
    ActualizarMedicos,
    EliminarMedicos, 
    getMedicosById
} = require('../controllers/medicos-controller');
//
const {validarCampos} = require('../middlewares/validar-campos');
//
const { validarJWT } = require('../middlewares/validar-jwt');

//=================================================================================///
const router= Router();

//get(Consultar)
router.get('/',validarJWT,getMedicos);

//post (Agregar)
router.post('/',
    [
     validarJWT,
     check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
     // para validar que id es correcto 
     check('hospital','Debe Ingresar un id de Hospital Valido').isMongoId(),
     validarCampos
    ],
    CrearMedicos);

//Put(Actualizar) nota:tener en cuenta los :id para evitar errores 
router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
        // para validar que id es correcto 
        check('hospital','Debe Ingresar un id de Hospital Valido').isMongoId(),
        validarCampos

    ],
ActualizarMedicos);

//Delete (Borrar)
router.delete('/:id',validarJWT,EliminarMedicos);

//obtener un medico Especifico
router.get('/:id',validarJWT,getMedicosById);



//exportanto las rutas 
module.exports = router;