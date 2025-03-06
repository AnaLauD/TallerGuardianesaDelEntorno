import React, { useState } from 'react';
import './ListaEspecies.css';
import Especie from '../Especie/Especie';
import BotonCrearEspecie from '../Crear Especie/BotonCrearEspecie';
import { useSelector } from 'react-redux';

const ListaEspecies = ({arrayEspecies, arrayAreasNaturales}) => {    
    const user = useSelector((state) => state.user);
    //console.log( "lista especie: ", Array.isArray(arrayAreasNaturales));

    const [BarraDeBusqueda, setBarraDeBusqueda] = useState("");
        
    const especiesFiltradas = arrayEspecies.filter(especie =>
        especie.commonName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.scientificName?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.category?.toLowerCase().includes(BarraDeBusqueda.toLowerCase()) || 
        especie.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())  ||
        especie.conservationStatus?.toLowerCase().includes(BarraDeBusqueda.toLowerCase())  
    );
    return (
        <div className="container lista-especies-container mb-5">
            <h1 className="text-center text-primary mt-5">Lista de Especies</h1>
    
            {/* Botón para crear nueva especie */}
            {user && <BotonCrearEspecie arrayAreasNaturales={arrayAreasNaturales} />}
    
            {/* Barra de búsqueda */}
            <div className=" my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Buscar especie..."
                    value={BarraDeBusqueda}
                    onChange={(e) => setBarraDeBusqueda(e.target.value)}
                />
            </div>
    
            {/* Lista de especies filtradas */}
            {especiesFiltradas.length > 0 ? (
                especiesFiltradas.map((especie) => {
                    let areaEncontrada = arrayAreasNaturales.find(area => especie.naturalAreaId === area.id);
                    return <Especie key={especie.id} especie={especie} area={areaEncontrada} />;
                })
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    🚨 No se encontraron especies que coincidan con la búsqueda.
                </div>
            )}
        </div>
    );
    
}

export default ListaEspecies;