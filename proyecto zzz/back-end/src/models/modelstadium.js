const mongoose = require ("mongoose");

const stadiumSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    equipos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

module.exports = mongoose.model('Stadium', stadiumSchema);
