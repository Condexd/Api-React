import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateStadium() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9000/api/stadiums/${id}`)
            .then(result => {
                setNombre(result.data.nombre || '');
                setDireccion(result.data.direccion || '');
                setCapacidad(result.data.capacidad || '');
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/api/updatestadium/${id}`, { nombre, direccion, capacidad })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Actualizar estadio</h2>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Nombre'
                            className='form-control'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Dirección'
                            className='form-control'
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Capacidad'
                            className='form-control'
                            value={capacidad}
                            onChange={(e) => setCapacidad(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStadium;
