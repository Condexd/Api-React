import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [apodo, setApodo] = useState('');
    const [edad, setEdad] = useState('');
    const [equipo, setEquipo] = useState('');
    const [equipos, setEquipos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9000/api/teams')
            .then(result => {
                setEquipos(result.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });

        axios.get(`http://localhost:9000/api/users/${id}`)
            .then(result => {
                setNombres(result.data.nombres || '');
                setApellidos(result.data.apellidos || '');
                setApodo(result.data.apodo || '');
                setEdad(result.data.edad || '');
                setEquipo(result.data.equipo || '');
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    const handleEquipoChange = (e) => {
        setEquipo(e.target.value);
    };

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/api/updateuser/${id}`, { nombres, apellidos, apodo, edad, equipo })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Actualizar usuario</h2>
                    <div className='mb-2'>
                        <input type="text"
                            placeholder='Nombres'
                            className='form-control'
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <input type="text"
                            placeholder='Apellidos'
                            className='form-control'
                            value={apellidos} onChange={(e) => setApellidos(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <input type="text"
                            placeholder='Apodo'
                            className='form-control'
                            value={apodo} onChange={(e) => setApodo(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <input type="number"
                            placeholder='Edad'
                            className='form-control'
                            value={edad} onChange={(e) => setEdad(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <select className='form-control' value={equipo} onChange={handleEquipoChange} required>
                            <option value="" disabled>Selecciona un equipo</option>
                            {equipos.map((equipo) => (
                                <option key={equipo._id} value={equipo._id}>{equipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;