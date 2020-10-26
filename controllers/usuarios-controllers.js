//imports
const Usuario = require('../Models/usuario');
//
const {response} = require('express');
//
const bcrypt = require('bcryptjs');
//
const { generarJWT } = require('../helpers/jwt');
//

//=========================================================//
const getUsuarios = async (req,res=response) => {
  
   //paginacion
     const desde = Number(req.query.desde) || 0;
   // con la desestructuracion de arreglo extraigo el resultado de las promesa 
   //usuario la primera y el total la segunda 
   const [usuarios,total] = await Promise.all([
   // con estas {} llaves dentro del find especifico un filtro, con el skip aplico la paginacion
    Usuario.find({},'nombre email google role img').skip(desde).limit(5),
    Usuario.countDocuments()
   ]);

    res.json({
        ok:true,
        usuarios,
        total
   });
   
}
//crear usuario
// en el request(req) tengo lo que el usuario esta solicitando la peticion del usuario y ahi viene el body
const PostUsuarios = async (req,res=response) => {

  const {email,password,}= req.body;

  try {
      //verificar que el correo exista o cualquier dato que yo desee validar
      //tomo Uusuario el modelo.
      const existeEmail = await Usuario.findOne({email});
      
      if(existeEmail){
        
       return res.status(400).json({
         ok:false,
         msg:'El coreo ya ha sido registrado'
        });

      }

    const usuario = new Usuario(req.body);

    //encriptar clave 
    const salt = bcrypt.genSaltSync();
    usuario.password= bcrypt.hashSync(password,salt);

    //guardar en la base de datos con el await le digo a que termine de hacr la promsesa y despues siga con lo demas 
    //recordar que par usar el await hay que estar dentro de una funcion async
    //guardar usuario
    await usuario.save();
    //Generar el token JWT
    const token = await generarJWT(usuario.id);

     res.json({
        ok:true,
        usuario,
        token
   });
    
  } 
  catch (error) {
    console.log(error);

    res.status(500).json({
      ok:false,
      msg:'Error inesperado...revisar logs'
    })
  }
}

const actualizarUsuario = async (req, res = response) => {
//TODO: validar token y comprobar si es el usuario correcto 
  const uid =req.params.id;
  try {

     const usuarioDB = await Usuario.findById(uid);
     // si el usuario no existe 
     if(!usuarioDB){
      return res.status(400).json({
        ok:false,
        msg:'no existe un usuario registrado con ese id '
      });
     }

     //actaulizaciones con la desestructuración de datos le indico que no actualice password,google,
     // porqu los estoy extrayendo 
     const {password,google,email, ...campos} = req.body;

     if(usuarioDB !== email){  

      // esto lo realizo por si el correo ya existe registardo y el usuario ingresa uno igual a ese que ya esta registrado
      const existeEmail =await Usuario.findOne({email});
      if( existeEmail ){
       return res.status(400).json({
        ok:false,
        msg:'Ya existe un usuario con ese email'

       });
      }

     }
     campos.email=email;

     const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true}); 

    res.json({
      ok:true,
      usuario:usuarioActualizado
    });

  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado'
    });
  }


}
///
const borrarUsuario = async (req,res= response ) =>{
  const uid =req.params.id;
try {
  // validacion si el usuario existe 
  const usuarioDB = await Usuario.findById(uid);
  // si el usuario no existe 
  if(!usuarioDB){
   return res.status(400).json({
     ok:false,
     msg:'no existe un usuario registrado con ese id '
   });
  }
  // elimina el usuario, lo correcto es cambiar el estado ponerlo activo o inactivo
  await Usuario.findByIdAndDelete(uid);

  res.json({
    ok:true,
    msg:'usuario eliminado'
  });
  
} catch (error) {
  console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado'
    });
  
}

}

module.exports={
  getUsuarios,
  PostUsuarios,
  actualizarUsuario,
  borrarUsuario
}