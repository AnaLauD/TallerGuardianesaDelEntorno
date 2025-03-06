import { useState } from 'react';
import './AreaNaturalUsuario.css';
import AreaNaturalUsuarioModal from './AreaNaturalUsuarioModal';

const AreaNaturalUsuario = ({ area, borrarAreaUsuario, editarAreaUsuario }) => {

    const [mostrarEditarAreaModal, setMostrarEditarAreaModal] = useState(false);

    const handleBorrarArea = () => {

        if (window.confirm(`¿Desea eliminar el área '${area.name}'?`)) {
            borrarAreaUsuario(area.id);

        }
    };

    return (
        <>
            <div className="card shadow-sm mb-3 p-3">
                <div className="d-flex align-items-center">
                    {/* Contenedor de la imagen */}
                    <div className="thumbnail-container me-3">
                        <img
                            src={area.imageUrl}
                            className="img-fluid rounded"
                            alt={`Imagen de ${area.name}`}
                            style={{ maxWidth: "120px", height: "auto" }}
                        />
                    </div>

                    {/* Información del área */}
                    <div>
                        <p className="mb-1"><strong>Nombre:</strong> {area.name}</p>
                        <p className="mb-1"><strong>Tipo:</strong> {area.areaType}</p>
                        <p className="mb-1"><strong>Región:</strong> {area.region}</p>
                        <p className="mb-1"><strong>Estado:</strong> {area.conservationStatus}</p>
                    </div>
                </div>

                {/* Botón de eliminar */}
                <div className="text-end mt-3">
                    <button className="btn btn-primary btn-sm me-2" onClick={() => setMostrarEditarAreaModal(true)}>
                        ✏️ Modificar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleBorrarArea}>
                        🗑 Eliminar
                    </button>
                </div>
            </div>
            {mostrarEditarAreaModal && (
                <AreaNaturalUsuarioModal closeModal={() => setMostrarEditarAreaModal(false)} editarAreaUsuario={editarAreaUsuario} area={area}/>
            )} 
        </>
    );

}

export default AreaNaturalUsuario;