/*
Ruta: /api/usuarios
*/

const {Router} = require('express');
const {check}= require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {getUsuarios,getUsuarioById,crearUsuario,actualizarUsuario,borrarUsuario}= require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Retorna todos los usuarios
router.get('/',validarJWT,getUsuarios);

//Retornar un usuario por ID
router.get('/:id',getUsuarioById)

//Crear un usuario
//parametros post(path,middleware para colocar varios tienen que ir como arreglo,controlador)
router.post('/',
    [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    //este es el middleware personalizado
    validarCampos,
    ]
    ,crearUsuario
);

router.put('/:id',
    [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos
    ]
    ,actualizarUsuario
);

router.delete('/:id',validarJWT,borrarUsuario)




module.exports=router;