const Usuario = require('../models/usuario');
const Hospital= require('../models/hospital');
const Medico=require('../models/medico');


const existencia=async(id,modelo)=>{

let result=false;

switch(modelo){

case "usuario":
 result= await (Usuario.findById(id)) ? true : false
break;

case "hospital":
 result= await (Hospital.findById(id)) ? true : false
break;

case "medico":
 result = await (Medico.findById(id)) ? true : false
break;

}    

return result;

}

module.exports={
    existencia
}