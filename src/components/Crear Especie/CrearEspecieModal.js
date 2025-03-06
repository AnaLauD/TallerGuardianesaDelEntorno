import React, { useState } from 'react';
import './CrearEspecieModal.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEspecies } from '../../dataSlice';
import { setAreas } from '../../dataSlice';

const CrearEspecieModal = ({ closeModal, arrayAreasNaturales }) => {
    const [commonName, setCommonName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [category, setCategory] = useState('');
    const [conservationStatus, setConservationStatus] = useState('');
    const [naturalAreaId, setNaturalAreaId] = useState('');
    const [resultData, setresultData] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const InsertarEspecie = async (event) => {
        event.preventDefault();

        const especie = {
            "userId": user.id,
            "species": {
                "commonName": commonName,
                "scientificName": scientificName,
                "category": category,
                "conservationStatus": conservationStatus,
                "naturalAreaId": naturalAreaId

            }
        }
        const insert = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/insert?secret=TallerReact2025!',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(especie),
            }
        )

        const data = await insert.json();
        setresultData(data);        

        if (insert.ok) {
            setresultData(true);

            // Recargargamos la lista de especies
            const respSpecies = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000');
            const dataSpecies = await respSpecies.json();
            dispatch(setEspecies(dataSpecies.items));

            // Volvemos a cargar las areas para mostrar en el area la nueva especie asociada
            const respAreas = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000');
            const dataAreas = await respAreas.json();

            // Despachamos al store
            dispatch(setAreas(dataAreas.items));

        } else {
            setresultData(false);
        }
    }
    return (
        <>
            <form onSubmit={InsertarEspecie}>
                <div className='register-container'>
                    <div className="form-register">
                        <button className='modal-close' onClick={closeModal}>✖</button>

                        <div className='form-group'>
                            <h3>Crear Especie</h3>
                        </div>
                        {resultData != null && (
                            resultData
                                ? <p className="text-success"><strong>Especie Creada con Exito</strong></p>
                                : <p className="text-danger"><strong>Error al Crear Especie</strong></p>
                        )}

                        <div className='form-group'>
                            <label htmlFor='name'>Nombre</label>
                            <input type='text' className='form-control' id='name' aria-describedby="name" placeholder="Nombre de la especie" required
                                value={commonName}
                                onChange={e => setCommonName(e.target.value)} />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='name'>Nombre Cientifico</label>
                            <input type='text' className='form-control' id='scientificName' aria-describedby="ScrientificName" placeholder="Nombre 100tifico" required
                                value={scientificName}
                                onChange={e => setScientificName(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='category'>Categoria</label>
                            <input type='text' className='form-control' id='category' aria-describedby="category" placeholder="Carnivoro" required
                                value={category}
                                onChange={e => setCategory(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='conservationStatus'>Estado de Conservacion</label>
                            <input type='text' className='form-control' id='conservationStatus' aria-describedby="conservationStatus" placeholder="Normal" required
                                value={conservationStatus}
                                onChange={e => setConservationStatus(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='naturalArea'>Área Natural</label>
                            <select className='form-control' id='naturalArea' required value={naturalAreaId} onChange={e => setNaturalAreaId(e.target.value)}>

                                <option value="">-Seleccione un área-</option>
                                {

                                    arrayAreasNaturales.map(area => (
                                        <option key={area.id} value={area.id}>{area.name}</option>))
                                }

                            </select>
                        </div>
                        <button type='submit' className='btn btn-primary'>Crear Especie</button>
                    </div>
                </div>

            </form>

        </>
    );
};

export default CrearEspecieModal;