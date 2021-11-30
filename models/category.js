const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, estado, ...category } = this.toObject();
    return category;
}

module.exports = model('Categoria', CategorySchema);
