const Usuario=require('../models/usuario');
const Hospital=require('../models/hospital');
const Medico=require('../models/medico');
const fs = require('fs');
const medico = require('../models/medico');
let pathViejo;

const borrarImagen=(path)=>{
    if(fs.existsSync(path)) fs.unlinkSync(path)
}

const actualizarImagen=async (tipo,id,nombreArchivo)=>{

    switch (tipo) {
        case 'usuarios':
            const usuario=await Usuario.findById(id);
            if(!usuario){
                console.log('No se encontro el usuario con el id indicado');
                return false;
            }
            pathViejo=`./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo)
            usuario.img=nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'hospitales':
            const hospital=await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontro el hospital con el id indicado');
                return false;
            }
            pathViejo=`./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo)
            hospital.img=nombreArchivo;
            await hospital.save();
            return true;
        
            break;

        case 'medicos':
            const medico=await Medico.findById(id);
            if(!medico){
                console.log('No se encontro el medico con el id indicado');
                return false;
            }
            pathViejo=`./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo)
            medico.img=nombreArchivo;
            await medico.save();
            return true;
    
            break;
        
    
        default:
            break;
    }
}

module.exports={
    actualizarImagen
}