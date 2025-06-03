import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileFrom, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";

const ProfileView = () => {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFrom>({
    defaultValues: { username: data.username, description: data.description },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) toast.success(data.response);
      // refresh user query after success updateProfile
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      //optimistic update
      queryClient.setQueryData(["user"], (oldUser: User) => {
        if (data)
          return {
            ...oldUser,
            image: data.image,
          };
      });
    },
  });

  const handleUserProfileForm = (formData: ProfileFrom) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.username = formData.username;
    updateProfileMutation.mutate(user);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Edit information
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Nombre de Usuario"
          {...register("username", {
            required: "This field is required",
          })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your description"
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="username">Imagen:</label>
        <input
          id="image"
          type="file"
          name="username"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save changes"
      />
    </form>
  );
};

export default ProfileView;
