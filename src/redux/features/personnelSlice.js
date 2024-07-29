import { createSlice } from '@reduxjs/toolkit';

const personnelSlice = createSlice({
  name: 'personnel',
  initialState: [],
  reducers: {
    addPersonnel: (state, action) => {
      state.push(action.payload);
    },
    removePersonnel: (state, action) => {
      return state.filter(person => person.id !== action.payload);
    },
    updatePersonnel: (state, action) => {
      return state.map(person =>
        person.id === action.payload.id ? { ...person, ...action.payload.data } : person
      );
    },
  },
});

export const { addPersonnel, removePersonnel, updatePersonnel } = personnelSlice.actions;
export default personnelSlice.reducer;
