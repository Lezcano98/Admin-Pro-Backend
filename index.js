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


//base de datos
dbConnection();

//rutas
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:'hola mundo'
    })
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

