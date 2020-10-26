
//importaciones
const { response } = require("express")
//
const Usuario =require('../Models/usuario');
//
const Hospital =require('../Models/hospital');
//
const Medico =require('../Models/medicos');
// con esto puedo leer las carpetas navegar entre ellas 
const fs = require('fs');


const borrarImagen=(paht)=>{

  //verificar que existe un paht viejo.
    if( fs.existsSync(paht) ){
     //borro la imagen anterior
     fs.unlinkSync(paht);
    } 
}

const actualizarImagen = async (tipo,id,nombreArchivo) => {
   
    let pathViejo ='';
    switch(tipo){

        case 'medicos':
            const medico= await Medico.findById(id);
            if(!medico){
                console.log('no se encontro medico por id ')
                return false;
            }
          // si ya tiene una imagen previamente cargada 
          //medico.img aqui voy a guardar todo uuid con la extencion que tenga
          //este es el path vejo despues tengo que verificar que exista 
            pathViejo=`./uploads/medicos/${medico.img}`;
           borrarImagen(pathViejo);
            //si no existe 
            medico.img = nombreArchivo;
            //guardar
            await medico.save();
            return true;
            
         break;

         case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('no se encontro usuario por id ')
                return false;
            }
            pathViejo=`./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //si no existe 
            usuario.img = nombreArchivo;
            //guardar
            await usuario.save();
            return true;
           
         break;
        
         case 'hospitales':

            const hospital= await Hospital.findById(id);
            if(!hospital){
                console.log('no se encontro hospita por id ')
                return false;
            }
            pathViejo=`./uploads/hospitales/${hospital.img}`;
           borrarImagen(pathViejo);
            //si no existe 
            hospital.img = nombreArchivo;
            //guardar
            await hospital.save();
            return true;

         break;
    }

}


module.exports={
    actualizarImagen
}