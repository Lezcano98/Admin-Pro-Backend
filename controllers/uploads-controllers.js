
//importaciones 
const {response} = require('express')
//
const { v4: uuidv4 } = require('uuid');
//
const path = require('path');
//
const fs = require('fs');
//
const {actualizarImagen} = require('../helpers/actualizar-imagen');
//

const fileUpload = ( req,res=response ) => {

    const tipo = req.params.tipo;
    const id =req.params.id;
    //validar tipo 
    const tiposValidos=['hospitales','medicos','usuarios'];

    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok:false,
            msg:' el tipo no es Medico,Usuario u Hospital'     
        });
    }

    try {
          //para validar si tengo un archivo
         if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok:false,
                msg:'no hay archivos para cargar '
            });
          }
          //procesar la imagen...
          const file=req.files.imagen;
          //extraer la extencion del archivo,utilizo el split porque quiero lo que 
          //esta despues del ultimo punto en este caso la extencion para que se puedan cargar solo imagenes  
          const nombrecortado = file.name.split('.');
          //obtengo la extencion del archivo
          const extencionArchivo =nombrecortado[nombrecortado.length - 1 ];
          //validar extencion
          const extencionesValidas =['png','jpg','gif','jpeg'];
          if( !extencionesValidas.includes(extencionArchivo) )
          {
              return res.status(400).json({
                ok:false,
                msg:'el archivo que desea subir no es de admitido'
              });

          }
          //Generar el nombre del archivo
           const nombreArchivo= `${ uuidv4() }.${ extencionArchivo }`;
         
           //path para guardar la imagen 
           const path =`./uploads/${tipo}/${nombreArchivo}`;

            // mover la imagen 
           file.mv( path, (err) => {
           if (err){
             console.log(err);
             return res.status(500).json({
                ok:false,
                msg:'error al mover la imagen '
              });
           }
           //Actualizar base de datos 
           else{
               // envio lo que voy a usar en el helper 
            actualizarImagen(tipo,id,nombreArchivo);
            res.json({
                ok:true,
                msg:'Archivo cargado con exito',
                nombreArchivo
            })
           }
               
         });   
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error al intentar cargar al archivo contacte al administardor'
        });
        
    }
}

const retornarImagen = (req, res=response)=>{

    const tipo = req.params.tipo;
    const img  = req.params.img;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${img}`);
    //imagen por defecto 
    if( fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    }
    else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg); 
    }
    
}


module.exports={
    fileUpload,
    retornarImagen
}