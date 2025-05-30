import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create An Account</h1>
      <form
        onSubmit={() => {}}
        className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="lastname" className="text-2xl text-slate-500">
            Lastname
          </label>
          <input
            id="lastname"
            type="text"
            placeholder="Your lastname"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email to register"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="username" className="text-2xl text-slate-500">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username without spaces"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password to register"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repeat Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repeat password to register"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          />
        </div>
        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>
      <nav className="mt-10">
        <Link className="text-center text-white text-lg block" to="/auth/login">
          Already have an account? Login
        </Link>
      </nav>
    </>
  );
};

export default RegisterView;
