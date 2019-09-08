const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    id : {
        type : Number,
        required: true
    },
    nombre_del_curso: {
        type : String,
        required : true
    },
    modalidad: {
        type : String,
        required : false
    },
    valor: {
        type : Number,
        required : true
    },
    duracion: {
        type : Number,
        required : false
    },
    descripcion: {
        type : String,
        required : true
    },
    estado: 'Disponible'});

    const cursos = mongoose.Model('Curso', cursoSchema);