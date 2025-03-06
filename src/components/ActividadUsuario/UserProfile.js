import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { setAreas } from '../../dataSlice';
import { setEspecies } from '../../dataSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import ListaAreasUsuario from './ListaAreasUsuario/ListaAreasUsuario';
import ListaEspeciesUsuario from './ListaEspeciesUsuario/ListaEspeciesUsuario';

const UserProfileModal = ({ closeModal }) => {

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [arrayAreasNaturalesUser, setArrayAreasNaturalesUser] = useState([]);
    const [arrayEspeciesUser, setArrayEspeciesUser] = useState([]);

    const cargarAreasUser = async () => {

        const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/byUser?userId=${user.id}&page=1&pageSize=100`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
            }
        );

        const data = await response.json();
        //console.log("data user", data.items);
        setArrayAreasNaturalesUser(data.items);

    }

    const cargarEspeciesUser = async () => {

        const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/byUser?userId=${user.id}&page=1&pageSize=100`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
            }
        );

        const data = await response.json();
        setArrayEspeciesUser(data.items);

    };

    useEffect(() => {

        cargarAreasUser();
        cargarEspeciesUser();

    }, []);

    const borrarAreaUsuario = async (areaId) => {

        const response = await fetch(
            `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!`, //`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/${areaId}?secret=TallerReact2025!`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "naturalAreaId": areaId,
                })
            }
        );

        if (!response.ok) {
            // Si explota mostramos mensaje de error
            console.error("Error al eliminar área", response.status);
            return;
        }

        await cargarAreasUser(); // Cuando el delete es exitoso, recargamos la lista en el modal del usuario
        //recargarAreasGlobal(); // Cuando el delete es exitoso, recargamos la lista en la home page

        // También recarga la lista global de áreas y la mete al store
        const respAll = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000'
        );
        const dataAll = await respAll.json();
        dispatch(setAreas(dataAll.items));

    };

    const borrarEspecieUsuario = async (especieId) => {
        //console.log("llama a funcion borrar especie usuario", especieId);
        const response = await fetch(
            `https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "speciesId": especieId,
                })
            }
        );

        if (!response.ok) {
            // Si explota mostramos mensaje de error
            console.error("Error al eliminar la especie", response.status);
            return;
        }

        await cargarEspeciesUser(); // Cuando el delete es exitoso, recargamos la lista en el modal del usuario

        // También recarga la lista global de especies y la mete al store
        const respAll = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000'
        );
        const dataAll = await respAll.json();
        dispatch(setEspecies(dataAll.items)); // Actualizo la lista global de especies en Redux.

        await cargarAreasUser(); // Cuando borro una Especie tambien recargo la lista de areas ya que una especie está asociada a un area
        // Volvemos a cargar las areas para no mostrar la especie borrada
        const respAreas = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000'
        );
        const dataAreas = await respAreas.json();

        // Despachamos al store
        dispatch(setAreas(dataAreas.items)); // actualizas la lista global de areas en Redux.

    };

    const editarAreaUsuario = async (area) => {

        const response = await fetch(
            `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "naturalArea": {
                        "id": area.id,
                        "name": area.name,
                        "location": area.location,
                        "areaType": area.areaType,
                        "region": area.region,
                        "conservationStatus": area.conservationStatus,
                        "description": area.description,
                        "imageUrl": area.imageUrl,
                    }
                })
            }
        );

        if (!response.ok) {
            // Si explota mostramos mensaje de error
            console.error("Error al editar el área", response.status);
            return {success: false};
        }

        await cargarAreasUser(); // Cuando el update es exitoso, recargamos la lista en el modal del usuario
        //recargarAreasGlobal(); // Cuando el delete es exitoso, recargamos la lista en la home page

        // También recarga la lista global de áreas y la mete al store
        const respAll = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000'
        );
        const dataAll = await respAll.json();
        dispatch(setAreas(dataAll.items));

        return {success: true};

    };

    const editarEspecieUsuario = async (especieEditada) => {
        console.log("especie editada recibida en metodo editar", especieEditada)

        const response = await fetch(
            `https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({
                    "userId": user.id,
                    "species": especieEditada,
                })
            }
        );

        if (!response.ok) {
            // Si explota mostramos mensaje de error
            console.error("Error al editar la especie", response.status);
            return {success: false};
        }

        await cargarAreasUser(); // Cuando el update es exitoso, recargamos la lista en el modal del usuario
        //recargarAreasGlobal(); // Cuando el delete es exitoso, recargamos la lista en la home page
        await cargarEspeciesUser();

        // También recarga la lista global de áreas y la mete al store
        const respAll = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000'
        );
        const dataAll = await respAll.json();
        dispatch(setAreas(dataAll.items));


        // También recarga la lista global de especies y la mete al store
        const respAllEspecie = await fetch(
            'https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000'
        );
        const dataAllEspecie = await respAllEspecie.json();
        dispatch(setEspecies(dataAllEspecie.items)); // Actualizo la lista global de especies en Redux.
        
        return { success: true };

    };

    return (
        <>
            <div className="overlay-user-profile d-flex align-items-center justify-content-center">
                <div className="area-natural-user bg-white rounded shadow-lg p-4 w-75 w-md-100 position-relative">
                    {/* Botón para cerrar */}
                    <button className="btn-close position-absolute top-0 end-0 m-3" onClick={closeModal}></button>

                    {/* Lista de Áreas Naturales */}
                    {arrayAreasNaturalesUser.length > 0 ? (
                        <ListaAreasUsuario arrayAreasNaturales={arrayAreasNaturalesUser} borrarAreaUsuario={borrarAreaUsuario} editarAreaUsuario={editarAreaUsuario} />
                    ) : (
                        <p className="text-center text-muted">No hay áreas naturales agregadas por este usuario</p>
                    )}

                    {/* Lista de Especies */}
                    {arrayEspeciesUser.length > 0 ? (
                        <ListaEspeciesUsuario arrayEspeciesUser={arrayEspeciesUser} arrayAreasNaturales={arrayAreasNaturalesUser} borrarEspecieUsuario={borrarEspecieUsuario} editarEspecieUsuario={editarEspecieUsuario}/>
                    ) : (
                        <p className="text-center text-muted">No hay especies agregadas por este usuario</p>
                    )}
                </div>
            </div>
        </>
    );

}

export default UserProfileModal;