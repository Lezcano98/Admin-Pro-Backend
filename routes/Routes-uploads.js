/*
ruta: api/uploads/
*/

const {Router}         = require('express');
//
const { fileUpload,retornarImagen }   = require('../controllers/uploads-controllers');
//
const { validarJWT }   = require('../middlewares/validar-jwt');
//
const expressFileUpload = require('express-fileupload');
//
const router= Router();

//===============================================================//

router.use(expressFileUpload());


//get(recuperar imagen)
router.get('/:tipo/:img',validarJWT,retornarImagen);


//put(subir archivo)
router.put('/:tipo/:id',validarJWT,fileUpload);



//exportanto las rutas 
module.exports = router;