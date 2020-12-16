
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

//Get por id
const getMedicosById = async (req,res=response) => {
     const id =req.params.id;
  
    
    try {

        const medico = await Medicos.findById(id)
        .populate('usuario','nombre img')
        .populate('hospital','nombre img'); 

        res.json({
            ok:true,
            medico
           });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
         ok:false,
         msg:'Medico no encontrado'
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
const ActualizarMedicos = async (req,res=response) =>{

    const id = req.params.id;
    //para capturar el usuario que realiza la actualizacion
    const uid = req.uid;
    //
    const idhospital = req.body.hospital;
   
    try 
    {
        const medicoDB = await Medicos.findById(id);
        if(!medicoDB && !idhospital){
            return res.status(404).json({
                ok:false,
                msg:'El medico o el id de hospital que desea actualizar no existe',
                id
            }); 
        }
        else{

            const cambiosmedicos={
                ...req.body,
                usuario:uid  
               } 
            const medicoActalizado = await Medicos.findByIdAndUpdate(id,cambiosmedicos,{ new:true } );
             res.json({
                ok:true,
                medico:medicoActalizado
               });
        }
      
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
           ok:false,
           msg:'Nose pudo Actualizar el Medico'
        });
    }


}
//Delete
const EliminarMedicos = async(req,res=response) =>{
    
    const id = req.params.id;
    try 
    {
        const medicoDB = await Medicos.findById(id);
        if(!medicoDB)
        {
            return res.status(404).json({
                ok:false,
                msg:'no se pudo eliminar ',
                id
            }); 
        } 
        
        else
        {
            await Medicos.findByIdAndDelete(id);
            res.json({
                ok:true,   
                });
        }
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
           ok:false,
           msg:'Nose pudo Actualizar el Medico'
        });
        
    }

}


module.exports={
    getMedicos,
    CrearMedicos,
    ActualizarMedicos,
    EliminarMedicos,
    getMedicosById
}