
export default function SignIn() {

  return (
    <div className="bg-dark h-full w-full z-0 p-4">
      <section className="sign-in-content  size-fit m-auto bg-white z-10 p-0">
        <i className="fa fa-user-circle sign-in-icon " style={{fontSize: '1rem'}}></i>
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form className="flex flex-col gap-1 bg-white">
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="username">Username</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label className="cursor-pointer" htmlFor="password">Password</label>
            <input className="w-full border-2 border-gray-300 rounded-md p-2" type="password" id="password" />
          </div>
          <div className="input-remember">
            <input className="cursor-pointer" type="checkbox" id="remember-me" />
            <label className="cursor-pointer" htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button cursor-pointer underline">Sign In</button>
        </form>
      </section>
    </div>
  );
};