import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [pagina, setPagina] = useState('');
  const [correo, setCorreo] = useState('');
  const [estadios, setEstadios] = useState([]);
  const [estadio, setEstadio] = useState('');
  const [escudo, setEscudo] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/stadiums')
      .then(result => setEstadios(result.data))
      .catch(err => console.log(err));
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('pagina', pagina);
    formData.append('correo', correo);
    formData.append('estadio', estadio);
    formData.append('escudo', escudo);

    axios.post("http://localhost:9000/api/createteams", formData)
      .then(result => {
        console.log(result);
        navigate('/teams'); 
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Agregar equipo</h2>
          <div className='mb-2'>
            <input type="text" placeholder='Nombre' className='form-control' onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className='mb-2'>
            <input type="text" placeholder='Dirección' className='form-control' onChange={(e) => setDireccion(e.target.value)} required />
          </div>
          <div className='mb-2'>
            <input type="text" placeholder='Página' className='form-control' onChange={(e) => setPagina(e.target.value)} required />
          </div>
          <div className='mb-2'>
            <input type="text" placeholder='Correo' className='form-control' onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <div className='mb-2'>
            <select className='form-control' placeholder='Estadio' onChange={(e) => setEstadio(e.target.value)} required>
              <option value='' disabled selected>
                Selecciona un estadio
              </option>
              {estadios.map((estadio) => (
                <option key={estadio._id} value={estadio._id}>
                  {estadio.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-2'>
            <input type="file" accept="image/*" onChange={(e) => setEscudo(e.target.files[0])} className='form-control' />
          </div>
          <button className='btn btn-primary' style={{ backgroundColor: '#0d6efd' }}>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTeam;
