import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateTeam() {
    const { id } = useParams();
    const [teamInfo, setTeamInfo] = useState({
        nombre: "",
        direccion: "",
        pagina: "",
        correo: "",
        estadio: ""
    });
    const [estadios, setEstadios] = useState([]);
    const [escudo, setEscudo] = useState(null); // Agrega este estado para el escudo
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9000/api/stadiums')
            .then(result => setEstadios(result.data))
            .catch(err => console.log(err));

        axios.get(`http://localhost:9000/api/teams/${id}`)
            .then(result => {
                console.log(result.data);
                setTeamInfo(result.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', teamInfo.nombre);
        formData.append('direccion', teamInfo.direccion);
        formData.append('pagina', teamInfo.pagina);
        formData.append('correo', teamInfo.correo);
        formData.append('estadio', teamInfo.estadio);
        formData.append('escudo', escudo || ''); 

        axios.put(`http://localhost:9000/api/updateteam/${id}`, formData)
            .then(result => {
                console.log(result);
                navigate('/teams');
            })
            .catch(err => console.log(err));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Actualizar equipo</h2>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Nombre'
                            className='form-control'
                            name="nombre"
                            value={teamInfo.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Dirección'
                            className='form-control'
                            name="direccion"
                            value={teamInfo.direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Página'
                            className='form-control'
                            name="pagina"
                            value={teamInfo.pagina}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            placeholder='Correo'
                            className='form-control'
                            name="correo"
                            value={teamInfo.correo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <select className='form-control' placeholder='Estadio' onChange={(e) => setTeamInfo(prevState => ({ ...prevState, estadio: e.target.value }))}>
                            <option value='' disabled>
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

export default UpdateTeam;
