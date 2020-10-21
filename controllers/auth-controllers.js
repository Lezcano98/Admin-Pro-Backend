//imports 
const {response} = require('express');
//
const Usuario = require('../Models/usuario');
//
const { generarJWT } = require('../helpers/jwt');
//
const bcrypt = require('bcryptjs');


const login = async (req,res=response) => {

    const { email,password } = req.body;  

    try {
        //primero verificar que el email existe, en la bd
        const usuarioDB= await Usuario.findOne({email});
        // si no existe el usuario
        if(!usuarioDB){
         return res.status(404).json({
             ok:false,
             msg:'Error Inesperado'

         });
        }
        // verificar password, primero password que el usuaio escribio y luego el hash string que esta be la BD
        const validPassword=bcrypt.compareSync(password,usuarioDB.password);
        if( !validPassword ){
            return res.status(404).json({
                ok:false,
                msg:'Error inesperado contacte la adminitrador'

            });
        }
        //Generar el token JWT
         const token = await generarJWT(usuarioDB.id);
        ////=================////
          res.json({
            ok:true,
            token
        });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error iniesperado'
        });
    }

}

module.exports={
    login,
}