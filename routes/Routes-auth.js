/*
Path: 'api/login'
*/

//importaciones 
const {Router} = require('express');
//
const {check} = require('express-validator');
//
const {login,googleSignIn,renewToken}=require('../controllers/auth-controllers');
//
const {validarCampos} = require('../middlewares/validar-campos');
//
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();

router.post('/',
     [
       check('email','El correo es obligatorio').not().isEmpty().isEmail(),
       check('password','Bebe ingresar una clave').not().isEmpty(),
       validarCampos
     ],
    
 login
);

//post token google
router.post('/google',
     [
       check('token','el token de Google es obligatorio').not().isEmpty(),
       validarCampos
     ],
    
     googleSignIn
);

//get 
router.get('/renew',validarJWT,renewToken);


//
module.exports = router;