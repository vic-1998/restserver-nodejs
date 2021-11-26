const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatorio.'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    google: {
        type: Boolean,
        default: true,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...userData } = this.toObject();
    userData.uid = _id;
    return userData;
}

module.exports = model('Usuarios', UserSchema);
