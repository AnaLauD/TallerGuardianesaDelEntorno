import { useEffect, useState } from 'react';
import './Especie.css';
import EspecieModal from '../EspecieModal/EspecieModal';

const Especie = ({especie, area}) => {

        const[modalVisible, setModalVisible] = useState(false);        
    
        const handleClickModal = () => {
            setModalVisible(true);
        }
        //console.log("En especie, area: ", area);
        
        return (
            <>
                <div 
                    onClick={handleClickModal} 
                    className="container mt-5 d-flex flex-row align-items-center justify-content-start bg-light p-3 rounded shadow-sm"
                    style={{ cursor: "pointer" }}
                >
                    {/* <div className="me-3">
                        <img src={especie.imageUrl} className="img-thumbnail" alt="Imagen de la especie"/>
                    </div> */}
                    <div>
                        <p className="mb-1"><strong>Nombre:</strong> {especie.commonName}</p>
                        <p className="mb-1"><strong>Nombre Científico:</strong> <em>{especie.scientificName}</em></p>
                        <p className="mb-1"><strong>Categoría:</strong> {especie.category}</p>
                        <p className="mb-0"><strong>Estado:</strong> {especie.conservationStatus}</p>
                    </div>           
                </div>
                {modalVisible && (
                    <EspecieModal especie={especie} area={area} closeModal={() => setModalVisible(false)} />
                )} 
            </>
        );
        
}

export default Especie;