const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async (req, res) => {
    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const estadoActivo = { estado: true };

    //destruturacion de arreglos 
    const [total, users] = await Promise.all([
        User.countDocuments(estadoActivo),
        User.find(estadoActivo)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        users,
    });
}

const userPost = async (req, res = response) => {
    //estraer la informacion del body
    const { nombre, correo, password, rol } = req.body;
    const user = new User({
        nombre, correo, password, rol
    });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en db
    await user.save();

    res.status(201).json({
        user,
        msg: "Usuario Creado Correctamente."
    });
}

const userPut = async (req, res) => {
    // obtener el id
    const id = req.params.id;
    // extraemos los parametos del body que no queremos actualizar
    //y en userData enviamos los campos a actulizar
    const { _id, password, google, correo, ...userData } = req.body;

    //validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        userData.password = bcryptjs.hashSync(password, salt);
    }
    // buscamos el id y enviasmos userData para actulizar en la Db
    const userDB = await User.findByIdAndUpdate(id, userData);

    res.status(200).json({
        userDB,
        msg: "Usuario Actualizado Correctamente."
    });
}

const userDelete = async (req, res) => {

    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        user,
        msg: "Usuario Eliminado Correctamente."
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
