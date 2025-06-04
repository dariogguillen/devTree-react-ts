import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { toast } from "sonner";
import { searchUsername } from "../api/DevTreeAPI";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { username: "" } });
  const username = watch("username");

  const mutation = useMutation({
    mutationFn: searchUsername,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) toast.success(data.response);
    },
  });

  const handleSearchUsername = () => {
    const slug = slugify(username);
    mutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearchUsername)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("username", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.username && (
        <ErrorMessage>{errors.username.message}</ErrorMessage>
      )}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Loading...</p>}
        {mutation.error && (
          <p className="text-center text-red-600 font-bold">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-cyan-500 font-bold">
            {mutation.data.response} go to{" "}
            <Link to="/auth/register" state={{ username: slugify(username) }}>
              Register
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi DevTree"
      />
    </form>
  );
};

export default SearchForm;
