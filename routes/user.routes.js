
const { Router } = require('express');
const { check } = require('express-validator');

const {
    userGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user.controlles');
const { rolValido, existeEmail, exiteUserId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, multiRol } = require('../middlewares');

const router = Router();

router.get('/', userGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(existeEmail),
    check('password', 'El password debe de ser mayor a 6 caracteres.').isLength({ min: 6 }),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(rolValido),
    validarCampos
], userPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(exiteUserId),
    check('rol').custom(rolValido),
    validarCampos
], userPut)

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    multiRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(exiteUserId),
    validarCampos
], userDelete)

module.exports = router;
