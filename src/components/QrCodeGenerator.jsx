import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types

async function data (){
  const res = await axios.get(
    `http://localhost:3200/api/seller/currentUser/6634686a9ffcbd2f03c970d8`
  );

   return await res.data.payment;
}

 
const QrCodeGenerator = ({handleValue}) => {
  
  const [qrCode, setQrCode] = useState("");
useEffect(()=>{
 const generateQrCode = () => {
   setQrCode("payment paid");
 };
 generateQrCode();

},[])

 const handleClick=async()=>{
      const data = await axios.get(
        `http://localhost:3200/api/seller/currentUser/6634686a9ffcbd2f03c970d8`
      );
      
      if(data.data[0].payment==true)
        {
           toast.success("payment done");
            handleValue();
        }
    
 }
  return (
    <>
      <div className="fixed  inset-0 w-full h-full bg-white  flex items-center">
        <div style={{ position: "relative", left: "40%",backgroundColor:"white",textAlign: "center" }}>
          <h1 className="text-5xl">Pay now</h1>
          <br />
          {qrCode && <QRCode value={qrCode} />}
          <button
            type="button"
            className="mt-10 bg-sky-500 w-full text-white p-2 rounded-md"
            onClick={handleClick}   
          >
            click to refresh
          </button>
        </div>
      </div>
    </>
  );
};
export default QrCodeGenerator