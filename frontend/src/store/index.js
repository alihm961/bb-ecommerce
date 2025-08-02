import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import cartReducer from './slices/cartSlice';
// import productsReducer from './slices/productsSlice';
// import ordersReducer from './slices/ordersSlice';
// import notificationsReducer from './slices/notificationsSlice';
// import jobsReducer from './slices/jobsSlice';

const store = configureStore({
reducer: {
    auth: authReducer,
},
/* This part of the code is configuring the middleware for the Redux store. In Redux, middleware
provides a way to interact with actions that are dispatched to the store before they reach the
reducers. */
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
    }),
devTools: import.meta.env.MODE !== 'production',
});

export default store;
