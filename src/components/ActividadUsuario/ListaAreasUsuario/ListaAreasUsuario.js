import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AreaNaturalUsuario from '../AreaNaturalUsuario/AreaNaturalUsuario.js';


const ListaAreasUsuario = ({ arrayAreasNaturales, borrarAreaUsuario, editarAreaUsuario }) => {
    return (
        <div className="container-fluid my-5">
            <h1 className="text-center text-primary">Lista Áreas Naturales</h1>

            <div className="row mt-4">
                {arrayAreasNaturales.map((area) => (
                    <div key={area.id} className=" mb-4">
                        <div className="card shadow-sm p-3">
                            <AreaNaturalUsuario 
                                area={area} 
                                borrarAreaUsuario={borrarAreaUsuario} 
                                editarAreaUsuario={editarAreaUsuario}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ListaAreasUsuario;