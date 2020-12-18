//imports 
const {response} = require('express');
//
const Usuario = require('../Models/usuario');
//
const { generarJWT } = require('../helpers/jwt');
//
const bcrypt = require('bcryptjs');
//
const {googleVerify} = require('../helpers/google-verify');
//
const {GetMenuFrondEnd}=require('../helpers/menu-frondEnd');



const login = async (req,res=response) => {

    const { email,password } = req.body;  

    try {
        //primero verificar que el email existe, en la bd
        const usuarioDB = await Usuario.findOne({email});
        // si no existe el usuario
        if(!usuarioDB){
         return res.status(404).json({
             ok:false,
             msg:'Ese correo no esta registrado '

         });
        }
        // verificar password, primero password que el usuaio escribio y luego el hash string que esta be la BD
        const validPassword = bcrypt.compareSync(password,usuarioDB.password);
        if( !validPassword ){
            return res.status(404).json({
                ok:false,
                msg:'Clave incorrecta'

            });
        }
        //Generar el token JWT
         const token = await generarJWT(usuarioDB.id);
        ////=================////
          res.json({
            ok:true,
            token,
            menu:GetMenuFrondEnd(usuarioDB.role)
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

const googleSignIn = async (req,res=response) => {

    const googleToken = req.body.token;
     try 
     {
        const {name,email,picture} = await googleVerify(googleToken);
        //
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if(!usuarioDB){
            //si no existe el usuario
            usuario = new Usuario({
             nombre:name,
             email,
             password:'@@@',
             img:picture,
             google:true
            });
        }
        else{
            // existe el susuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password ='@@@';
        }
         //guardar en la base de datos 
         await usuario.save();
         //Generar el token JWT
         const token = await generarJWT(usuario.id);


         
         res.json({
          ok:true,
          msg:'Google Sign-In',
          token,
          menu:GetMenuFrondEnd(usuario.role)
         });
         
     } 
     catch (error) 
     {
         console.log(error);
         res.status(401).json({
          ok:false,
          msg:'Ocurrio un error inesperado'
         });
     }
}

const renewToken = async ( req, res = response ) => {
   
    const uid = req.uid;

    //Generar el token JWT
    const token = await generarJWT(uid);
    //obtner datos del usuario por uid guardado en el token 
    const usuario = await Usuario.findById( uid );

    try 
    {
     res.json({
         ok:true,
         token,
         usuario,
         menu:GetMenuFrondEnd(usuario.role)
     });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
} 

module.exports={
    login,
    googleSignIn,
    renewToken
}