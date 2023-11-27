import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/users.css';


function Users() {
    const [users, setUsers] = useState([{
        nombres: "", apellidos: "", apodo:"", edad:"", equipo:"" 
    }]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/users')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9000/api/deleteuser/${id}`)
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
                <Link to="/create" className='btn btn-primary' style={{ backgroundColor: '#5597F8' }}>Agregar</Link>
                <table className='table'>
                <thead>
                    <tr>
                        <th>Foto de Perfil</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Apodo</th>
                        <th>Edad</th>
                        <th>Equipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.fotoPerfil && <img src={user.fotoPerfil} alt="Foto de perfil" style={{ maxWidth: '50px', maxHeight: '50px' }} />}
                            </td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.apodo}</td>
                            <td>{user.edad}</td>
                            <td>{user.equipo ? user.equipo.nombre : 'Sin equipo'}</td>

                            <td>
                                <Link to={`/update/${user._id}`} className='btn btn-primary' style={{ marginRight: '0.5rem', backgroundColor: '#5597F8' }}>Actualizar</Link>
                                <button className='btn btn-primary' style={{ backgroundColor: '#0d6efd' }} onClick={() => handleDelete(user._id)}>Eliminar</button>
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

export default Users;

