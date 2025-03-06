import { useState } from "react";
import './AreaNaturalModal.css';

const AreaNaturalModal = ({ closeModal, area, especiesAvistadas }) => {

    return (
        <div className="register-container d-flex align-items-center justify-content-center">
            <div className="form-register area-natural shadow-lg p-4 rounded w-75 w-md-50 position-relative" style={{ maxWidth: "700px", maxHeight: "90vh", overflowY: "auto" }}>
                
                {/* Botón para cerrar */}
                <button className="modal-close position-absolute top-0 end-0 m-3" onClick={closeModal}>✖</button>
    
                <div className="form-group">
                    <img></img>
                </div>
    
                <div className="form-group">
                    <p><strong>Nombre:</strong> {area.name}</p>
                    <p><strong>Región:</strong> {area.region}</p>
                    <p><strong>Descripción:</strong> {area.description}</p>
    
                    {/* Imagen del área con tamaño máximo */}
                    <img src={area.imageUrl} alt="Imagen del área" className="img-fluid area-modal-image rounded mb-3"  />
    
                    {/* Lista de especies avistadas */}
                    {especiesAvistadas.length > 0 ? (
                        <>
                            <h5 className="mt-2">Especies Avistadas en la Zona</h5>
                            <ul className="">
                                {especiesAvistadas.map((especie, index) => (
                                    <li key={index} className="">
                                        {especie.commonName}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-center text-muted mt-2">No se registraron especies avistadas en esta zona.</p>
                    )}
    
                    {/* Mapa de ubicación con tamaño reducido */}
                    <iframe 
                        className="map rounded mt-3 w-100"
                        style={{ height: "250px", border: 0 }}
                        loading="lazy"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCY2eeOJsOQOLYOctfobek8ILlDhqMGAo&q=${encodeURIComponent(area.location)}`}
                    ></iframe>
                </div>
            </div>
        </div>
    );
    
}

export default AreaNaturalModal;