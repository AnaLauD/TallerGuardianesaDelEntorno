import React, { useState } from 'react';
import './CrearAreaModal.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAreas } from '../../dataSlice';

const CrearAreaModal = ({ closeModal }) => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [areaType, setAreaType] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [conservationStatus, setConservationStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [resultData, setresultData] = useState(null);

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const InsertarAreaNatural = async (event) => {
        event.preventDefault();

        const area = {
            "userId": user.id,
            "naturalArea": {
                "name": name,
                "location": location,
                "areaType": areaType,
                "region": region,
                "conservationStatus": conservationStatus,
                "description": description,
                "imageUrl": imageUrl
            }
        }
        const insert = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(area),
            }
        )
        const data = await insert.json();
        setresultData(data);

        if (insert.ok) {
            setresultData(true);

            // Hacemos otro fetch para obtener la lista actualizada de áreas
            const respAllAreas = await fetch(
                'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            const dataAll = await respAllAreas.json();

            // Actualizamos el store con la lista completa
            dispatch(setAreas(dataAll.items));

        } else {
            setresultData(false);
        }

    }

    return (
        <>
            <form onSubmit={InsertarAreaNatural}>
                <div className='register-container'>
                    <div className='form-register'>
                        <button className='modal-close' onClick={closeModal}>✖</button>

                        <div className="form-group">
                            <h3>Crear área natural</h3>
                        </div>
                        {resultData != null && (
                            resultData
                                ? <p className="text-success"><strong>Area Natural Creada con Exito</strong></p>
                                : <p className="text-danger">No se pudo crear el area</p>)}
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Parque Nacional Oro y Carbon" required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Localidad</label>
                            <input type="text" className="form-control" id="region" aria-describedby="region" placeholder="Colonia" required
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Región</label>
                            <input type="text" className="form-control" id="region" aria-describedby="region" placeholder="Tarariras" required
                                value={region}
                                onChange={e => setRegion(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Tipo de Area</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Parque Nacional" required
                                value={areaType}
                                onChange={e => setAreaType(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Descripcion" required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Estado de Conservacion</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" placeholder="Critico" required
                                value={conservationStatus}
                                onChange={e => setConservationStatus(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl">Imagen</label>
                            <input type="url" className="form-control" id="imageUrl" aria-describedby="imageUrl" placeholder="https://www.geaconsultores.com/wp-content/uploads/2018/01/CAP.jpg" required
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Cargar Area</button>
                    </div>
                </div>
            </form>
        </>
    );

}
export default CrearAreaModal;