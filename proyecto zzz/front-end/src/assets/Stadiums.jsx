import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/users.css';


function Stadiums() {
    const [stadiums, setStadiums] = useState([{
      nombre: "", direccion: "", capacidad: "", equipos: []
    }]);
  
    useEffect(() => {
      axios.get('http://localhost:9000/api/stadiums')
        .then(result => {
          console.log(result.data); 
          setStadiums(result.data);
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
      axios.delete(`http://localhost:9000/api/deletestadium/${id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err));
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">Inicio</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link className="nav-link" to="/">Jugadores</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/teams">Equipos</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/stadiums">Estadios</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
        <div className='w-50 bg-white rounded p-3'>
          <Link to="/createstadium" className='btn btn-primary' style={{ backgroundColor: '#5597F8' }}>Agregar</Link>
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stadiums.map((stadium) => (
                <tr key={stadium._id}>
                  <td>{stadium.nombre}</td>
                  <td>{stadium.direccion}</td>
                  <td>{stadium.capacidad}</td>
                  <td>
                    <Link to={`/updatestadium/${stadium._id}`} className='btn btn-primary' style={{ marginRight: '0.5rem', backgroundColor: '#5597F8' }}>Actualizar</Link>
                    <button className='btn btn-primary' style={{ backgroundColor: '#0d6efd' }} onClick={() => handleDelete(stadium._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stadiums;
