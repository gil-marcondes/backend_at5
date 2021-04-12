const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const PessoaSchema= new Schema(
    {
user:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
comentario:{
    type:String,
    
},
senha:{
    type:String,
    
},
data:{
    type:Date,
    default:Date.now()
},

    }
);

module.exports=Pessoa=mongoose.model("pessoa", PessoaSchema);
