import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Teams() {
    const [teams, setTeams] = useState([{
        nombre: "", direccion: "", pagina:"", correo:"", estadio:"" 
    }]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/teams')
        .then(result => setTeams(result.data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9000/api/deleteteam/${id}`)
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
        <Link to="/createteam" className='btn btn-primary' style={{ backgroundColor: '#5597F8' }}>Agregar</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th>Escudo</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Página</th>
                    <th>Correo</th>
                    <th>Estadio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team) => (
                    <tr key={team._id}>
                        <td>
                            {team.escudo && <img src={team.escudo} alt="Escudo del equipo" style={{ maxWidth: '50px', maxHeight: '50px' }} />}
                        </td>
                        <td>{team.nombre}</td>
                        <td>{team.direccion}</td>
                        <td>{team.pagina}</td>
                        <td>{team.correo}</td>
                        <td>{team.estadio ? team.estadio.nombre : 'Sin estadio'}</td>
                        
                        <td>
                            <Link to={`/updateteam/${team._id}`} className='btn btn-primary' style={{ marginRight: '0.5rem', backgroundColor: '#5597F8' }}>Actualizar</Link>
                            <button className='btn btn-primary' style={{ backgroundColor: '#0d6efd' }} onClick={() => handleDelete(team._id)}>Eliminar</button>
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

export default Teams;
