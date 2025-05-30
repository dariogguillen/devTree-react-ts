import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterCredential } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

const RegisterView = () => {
  const initialValues: RegisterCredential = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterCredential>({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterCredential) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data.response);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create An Account</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
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
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label htmlFor="lastName" className="text-2xl text-slate-500">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Your last name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 12,
                message: "Password must have at least 12 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-1">
          <label
            htmlFor="passwordConfirmation"
            className="text-2xl text-slate-500"
          >
            Password confirmation
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Repeat password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("passwordConfirmation", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
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
