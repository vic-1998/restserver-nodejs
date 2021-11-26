const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleverify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;
    try {
        //verificar si el email existe
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos.'
            })
        }
        //varificar si el usuario esta activo o no
        if (!user.estado) {
            return res.status(400).json({
                msg: 'Usuario no existe.'
            })
        }
        //validar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            })
        }
        //generar jwt
        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Login successful',
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo Salio Mal...',
        })
    }
}

const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleverify(id_token);

        let user = await User.findOne({ correo });

        if (!user) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }
        //si el usuario en Db
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Usuario no existe.'
            })
        }
        //generar jwt
        const token = await generarJWT(user.id);

        res.json({
            msg: 'Usuario Creado correctamente.',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar.'
        })
    }
}

module.exports = {
    login,
    googleSingIn
}
