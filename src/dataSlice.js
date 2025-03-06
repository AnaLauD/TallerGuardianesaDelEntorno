import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    arrayAreasNaturales: [],
    arrayEspecies: []
  };
  
  const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setAreas(state, action) {
        state.arrayAreasNaturales = action.payload;
      },
      setEspecies(state, action) {
        state.arrayEspecies = action.payload;
      }
    }
  });
  
  export const { setAreas, setEspecies } = dataSlice.actions;
  export default dataSlice.reducer; 