// importaciones mongose
const {Schema,model} = require('mongoose');

//
const MedicoSchema = Schema({
   // el tipo String debe ir em mayuscula la S.
    nombre:  {  type:String , required:true },

    img:     {  type:String    },

    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
      
    //los medicos estaran asociados a un hospital por eso aplico esta refencia 
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }

});

//==============================================//
MedicoSchema.method('toJSON',function(){

const {__v, ...object}= this.toObject();
 return object;
});
 
//implementacion del modelo
module.exports = model('Medico',MedicoSchema);