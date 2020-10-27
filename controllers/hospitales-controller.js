//imports
const { response } = require("express");
// se llama el modelo para poder conectar con mongoDB
const Hospital= require('../Models/hospital');

//get
const getHospitales = async (req,res=response) =>{

    const hospitales = await Hospital.find( ).populate('usuario','nombre img');  

    try {
        res.json({
            ok:true,
            hospitales
        });
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
         ok:false,
         msg:'Contacte al Administrador'
        });
        
    }

    
}
//Post
const CrearHospitales = async ( req,res=response ) =>{
    
    const uid = req.uid;
    const hospital= new Hospital( { usuario:uid, ...req.body } );
   
    try {
          
       const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital:hospitalDB
        });
        
    } 
    catch (error) {

        console.log(error);
        res.status(500).json({
         ok:false,
         msg:'Error inesperado contacte ala administardor(a)'
        });     
    }   
}

//Put
const ActualizarHospitales = async (req,res=response) => {
    
     const id = req.params.id;
     //para capturar el usuario que realiza la actualizacion
     const uid = req.uid;
     try 
     {
       const hospitalDB = await Hospital.findById(id);
       if(!hospitalDB){
         
         return res.status(404).json({
            ok:false,
            msg:'El hospital que desea actualizar no existe',
            id
        });  
     }
     else{
       const cambioshospital={
        ...req.body,
        usuario:uid  
       } 
       const hospitalActalizado = await Hospital.findByIdAndUpdate(id,cambioshospital,{ new:true } );

       res.json({
        ok:true,
       hospital:hospitalActalizado
    });
    
       }  
       
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
           ok:false,
           msg:'Nose pudo Actualizar el hospital'
        });
        
    }
  
}

//Delete
const EliminarHospitales = async(req,res=response) =>{
     
    const id = req.params.id;
  
    try 
    {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            res.status(404).json({
                ok:false,
                msg:'Error contacte al adminitrador'
             });
          }

          else{
            await Hospital.findByIdAndDelete(id);
            res.json({
            ok:true,   
            });    
          }  
    } 
    
    catch (error) {

        console.log(error);
        res.status(500).json({
           ok:false,
           msg:'Error contacte al adminitrador'
        });
        
    }

}

module.exports={
    getHospitales,
    CrearHospitales,
    ActualizarHospitales,
    EliminarHospitales
}