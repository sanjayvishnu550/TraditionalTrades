import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import getUrl from "../api";
import axios from "axios";
import { useEffect, useState } from "react";
import QrCodeGenerator from "./QrCodeGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";  
import ChatComponent from "./ChatComponent";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
     const sellerId=sessionStorage.getItem('sellerId');
    const info = {
      
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    console.log(info)

    try {
      const response = await customFetch.post(
        "https://strapi-store-server.onrender.com/api/orders",
        { data: info},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
       const data=await axios.patch(
         `http://localhost:3200/api/seller/currentUser/6634686a9ffcbd2f03c970d8`,
         { payment:false}
       );
      const order = {
        customer: name,
        sellerId:sellerId,
        product:cartItems[0].title,
        totalCost: formatPrice(orderTotal),
      };
      await axios.post(`${getUrl()}orders`,order)
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = ({payment}) => {

  const [modal,setModal]=useState();
  const handleModal=()=>{
      setModal(!modal)
  }
   useEffect(()=>{
     if(payment==true)
      {
         setValid(true)
      }
   },[payment])
  const [valid,setValid]=useState(false);
  const [qrCode,setQrCode]=useState(false);
  
  const handleValue=()=>{
          setValid(!valid)
          setQrCode(!qrCode)
  }
  return (
    <>
      <Form method="POST" className="flex flex-col gap-y-4">
        <h4 className="font-medium text-xl capitalize">shipping information</h4>
        <FormInput label="first name" name="name" type="text" />
        <FormInput label="address" name="address" type="text" />
        <div className="mt-4">
          {valid && (
            <button
              className="bg-sky-500 w-full text-white p-2 rounded-md"
              type="submit"
            >
              place your order
            </button>
          )}
          {!valid && (
            <button
              className="bg-sky-500 w-full text-white p-2 rounded-md"
              type="button"
              onClick={() => setQrCode(!qrCode)}
            >
              Pay now
            </button>
          )}
        </div>
        {qrCode && !valid && (
          <QrCodeGenerator handleValue={handleValue}></QrCodeGenerator>
        )}
      </Form>
      <div className="absolute right-20 bottom-0 flex">
        <div className="relative w-10">
          <FontAwesomeIcon
            onClick={handleModal}
            className="w-10 h-10 text-sky-400"
            icon={faCommentDots}
          />{" "}
        </div>
        <div>
          <sup className="">ask Seller</sup>
        </div>
      </div>
      {modal && <ChatComponent handleModal={handleModal}></ChatComponent>}
    </>
  );
};
export default CheckoutForm;
