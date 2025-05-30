import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <>
      <div>Register</div>
      <nav>
        <Link to="/auth/login">Login</Link>
      </nav>
    </>
  );
};

export default RegisterView;
