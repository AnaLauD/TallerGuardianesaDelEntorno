
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { useSelector } from "react-redux";
import ListaAreas from './components/ListaAreasNaturales/ListaAreas';
import ListaEspecies from './components/ListaEspecies/ListaEspecies';
import { useDispatch } from 'react-redux';
import { setAreas, setEspecies } from './dataSlice';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { arrayAreasNaturales, arrayEspecies } = useSelector(state => state.data);
 
  useEffect(() => {

    const cargarAreas = async () => {

      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&Keyword=&AreaType=&Region=&ConservationStatus=&Page=1&PageSize=1000',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
  
      const data = await response.json();
      dispatch(setAreas(data.items));
      //setArrayAreasNaturales(data.items);
  
    }
  
    const cargarEspecies = async () => {
  
      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=50',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
  
      const data = await response.json();
      dispatch(setEspecies(data.items));
      //setArrayEspecies(data.items);
    };
  

    cargarAreas();
    cargarEspecies();

  }, [dispatch]);


  return (
    <>
      <Navbar />
      <ListaAreas arrayAreasNaturales={arrayAreasNaturales} arrayEspecies={arrayEspecies} />
      <ListaEspecies arrayEspecies={arrayEspecies} arrayAreasNaturales={arrayAreasNaturales} />     

      {/* {
        user && showUserProfileModal && (
          <UserProfileModal recargarAreasGlobal={cargarAreas} closeModal={() => setShowUserProfileModal(false)} />  //*Le paso al componente la funcion que carga las areas, asi, una vez eliminado/modificado vuelvo a llamar la funcion y recarga la lista actualizada *
        )
      } */}

    </>

  );
}

export default App;

