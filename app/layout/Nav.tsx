import {  useDispatch} from "react-redux";
import { NavLink } from "react-router";
import {  authSlice } from "~/slices/authSlice";
import { useNavigate } from "react-router";
import { useAuthenticated } from "~/hooks/useAuthenticated";


export default function Nav() {
  const dispatch = useDispatch(); 
  const Navigate = useNavigate();
  const isAuthenticated = useAuthenticated();
 

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(authSlice.actions.logout());
    Navigate("/") ;
  }
  // const userName = useSelector((state: any) => state.auth.user?.firstName);
  const userName = "Seb"; // Temporary hardcoded username
  return isAuthenticated ? (
    <nav className="main-nav w-full h-[5vh]">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink to="/user" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          {userName}
        </NavLink>
        <button className="main-nav-item font-bold cursor-pointer" onClick={handleLogout}>
          <i className="fa fa-sign-out"></i>
          Sign Out
        </button>
      </div>
    </nav>
  ) : (
    <nav className="main-nav w-full h-[5vh]">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink
          to="/sign-in"
          className="main-nav-item flex gap-1 items-center"
        >
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}
