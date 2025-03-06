import React, { useState } from 'react';
import CrearAreaModal from './CrearAreaModal.js';

const BotonCrearArea = () => {
    const [mostrarModal, setMostrarModal] = useState(false);    

    return (
        <>
            <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
                Crear Área
            </button>
            {mostrarModal && (
                <CrearAreaModal closeModal={() => setMostrarModal(false)} />
            )}            
        </>
    );
};

export default BotonCrearArea;

