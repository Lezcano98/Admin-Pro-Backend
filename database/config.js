const mongoose = require('mongoose');
//leyendo variables de entrono 
require('dotenv').config();

const dbConnection = async() => {

    try {
      // con el await hago que todo trabaje de forma sincrona 
      await mongoose.connect(process.env.DB_CNN,
      {
       useNewUrlParser: true, 
       useUnifiedTopology: true,
       useCreateIndex:true
      });   

      console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de iniciar la DB ver logs');
    }
 
}
//para poder usar la funcio de mi conexion a la base datos fuera de este archivo
module.exports={
    dbConnection
}