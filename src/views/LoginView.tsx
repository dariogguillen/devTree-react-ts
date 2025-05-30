import { Link } from "react-router-dom";

const LoginView = () => {
  return (
    <>
      <div>Login</div>
      <nav>
        <Link to="/auth/register">Register</Link>
      </nav>
    </>
  );
};

export default LoginView;
