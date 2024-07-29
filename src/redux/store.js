import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import alertsReducer from './features/alertsSlice';
import personnelReducer from './features/personnelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertsReducer,
    personnel: personnelReducer,
  },
});

export default store;
