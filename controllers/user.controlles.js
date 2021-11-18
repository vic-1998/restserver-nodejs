const { request, response } = require('express');


const userGet = (req, res) => {

    const query = req.query;

    res.status(200).json({
        msg: 'Get Api controlador',
        query
    });
}

const userPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'Post Api controlador',
        nombre,
        edad
    });
}

const userPut = (req, res) => {

    const id = req.params.id;

    res.status(400).json({
        msg: 'Put Api controlador',
        id
    });
}

const userDelete = (req, res) => {

    const id = req.params.id;

    res.status(200).json({
        msg: 'Delete Api controlador',
        id
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}
