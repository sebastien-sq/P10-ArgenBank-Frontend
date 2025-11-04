import {  useState } from "react";
import { useLoginUserMutation, useSignUpUserMutation } from "~/services/authApi";
import { isValidEmail, isValidPassword, isValidFirstName, isValidLastName } from "~/utils/validateForm";
import { useNavigate } from "react-router";


export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [signUpUser] = useSignUpUserMutation();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate(); 
  

  const handleFormSubmit = async (event: React.FormEvent) => {
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
    
    try {
      // Ici l'api ne renvoie pas directement le token, mais l'ID et l'email
      await signUpUser({ firstName, lastName, email, password }).unwrap();
      
      // Se connecter pour obtenir le token d'authentification
      await loginUser({ email, password, rememberMe: true }).unwrap();
      
      // Naviguer vers la page utilisateur (le token est maintenant stocké)
      navigate("/user");
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || "Sign up failed";
      setError(errorMessage + ". Please check your credentials and try again.");
    }
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