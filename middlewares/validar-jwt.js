// importaciones
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuario');


const validarJWT = (req,res,next)=>{

    //leer el token 
    const token = req.header('x-token');
    console.log(token);

     if(!token){
      return res.status(401).json({
       ok:false,
       msg:'no hay token'
      });
     }
     // verificacion del JWT
     try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        //
        req.uid = uid;
        next();  
     }
      catch (error) 
     {
         console.log(error);
         return res.status(401).json({
          ok:false,
          msg:'Token Incorrecto '
         });
         
    }
}

const ValidarAdminRole = async (req,res,next) =>{
  const uid =req.uid;

    try {
      const usuarioDB = await Usuario.findById(uid);

      if( !usuarioDB ){

       return status(404).json({
        ok:false,
        msg:'el usuario no existe'
       });

      }

     else if( usuarioDB.role !== 'Admin_Rol'){

        return res.status(403).json({
            ok:false,
            msg:'no tiene privilegios para realizar esta accion '
           });
        
      }
      next();
  
    
    } 
     catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el Administrador del sistema'
    })
}

}


const ValidarAdminRole_o_MismoUsuario = async (req,res,next) =>{
    const uid =req.uid;
    const id = req.params.id;
  
      try {
        const usuarioDB = await Usuario.findById(uid);
  
        if( !usuarioDB ){
  
         return status(404).json({
          ok:false,
          msg:'el usuario no existe'
         });
  
        }
  
        if( usuarioDB.role === 'Admin_Rol' || uid === id){
  
            next();
          
        }
        else{
            return res.status(403).json({
                ok:false,
                msg:'no tiene privilegios para realizar esta accion '
               });

        } 
      } 
       catch (error) {
      console.log(error);
      res.status(500).json({
          ok:false,
          msg:'Hable con el Administrador del sistema'
      })
  }
  
  }

module.exports={
    validarJWT,
    ValidarAdminRole,
    ValidarAdminRole_o_MismoUsuario
}