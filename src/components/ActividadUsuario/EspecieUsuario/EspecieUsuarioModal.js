import React, { useState } from 'react';
import './EspecieUsuarioModal.css';
import { useSelector } from 'react-redux';

const EspecieUsuarioModal = ({ closeModal, arrayAreasNaturales, editarEspecieUsuario, area, especie }) => {
    //console.log("Array Areas en Editar Especie usuario modal", arrayAreasNaturales);

    const arrayAreasNaturalesTodas = useSelector((state) => state.data.arrayAreasNaturales); //importo todas las areas naturales para pasarselo al select

    const [commonName, setCommonName] = useState(especie?.commonName);
    const [scientificName, setScientificName] = useState(especie?.scientificName);
    const [category, setCategory] = useState(especie?.category);
    const [conservationStatus, setConservationStatus] = useState(especie?.conservationStatus);
    const [naturalAreaId, setNaturalAreaId] = useState(especie?.naturalAreaId);

    const [resultData, setresultData] = useState(null);

    const handleEditarEspecie = async (event) => {
        event.preventDefault();

        const result = await (editarEspecieUsuario(especieEditada)); //lo hago asi, porque asi puedo guardar el resultado de la funcion editarAreaUsuario(), y luego muestro el result en el formulario
        //console.log("Especie editada en modal", especieEditada)

        setresultData(result);
    };


    const especieEditada = {
        "id": especie.id,
        "commonName": commonName,
        "scientificName": scientificName,
        "category": category,
        "conservationStatus": conservationStatus,
        "naturalAreaId": naturalAreaId

    }

    return (
        <>
            <form onSubmit={handleEditarEspecie}>
                <div className='register-container'>
                    <div className="form-register">
                        <button className='modal-close' onClick={closeModal}>✖</button>

                        <div className='form-group'>
                            <h3>Editar Especie</h3>
                        </div>
                        {resultData && (
                            resultData.success == false
                                ? <p className="text-danger"><strong>Error al Modificar Especie</strong></p>
                                : <p className="text-success"><strong>Especie Modificada con Exito</strong></p>
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

                                {/* <option value="">-Seleccione un área-</option> */}
                                <option value="">-Seleccione un área-</option>

                                {arrayAreasNaturalesTodas.map((areaNueva) => (
                                    <option key={areaNueva.id} value={areaNueva.id}>
                                        {areaNueva.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <button type='submit' className='btn btn-primary'>Editar Especie</button>
                    </div>
                </div>

            </form>

        </>
    );
};

export default EspecieUsuarioModal;