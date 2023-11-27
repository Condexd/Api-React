const mongoose = require ("mongoose");

const teamSchema = mongoose.Schema({
    escudo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3050/3050404.png" 
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    pagina: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    jugadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    estadio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stadium'
    }
});

module.exports = mongoose.model('Team', teamSchema);
