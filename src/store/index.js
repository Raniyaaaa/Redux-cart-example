import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import cartSlice from './cart-slice';
import "../../node_modules/react-bootstrap/dist/react-bootstrap"
import "../../node_modules/bootstrap/dist/css/bootstrap.css"

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
