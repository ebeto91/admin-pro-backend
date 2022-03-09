
const fs = require('fs');
const dir = './uploads';
let existeCarpetaPadre=false;

//link de interes:https://www.codegrepper.com/code-examples/javascript/node+js+get+all+files+in+directory+and+subdirectories

const existeCarpeta = async()=>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        checkSubCarpetas();
    }else{
        existeCarpetaPadre=true;
        checkSubCarpetas();
    }
}

const checkSubCarpetas = async()=>{

const subCarpertas=['usuarios','hospitales','medicos'];

if(!existeCarpetaPadre){

    subCarpertas.forEach(subFolder => {
        let path=`${dir}/${subFolder}`
        fs.mkdirSync(path);
    });

}else{
    
    //Obtener todos los directorios dentro del directorio padre
    const getDirectories = fs.readdirSync(dir, { withFileTypes: true })
                                .filter(subFolder => subFolder.isDirectory())
                                .map(subFolser => subFolser.name)

   

    //verificamos si el directorio padre no tiene subdirectorios
    if(getDirectories.length === 0){
        
        subCarpertas.forEach(subFolder => {
            let path=`${dir}/${subFolder}`
            fs.mkdirSync(path);
        });
    
    }else{

        //Verificamos si falta unos subdirectorio en total tienen que ser 3
        if(getDirectories.length!==3){
           
            //Link:https://www.codegrepper.com/code-examples/javascript/only+keep+duplicates+between+two+arrays+javascript
            //con el filter y el ! se obtine el o los elementos que nos estan duplicados en ambos arrays.
           let carpetafaltante = subCarpertas.filter(carpeta => !getDirectories.includes(carpeta));
            carpetafaltante.forEach(subFolder => {
                let path=`${dir}/${subFolder}`
                fs.mkdirSync(path);
            });
        }
    
    
    }
}

}

module.exports={
    existeCarpeta
}

