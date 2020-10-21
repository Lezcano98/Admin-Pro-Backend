// importaciones mongose
const {Schema,model} = require('mongoose');
//
const UsarioSchema = Schema({
   // el tipo String debe ir em mayuscula la S.
    nombre:  {  type:String , required:true },

    email:   {  type:String , required:true , unique:true },

    password:{  type:String , required:true},

    img:     {  type:String    },

    role:    {  type:String , required:true , default:'User_Role' },

    google:  {  type:Boolean , default:false }
});

UsarioSchema.method('toJSON',function(){

const {__v,_id,password, ...object}= this.toObject();
 object.uid=_id;
 return object;
});
 
//implementacion del modelo
module.exports = model('Usuario',UsarioSchema);




