import './EspecieModal.css';

const EspecieModal = ({ closeModal, especie, area }) => {
    //console.log(area);
    return (
        <>
            <div className="register-container">
                <div className="form-register">
                    <button className="modal-close btn btn-sm" onClick={closeModal}>✖</button>
    
                    <div className="form-group">
                        <p><strong>Nombre:</strong> {especie.commonName}</p>
                        <p><strong>Nombre Científico:</strong> {especie.scientificName}</p>
                        <p><strong>Categoría:</strong> {especie.category}</p>                    
                        <p><strong>Estado:</strong> {especie.conservationStatus}</p>
                        <p><strong>Área Avistada:</strong> {area ? area.name : "No hay áreas asociadas a esta especie"}</p>
                    </div>
    
                    <div className="form-group">
                        <p><strong>Estado de conservación:</strong> {especie.conservationStatus}</p>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default EspecieModal;