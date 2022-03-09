const fs = require('fs');
const { response } = require("express");
const { existeCarpeta } = require('../helpers/createOrNotFolder');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');

//Este paquete es de node.js
const path=require('path');

const fileUpload= async (req,res=response)=>{

const tipo = req.params.tipo;
const id= req.params.id;

//validar tipo
const tiposValidos=['hospitales','medicos','usuarios'];
if(!tiposValidos.includes(tipo)){
    return res.status(400).json({
        ok:false,
        msg:'No es u medico, usuario u hospital (tipo)'
    })
}

await existeCarpeta()

//Validar que exista un archivo
//Link de interes: https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok:false,
        msg:'No hay ningun archivo'
    });
  }

//Procesar la imagen
const file=req.files.imagen;

const nombreCortado=file.name.split('.');
const extensionArchivo=nombreCortado[nombreCortado.length-1];

//validar extension
const extensionesValidas=['png','jpg','jpeg','gif'];
if(!extensionesValidas.includes(extensionArchivo)){
    return res.status(400).json({
        ok:false,
        msg:'No es una extension permitida'
    })
}

//Generar nombre del archivo
const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;

//Path para guardar la imagen
const path=`./uploads/${tipo}/${nombreArchivo}`;

//Mover la imagen al path(asignado) del servidor
file.mv(path, (err)=> {
    if (err){
        console.log(err)
        return res.status(500).json({
            ok:false,
            msg:'Error al mover la imagen al path indicado'
        })
    }


    //Actualizar la base de datos
    actualizarImagen(tipo,id,nombreArchivo);


    res.json({
        ok:true,
        msg:'Archivo Subido',
        nombreArchivo
    });
  });

}


const retornaImagen=(req,res=response)=>{

const tipo=req.params.tipo;
const foto=req.params.foto;
const ImagenPorDefecto='noImageDisponible.jpg';

const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`);

//Imagen por defecto

if(fs.existsSync(pathImg)) res.sendFile(pathImg);
else{
 //path.join =>se usa para la ruta absoluta 
 //Link de interes: https://stackoverflow.com/questions/39110801/path-join-vs-path-resolve-with-dirname
 const pathImg=path.join(__dirname,`../uploads/${ImagenPorDefecto}`);
 res.sendFile(pathImg);
}

}

module.exports={
    fileUpload,
    retornaImagen
}