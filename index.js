// importante mantener sirmpre la sintaxis.
const express = require('express');
//leyendo variables de entrono 
require('dotenv').config();
//
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

//rutas
// nota ./routes/Routes-usuarios mismo nombre de la carpeta donde se encuentran mis rutas 
app.use('/api/usuarios'  ,    require('./routes/Routes-usuarios'  ) );
app.use('/api/hospitales',    require('./routes/Routes-hospitales') );
app.use('/api/medicos'   ,    require('./routes/Routes-medicos'   ) );
app.use('/api/todo'      ,    require('./routes/Routes-busquedas' ) );
app.use('/api/login'     ,    require('./routes/Routes-auth'      ) );
app.use('/api/uploads'   ,    require('./routes/Routes-uploads'   ) );

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

