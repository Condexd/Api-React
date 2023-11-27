const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    apodo: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' 
    },
    fotoPerfil: {
        type: String,
        default: "https://i.pinimg.com/236x/6c/77/8d/6c778d343743d9b2f108708dbde5b762.jpg"  
    }
});

module.exports = mongoose.model('User', userSchema);
