import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import { useEffect } from 'react';

function App() {
  const dispatch=useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  useEffect(() =>{
    const sendCartData=async()=>{
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
    try{
      const response=await fetch('https://react-cart-example-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body: JSON.stringify(cart)
      })
      if(!response.ok){
        throw new Error('Failed to send cart data!');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    }catch(error){
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
  }
  sendCartData();
  },[cart,dispatch])

  const message = notification && (
    <Alert
      variant={
        notification.status === 'error'
          ? 'danger'
          : notification.status === 'pending'
          ? 'info'
          : 'success'
      }
      style={{ padding: '10px', borderRadius: '5px', marginBottom: '10px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>{notification.title}</h4>
        <p style={{ margin: 0 }}>{notification.message}</p>
      </div>
    </Alert>
  );
  
  return (
    <>
      <Layout message={message}>
        <div></div>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
