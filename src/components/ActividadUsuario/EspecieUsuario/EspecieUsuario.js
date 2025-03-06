import { useEffect, useState } from 'react';
import './EspecieUsuario.css';
import EspecieUsuarioModal from './EspecieUsuarioModal';

const EspecieUsuario = ({ especie, borrarEspecieUsuario, editarEspecieUsuario, arrayAreasNaturales, area }) => {

    const [mostrarEditarEspecieUsuarioModal, setMostrarEditarEspecieUsuarioModal] = useState(false);

    const handleBorrarEspecie = () => {

        if (window.confirm(`¿Desea eliminar la especie '${especie.commonName}'?`)) {
            borrarEspecieUsuario(especie.id);

        }
    };  

    const handleEditarModal = () => {
        setMostrarEditarEspecieUsuarioModal(true);
    }

    return (
        <>
            <div className="card shadow-sm mb-3 p-3">
                <div className="d-flex align-items-center">
                    <div>
                        <p className="mb-1"><strong>Nombre:</strong> {especie.commonName}</p>
                        <p className="mb-1"><strong>Nombre Científico:</strong> <em>{especie.scientificName}</em></p>
                        <p className="mb-1"><strong>Categoría:</strong> {especie.category}</p>
                        <p className="mb-0"><strong>Estado:</strong> {especie.conservationStatus}</p>
                    </div>
                </div>

                <div className="text-end mt-3">
                    <button className="btn btn-primary btn-sm me-2" onClick={handleEditarModal}>
                        ✏️ Modificar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleBorrarEspecie}>
                        🗑 Eliminar
                    </button>
                </div>
            </div>
            {mostrarEditarEspecieUsuarioModal && (
                <EspecieUsuarioModal closeModal={() => setMostrarEditarEspecieUsuarioModal(false)}
                    editarEspecieUsuario={editarEspecieUsuario}
                    area={area}
                    especie={especie}
                    arrayAreasNaturales={arrayAreasNaturales} />
            )}
        </>
    );

}

export default EspecieUsuario;