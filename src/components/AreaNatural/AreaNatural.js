import { useState } from 'react';
import './AreaNatural.css';
import AreaNaturalModal from '../AreaNaturalModal/AreaNaturalModal';

const AreaNatural = ({area, especiesAvistadas}) => {

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }

        return(
            <>
                <div onClick={handleClickModal} className="area-especie-container container mt-4 mx-auto">
                    <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
                        
                        {/* Imagen del área */}
                        <div className="thumbnail-container me-3 ">
                            <img src={area.imageUrl} className="thumbnail rounded w-100 img-fluid object-fit-cover" alt="Área Natural" />
                        </div>
        
                        {/* Información del área */}
                        <div className="ms-3">
                            <p><strong>Nombre:</strong> {area.name}</p>
                            <p><strong>Tipo:</strong> {area.areaType}</p>
                            <p><strong>Región:</strong> {area.region}</p>
                            <p><strong>Estado:</strong> {area.conservationStatus}</p>
                        </div>
                    </div>
                </div>
        
                {/* Modal de detalles */}
                {modalVisible && (
                    <AreaNaturalModal 
                        area={area} 
                        especiesAvistadas={especiesAvistadas} 
                        closeModal={() => setModalVisible(false)}
                    />
                )}
            </>
        );
        
}

export default AreaNatural;