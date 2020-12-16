//imports
const { response } = require("express");
//
const Usuario =require('../Models/usuario');
//
const Medicos= require('../Models/medicos');
//
const Hospital= require('../Models/hospital');


const getTodo = async (req,res=response) =>{
   
    const busqueda =  req.params.busqueda;
    const rexpr    =  new RegExp(busqueda,'i');
    try {
        const [usuarios,medicos,hospital] = await Promise.all([

            Usuario.find (  {nombre:rexpr}  ),
            Medicos.find (  {nombre:rexpr}  ),
            Hospital.find(  {nombre:rexpr}  )
        ]);

        res.json({
            ok:true,
            usuarios,
            medicos,
            hospital
        });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({

         ok:false,
         msg:'Contacte al Adminitrador'

        });
        
    }
    
}


const  getEspeficicaColeccion= async (req,res=response) =>{

    const tabla     =  req.params.tabla;
    const busqueda  =  req.params.busqueda;
    const rexpr     =  new RegExp(busqueda,'i');
    let data;

    try {

        switch ( tabla ) {

         case 'medicos':
           data = await Medicos.find ({nombre:rexpr})
           .populate('usuario','nombre img')
           .populate('hospital','nombre img');
                
            break;

         case 'hospitales':
            data = await Hospital.find({nombre:rexpr}).populate('hospital','nombre img');
                
            break;

         case 'usuarios':
            data = await  Usuario.find ({nombre:rexpr}).populate('usuario', 'nombre img');
                
            break;
        
            default:
              return res.status(400).json({
                  ok:false,
                  msg:'la tabla debe ser:  usuarios/medicos/hospitales'
              });
        }
        res.json({
            ok:true,
            resultado:data

        });
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({

         ok:false,
         msg:'Contacte al Adminitrador'

        });
        
    }
    
}



module.exports={
    getTodo,
    getEspeficicaColeccion
}