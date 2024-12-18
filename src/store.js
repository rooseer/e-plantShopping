import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Usas el reducer del slice

const store = configureStore({
    reducer: {
        cart: cartReducer, // Asocia el reducer del slice
    },
});

export default store;
