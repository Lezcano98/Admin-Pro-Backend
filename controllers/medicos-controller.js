
//imports
const { response } = require("express");
// se llama el modelo para poder conectar con mongoDB
const Medicos= require('../Models/medicos');

//Get
const getMedicos = async (req,res=response) => {

    const medicos = await Medicos.find()
   .populate('usuario','nombre img')
   .populate('hospital','nombre img'); 
    
    try {
        res.json({
            ok:true,
            medicos
           });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
         ok:false,
         msg:'contacte al Adminitrador'
        });
        
    }
    
}

//Post
const CrearMedicos = async (req,res=response) =>{

   const uid = req.uid; 
   const medicos = new Medicos({usuario:uid, ...req.body});
    try {

        const medicosDB = await medicos.save();
        res.json({
            ok:true,
            medicos:medicosDB
           });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
         ok:false,
         msg:'Contacte al administrador'
        });
    }

   

}

//Put
const ActualizarMedicos = (req,res=response) =>{

    res.json({
     ok:true,
     msg:'ActualizarMedicos'
    });

}
//Delete
const EliminarMedicos = (req,res=response) =>{

    res.json({
     ok:true,
     msg:'EliminarMedicos'
    });

}


module.exports={
    getMedicos,
    CrearMedicos,
    ActualizarMedicos,
    EliminarMedicos
}