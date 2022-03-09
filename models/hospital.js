const {Schema,model}=require('mongoose');

const HospitalSchema=Schema({

    nombre:{
        type:String,
        required:true
    },

    img:{
        type:String
    },

    usuario:{
        required:true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }

//{collection:'nombre tabla'}=> sirve para renombrar el nombre de la tabla en la DB.
},{collection:'hospitales'})


HospitalSchema.method('toJSON',function(){
    const {__v,...object}=this.toObject();
    
    return object; 
})

module.exports=model('Hospital',HospitalSchema)