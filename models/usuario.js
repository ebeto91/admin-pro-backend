const {Schema,model} = require('mongoose');




const UsuarioSchema= Schema({
    nombre:{
        type:String,
        required:true
      
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
        
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    },

    
})

//se busca que no salga _id si no mas bien uid, nota se agrega el password para no mostrarlo en las peticiones
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password ,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports=model('Usuario',UsuarioSchema);