import  { useDispatch } from "react-redux";
import {  useState } from "react";
import {  signUpUser } from "~/slices/authSlice.js";
import { isValidEmail, isValidPassword, isValidFirstName, isValidLastName } from "~/utils/formValidation";
import { useNavigate } from "react-router";


export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    if(!isValidFirstName(firstName) ) {
      setError("First name must be at least 3 characters long and contains only letters.");
      return;
    }
    if(!isValidLastName(lastName) ) {
      setError("Last name must be at least 3 characters long and contains only letters.");
      return;
    }
    

    //FIXME : type any ! 
    dispatch(signUpUser({ firstName, lastName, email, password }) as any )
      .unwrap()
      .then(() => {
        navigate("/user");
      }
      )
      .catch((err: Error) => {
        setError(err.message || "Failed to sign up");
      });
  };

  return (
    <div className="bg-dark h-full w-full z-0 p-4">
      <section className="sign-up-content  size-fit m-auto bg-white z-10 p-0">
        <i className="fa fa-user-circle sign-up-icon " style={{fontSize: '1rem'}}></i>
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form className="flex flex-col gap-1 bg-white" onSubmit={handleFormSubmit}>
                      <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="firstName">First Name</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" id="firstName" onChange={(e)=>{setFirstName(e.target.value)}} />
          </div>
                    <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="lastName">Last Name</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" id="lastName" onChange={(e)=>{setLastName(e.target.value)}} />
          </div>
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="email">Email</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="password">Password</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
     
          <button className="sign-up-button cursor-pointer underline" type="submit" >Sign Up</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>
    </div>
  );
};