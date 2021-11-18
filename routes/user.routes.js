
const { Router } = require('express');
const {
    userGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user.controlles');

const router = Router();

router.get('/', userGet)

router.post('/', userPost)

router.put('/:id', userPut)

router.delete('/:id', userDelete)

module.exports = router;
