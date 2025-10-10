import  { useDispatch } from "react-redux";
import {  useState } from "react";
import { loginUser } from "~/slices/authSlice.js";
import { isValidEmail, isValidPassword } from "~/utils/formValidation";
import { useNavigate } from "react-router";


export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); 

    if(!isValidEmail(email) ) {
      setError("Invalid email format");
      return;
    }
    if(!isValidPassword(password) ) {
      setError("Password must be at least 3 characters long, contain at least one letter and one number and must includes only letters and numbers.");
      return;
    }
    

    //FIXME : type any ! 
    dispatch(loginUser({ email, password, rememberMe }) as any )
      .unwrap()
      .then(() => {
        navigate("/user");
      }
      )
      .catch((err: Error) => {
        setError(err.message + ". Please check your credentials and try again.");
      });
  };

  return (
    <div className="bg-dark h-full w-full z-0 p-4">
      <section className="sign-in-content  size-fit m-auto bg-white z-10 p-0">
        <i className="fa fa-user-circle sign-in-icon " style={{fontSize: '1rem'}}></i>
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form className="flex flex-col gap-1 bg-white" onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="email">Email</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="password">Password</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div className="input-remember">
            <input className="cursor-pointer" type="checkbox" id="remember-me" checked={rememberMe} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}  />
            <label className="cursor-pointer" htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button cursor-pointer underline" type="submit" >Sign In</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>
    </div>
  );
};