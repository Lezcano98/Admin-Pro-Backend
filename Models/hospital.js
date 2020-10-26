// importaciones mongose
const {Schema,model} = require('mongoose');

//
const HospitalSchema = Schema({
   // el tipo String debe ir em mayuscula la S.
    nombre:  {  type:String , required:true },

    img:     {  type:String    },

    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }

},{collection:'hospitales'});

//==============================================//
HospitalSchema.method('toJSON',function(){

const {__v, ...object}= this.toObject();
 return object;
});
 
//implementacion del modelo
module.exports = model('Hospital',HospitalSchema);




