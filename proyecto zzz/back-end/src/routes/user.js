const express = require("express");
const userSchema = require ("../models/modeluser");

const router = express.Router();

// Crear un usuario
router.post('/createusers', (req, res) => {
    const { nombres, apellidos, apodo, edad, equipo, fotoPerfil } = req.body;
    const user = new userSchema({ nombres, apellidos, apodo, edad, equipo, fotoPerfil });
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios
router.get('/users', (req, res) => {
    userSchema
    .find()
    .populate('equipo') 
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

//obtener un usuario
router.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// Actualizar un usuario
router.put('/updateuser/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, apodo, edad, equipo, fotoPerfil } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { nombres, apellidos, apodo, edad, equipo, fotoPerfil }})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario por ID
router.delete('/deleteuser/:id', (req, res) => {
    const { id } = req.params;
  
    userSchema
      .deleteOne({ _id: id })
      .then((res) => res.json(res))
      .catch((err) => res.json({ message: err }));
  });
  
  module.exports = router;