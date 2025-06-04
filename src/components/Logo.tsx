import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-white text-4xl font-bold">
      <img src="/logo.svg" alt="Logo DevTree" className="w-full block" />
    </Link>
  );
};

export default Logo;
