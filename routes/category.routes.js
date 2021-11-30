const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getCategoryRoute,
    getCategoryByIdRoute,
    createCategoryRoute,
    updateCategoryRoute,
    deleteCategoryRoute,
} = require('../controllers/category.controller');
const { validarJWT } = require('../middlewares');
const { validCategoryId } = require('../helpers/db-validators');

const router = Router();

router.get('/', [
], getCategoryRoute);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validCategoryId),
    validarCampos
],
    getCategoryByIdRoute
)

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
],
    createCategoryRoute
)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validCategoryId),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
],
    updateCategoryRoute
)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validCategoryId),
    validarCampos
],
    deleteCategoryRoute
)

module.exports = router;
