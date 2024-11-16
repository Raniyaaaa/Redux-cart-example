import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const fetchCartData =()=>{
  return async (dispatch)=>{
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching...',
        message: 'Fetching cart data!',
      })
    )

    const fetchRequest= async()=>{
      const response =await fetch('https://react-cart-example-default-rtdb.firebaseio.com/cart.json');
      if(!response.ok){
        throw new Error('Failed to fetch cart data!');
      }
      const data = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      )
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetched cart data successfully!',
        })
      )
    }

    try {
      await fetchRequest();
    }catch(error){
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  }
}

export const sendCartData = (cart ) => {
  return async (dispatch) => {
    dispatch(
    uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    })
  );
  
  const sendRequest =async() =>{
  const response=await fetch('https://react-cart-example-default-rtdb.firebaseio.com/cart.json',
    {
    method:'PUT',
    body: JSON.stringify(cart)
    })
    if(!response.ok){
      throw new Error("Sending cart data failed!")
      }
    }

    try{
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      )
    }catch (error){
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Senting cart data failed!',
        })
      )
    } 
  }
}
export const cartActions = cartSlice.actions;

export default cartSlice;
