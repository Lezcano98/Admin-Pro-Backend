/*
Ruta: /api/usuarios
*/

//importaciones
const {Router} = require('express');
//
const {check} = require('express-validator');
//
const {validarCampos} = require('../middlewares/validar-campos');
//
const {getUsuarios,PostUsuarios,actualizarUsuario,borrarUsuario} = require('../controllers/usuarios-controllers');
//
const { validarJWT } = require('../middlewares/validar-jwt');

//=================================================================================///
const router= Router();

//get
router.get('/',validarJWT,getUsuarios);

//post
router.post('/',

[
    check('nombre','El nombre es obligatorio' ).not().isEmpty(),
    check('password', 'La clave es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio y no debe estar repetido' ).isEmail().not().isEmpty(),
    validarCampos,
]

,PostUsuarios);

//Put nota:tener en cuenta los :id para evitar errores 
router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es obligatorio' ).not().isEmpty(),
    check('email', 'El email es obligatorio' ).isEmail(),
    check('role','el rol es obligatorio').not().isEmpty(),
    validarCampos,
   
],

actualizarUsuario
);


router.delete('/:id',validarJWT,borrarUsuario);



//exportanto las rutas 
module.exports = router;



