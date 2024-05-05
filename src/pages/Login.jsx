import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import getUrl from "../api";
import axios from "axios";
import { useEffect } from "react";
 
export const action =
  (store) =>
  async ({ request }) => {
  
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data)
    
     
    try {
      if(data.role=='admin')
      {
           if(data.identifier=='admin@gmail.com' && data.password=='admin123')
           {
              console.log(getUrl())
              const data = await axios.patch(
                `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`,{currentUser:'admin'}
              );
              console.log(data)
              return redirect("http://localhost:5174/admin/main");
           }
           else{
               throw Error;
           }
          
         
        }
      else if (data.role == "seller") {
        const res=await axios.post(`${getUrl()}seller/verify`,data);
        console.log(res.data);
        if(res.data.error)
          {
             toast.error("double check your credentials");
             return redirect("/login");
          }
        else if(res.data.sellerId!='')
        {
               const data = await axios.patch(
                 `${getUrl()}seller/currentUser/6634686a9ffcbd2f03c970d8`,
                 { currentUser: "seller" ,sellerId:res.data.sellerId}
               );
             return redirect("http://localhost:5174");
        }
        else
        {
           throw Error;
        }

     }
     else{
      const response = await customFetch.post(
        "https://strapi-store-server.onrender.com/api/auth/local",
        { identifier: data.identifier, password:data.password }
      );
      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
       }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "if you not a admin please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  }


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   useEffect(()=>{
     //  localStorage.removeItem("role"); 
   })
  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error. please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="form-control">
          <select className={`input input-bordered ${2}`} name="role" required>
            <option value="admin">Login By</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
             
          </select>
        </div>

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
