const express = require ('express');
const stadiumSchema = require ('../models/modelstadium');
const teamSchema = require('../models/modelteam'); 

const router = express.Router();

// Obtener todos los estadios con población manual de equipos
router.get('/stadiums', async (req, res) => {
  try {
    const estadios = await stadiumSchema.find();
    const estadiosConEquipos = await Promise.all(estadios.map(async (estadio) => {
      const equiposPoblados = await populateEquipos(estadio.equipos);
      return { ...estadio.toObject(), equipos: equiposPoblados };
    }));

    res.json(estadiosConEquipos);
  } catch (error) {
    res.json({ message: error.message, query: 'selectAll' });
  }
});

// Función para población manual de equipos
async function populateEquipos(equipoIds) {
  try {
    const equipos = await teamSchema.find({ _id: { $in: equipoIds } });
    return equipos;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Crear un estadio
router.post('/createstadiums', async (req, res) => {
  try {
    const { nombre, direccion, capacidad, equipos } = req.body;
    const equiposEncontrados = await teamSchema.find({ _id: { $in: equipos } });
    const nuevoEstadio = new stadiumSchema({
      nombre,
      direccion,
      capacidad,
      equipos: equiposEncontrados,
    });

    const estadioGuardado = await nuevoEstadio.save();

    res.json(estadioGuardado);
  } catch (error) {
    res.json({ message: error.message });
  }
});


// Obtener todos los estadios
router.get('/stadiums', (req, res) => {
  stadiumSchema
      .find()
      .populate('equipos') 
      .then((data) => {
          console.log(data);  
          res.json(data);
      })
      .catch((error) => res.json({ message: error, query: 'seletAll' }));
});


//Buscar un equipo de la tabla
router.get('/stadiums/:id', (req,res)=>{
    const {id}= req.params;
    stadiumSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

// Actualizar un estadio
router.put('/updatestadium/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, capacidad, equipos } = req.body;

  try {
    // Actualizar el estadio
    const updatedStadium = await stadiumSchema.findByIdAndUpdate(
      id,
      { nombre, direccion, capacidad, equipos },
      { new: true }
    );

    res.json(updatedStadium);
  } catch (error) {
    res.json({ message: error.message, query: 'updateOne' });
  }
});


router.get('/teams', (req, res) => {
  teamSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error, query: "selectAllTeams" }))
});

//Eliminar un equipo
router.delete('/deletestadium/:id', (req,res)=>{
  const {id}= req.params;
  stadiumSchema
  .deleteOne({_id:id})
  .then((data) => res.json(data))
  .catch((error)=> res.json({message:error, query:"deleteOne"}));
});

module.exports =router;
