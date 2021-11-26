const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/user');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Necesita autenticacion.'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existe en la db.'
            })
        }

        //verificar si el usuario esta activo
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Usuario no existe.'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido.'
        })
    }
}

module.exports = {
    validarJWT
}
