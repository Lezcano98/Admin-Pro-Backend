// importaciones
const jwt = require('jsonwebtoken');


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

module.exports={
    validarJWT,
}