import React, { useState } from 'react';
import './ListaAreas.css';
import AreaNatural from '../AreaNatural/AreaNatural';
import BotonCrearArea from '../Crear Area/Boton Crear Area.js';
import { useSelector } from 'react-redux';


const ListaAreas = ({ arrayAreasNaturales, arrayEspecies }) => {
    const user = useSelector((state) => state.user);
    //console.log("especiesAvistadas en lista areas: ", arrayEspecies);

    const [BarraDeBusqueda, setBarraDeBusqueda] = useState("");

    const areasFiltradas = arrayAreasNaturales.filter(area =>
        area.name?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        area.type?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        area.region?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) ||
        area.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())
    );
    return (
        <div className="container lista-areas-container mb-5 mt-5">
            <h1 className="text-center text-primary mt-5">Lista de Áreas Naturales</h1>
    
            {/* Botón para crear nueva área */}
            {user && <BotonCrearArea />}
    
            {/* Barra de búsqueda */}
            <div className="my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Buscar área..."
                    value={BarraDeBusqueda}
                    onChange={(e) => setBarraDeBusqueda(e.target.value)}
                />
            </div>
    
            {/* Lista de áreas filtradas */}
            {areasFiltradas.length > 0 ? (
                areasFiltradas.map((area) => {
                    let especiesAvistadas = arrayEspecies.filter((especie) => especie.naturalAreaId === area.id);
                    return <AreaNatural key={area.id} area={area} especiesAvistadas={especiesAvistadas} />;
                })
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    🚨 No se encontraron áreas que coincidan con la búsqueda.
                </div>
            )}
        </div>
    );
    
}

export default ListaAreas;