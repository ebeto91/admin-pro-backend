/*
    Ruta: /api/upload/:tipo/:id
*/

//Este es el middleware

const {Router} = require('express');

//Llamar el paquete express-fileupload
const expressfileUpload = require('express-fileupload');
const {fileUpload,retornaImagen}= require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Inicializar el paquete
router.use(expressfileUpload());

//Ruta para actualizar la imagen
router.put('/:tipo/:id',[validarJWT],fileUpload);

//ruta para retornar la imagen
router.get('/:tipo/:foto',retornaImagen)

module.exports=router;