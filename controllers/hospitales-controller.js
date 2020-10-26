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
const ActualizarHospitales = (req,res=response) =>{

    res.json({
        ok:true,
        msg:'ActualizarHospitales'
    });
    
}

//Delete
const EliminarHospitales = (req,res=response) =>{

    res.json({
        ok:true,
        msg:'EliminarHospitales'
    });
    
}

module.exports={
    getHospitales,
    CrearHospitales,
    ActualizarHospitales,
    EliminarHospitales
}