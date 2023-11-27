import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [apodo, setApodo] = useState('');
  const [edad, setEdad] = useState('');
  const [equipo, setEquipo] = useState({});
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/teams')
      .then(result => setEquipos(result.data))
      .catch(err => console.log(err));
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/createusers", { nombres, apellidos, apodo, edad, equipo })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Agregar usuario</h2>
          <div className='mb-2'>
            <input type="text"
              placeholder='Nombres'
              className='form-control'
              onChange={(e) => setNombres(e.target.value)} required
            />
          </div>
          <div className='mb-2'>
            <input type="text"
              placeholder='Apellidos'
              className='form-control'
              onChange={(e) => setApellidos(e.target.value)} required
            />
          </div>
          <div className='mb-2'>
            <input type="text"
              placeholder='Apodo'
              className='form-control'
              onChange={(e) => setApodo(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <input type="number"
              placeholder='Edad'
              className='form-control'
              onChange={(e) => setEdad(e.target.value)} required
            />
          </div>
          <div className='mb-2'>
            <select
              className='form-control'
              value={equipo._id}
              onChange={(e) => setEquipo(equipos.find((eq) => eq._id === e.target.value))}
              required
            >
              <option value="" disabled>
                Selecciona un equipo
              </option>
              {equipos.map((equipo) => (
                <option key={equipo._id} value={equipo._id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>
          <button className='btn btn-success'>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
