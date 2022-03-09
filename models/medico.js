const {Schema,model}=require('mongoose');

const MedicoSchema=Schema({

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
    },

    hospital:{
        requiered:true,
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    }

    //Nota  si el medico tiene varios hospitales tiene que ir entre llaves cuadradas arreglo[]

   /* 
   hospital:[{
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    }]
    */

//{collection:'nombre tabla'}=> sirve para renombrar el nombre de la tabla en la DB.
},{collection:'medicos'})

MedicoSchema.method('toJSON',function(){
    const {__v,...object}=this.toObject();
    
    return object; 
})

module.exports=model('Medico',MedicoSchema)