const express = require ('express');
const teamSchema = require ('../models/modelteam');

const router = express.Router();

// Crear un equipo
router.post('/createteams', (req, res) => {
    const teamDev = new teamSchema(req.body);
    teamDev.save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});

// Obtener todos los equipos
router.get('/teams', (req, res) => {
    teamSchema
    .find()
    .populate('jugadores') 
    .populate('estadio') 
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message:error,query:"seletAll"}))
});

//Buscar un equipo de la tabla
router.get('/teams/:id', (req,res)=>{
    const {id}= req.params;
    teamSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar un equipo
router.put('/updateteam/:id', (req,res)=>{
  const {id}= req.params;
  const {nombre, direccion, pagina, correo} = req.body;

  teamSchema
  .updateOne({_id:id},{$set:{nombre, direccion, pagina, correo}})
  .then((data) => res.json(data))
  .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//Eliminar un equipo
router.delete('/deleteteam/:id', (req,res)=>{
  const {id}= req.params;
  teamSchema
  .deleteOne({_id:id})
  .then((data) => res.json(data))
  .catch((error)=> res.json({message:error, query:"deleteOne"}));
});

module.exports =router;