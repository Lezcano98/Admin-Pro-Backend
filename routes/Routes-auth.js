/*
Path: 'api/login'
*/

//importaciones 
const {Router} = require('express');
//
const {check} = require('express-validator');
//
const {validarCampos} = require('../middlewares/validar-campos');
//
const {login}=require('../controllers/auth-controllers');


const router=Router();

router.post('/',
     [
       check('email','El correo es obligatorio').not().isEmpty().isEmail(),
       check('password','Bebe ingresar una clave').not().isEmpty()
     ],
    
 login
);


module.exports=router;