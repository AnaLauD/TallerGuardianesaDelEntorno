import './ListaEspeciesUsuario.css';
import Especie from '../../Especie/Especie';
import EspecieUsuario from '../EspecieUsuario/EspecieUsuario';

const ListaEspeciesUsuario = ({ arrayEspeciesUser, borrarEspecieUsuario, arrayAreasNaturales, editarEspecieUsuario }) => {        
    
    return (
        <div className='areas-especies-container container mb-5' id='listado-especies'>
            <h1 className='text-center mt-5'>Lista Especies</h1>            
            
            {  
                arrayEspeciesUser.map(especie => {   
                    const areaEncontrada = arrayAreasNaturales.find((area) => area.id === especie.naturalAreaId);    
                    
                    //arrayAreasNaturales aca tengo que recorrer el array de areas y pasar un area que coincida con esa 

                    return (
                        <EspecieUsuario key={especie.id} 
                        especie={especie} 
                        borrarEspecieUsuario={borrarEspecieUsuario} 
                        editarEspecieUsuario={editarEspecieUsuario} 
                        area={areaEncontrada} 
                        arrayAreasNaturales={arrayAreasNaturales} />
                    )
                })               
            }
        </div>
    )
}

export default ListaEspeciesUsuario;