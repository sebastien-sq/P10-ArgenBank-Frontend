import {  NavLink} from "react-router"

export default function Nav() {
    const userIsLoggedIn = false;
return (
    userIsLoggedIn ?  (
      <nav className="main-nav w-full h-[5vh]">
      <NavLink to="/" className="main-nav-logo" >
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink to="/user" className="main-nav-item" >
          <i className="fa fa-user-circle"></i>
          Tony
        </NavLink>
        <NavLink to="/" className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
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
        <NavLink to="/sign-in" className="main-nav-item flex gap-1 items-center">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>  
      </div>
    </nav>
    )
)
}