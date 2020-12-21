// importante mantener sirmpre la sintaxis.
const express = require('express');
//leyendo variables de entrono 
require('dotenv').config();
//
const path =require('path');
//cors
const cors = require('cors');
//
const {dbConnection}= require('./database/config');
// crear el sevidor express
const app = express();

//configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//base de datos
dbConnection();

//directorio publico
app.use(express.static('public'));

//rutas
// nota ./routes/Routes-usuarios mismo nombre de la carpeta donde se encuentran mis rutas 
app.use('/api/usuarios'  ,    require('./routes/Routes-usuarios'  ) );
app.use('/api/hospitales',    require('./routes/Routes-hospitales') );
app.use('/api/medicos'   ,    require('./routes/Routes-medicos'   ) );
app.use('/api/todo'      ,    require('./routes/Routes-busquedas' ) );
app.use('/api/login'     ,    require('./routes/Routes-auth'      ) );
app.use('/api/uploads'   ,    require('./routes/Routes-uploads'   ) );

// lo ultimo ya cuando he desplegado mi apliacion para que todas mis rutas pasen por el idex y si hacen 
// un resfresh de la pagina no ocurra ningun error.
 app.get('*',(req,res) =>{
  res.sendFile(path.resolve(__dirname,'public/index.html'));

 });

// para levantarlo
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ' + process.env.PORT);
});


//mongo credential data base
// MUihGTlTvGevKFGe
//mean_user
//////
//hK2W74KJJEFg0HsK
//lezcano_user

