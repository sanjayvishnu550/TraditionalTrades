import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components';
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import axios from 'axios';
export const loader = (store) => async() => {
  const user = store.getState().userState.user;
    const data = await axios.get(
      `http://localhost:3200/api/seller/currentUser/6634686a9ffcbd2f03c970d8`);
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }
  return data.data[0].payment;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  const payment=useLoaderData()
  console.log(payment)
  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
  return (
    <>
      <SectionTitle text='place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <CheckoutForm payment={payment} />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
