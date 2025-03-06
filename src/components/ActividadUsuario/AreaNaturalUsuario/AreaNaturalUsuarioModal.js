import AreaNaturalUsuario from "./AreaNaturalUsuario";
import { useState } from "react";

const AreaNaturalUsuarioModal = ({ area, editarAreaUsuario, closeModal }) => {

    const [name, setName] = useState(area?.name);
    const [location, setLocation] = useState(area?.location);
    const [areaType, setAreaType] = useState(area?.areaType);
    const [region, setRegion] = useState(area?.region);
    const [description, setDescription] = useState(area?.description);
    const [conservationStatus, setConservationStatus] = useState(area?.conservationStatus);
    const [imageUrl, setImageUrl] = useState(area?.imageUrl);

    const [resultData, setresultData] = useState(null);

    const areaEditada = {
        "id": area.id,
        "name": name,
        "location": location,
        "areaType": areaType,
        "region": region,
        "conservationStatus": conservationStatus,
        "description": description,
        "imageUrl": imageUrl
    }

    const handleEditarArea = async (event) => {
        event.preventDefault();

        const result = await (editarAreaUsuario(areaEditada)); //lo hago asi, porque asi puedo guardar el resultado de la funcion editarAreaUsuario(), y luego muestro el result en el formulario

        setresultData(result);
    };

    return (
        <>
            <form onSubmit={handleEditarArea}>
                <div className='register-container'>
                    <div className='form-register'>
                        <button className='modal-close' onClick={closeModal}>✖</button>

                        <div className="form-group">
                            <h3>Editar área natural</h3>
                        </div>
                        {resultData  && (
                            resultData.success
                                ? <p className="text-success"><strong>Area Natural Actualizada con Exito</strong></p>
                                : <p className="text-danger">No se pudo editar el area</p>)}
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
                        <button type="submit" className="btn btn-primary">Actualizar Area</button>
                    </div>
                </div>
            </form>
        </>
    );

}

export default AreaNaturalUsuarioModal;