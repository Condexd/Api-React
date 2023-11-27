import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStadium() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/createstadiums", { nombre, direccion, capacidad })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Agregar estadio</h2>
          <div className='mb-2'>
            <input
              type="text"
              placeholder='Nombre'
              className='form-control'
              onChange={(e) => setNombre(e.target.value)} required
            />
          </div>
          <div className='mb-2'>
            <input
              type="text"
              placeholder='Dirección'
              className='form-control'
              onChange={(e) => setDireccion(e.target.value)} required
            />
          </div>
          <div className='mb-2'>
            <input
              type="number"
              placeholder='Capacidad'
              className='form-control'
              onChange={(e) => setCapacidad(e.target.value)}
            />
          </div>
          <button className='btn btn-success'>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStadium;
