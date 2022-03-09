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

router.put('/:tipo/:id',[validarJWT],fileUpload);

router.get('/:tipo/:foto',retornaImagen)

module.exports=router;