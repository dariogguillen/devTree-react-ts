export type User = {
  _id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  description: string;
  image: string;
};

export type RegisterCredential = Pick<
  User,
  "name" | "lastName" | "username" | "email"
> & {
  password: string;
  passwordConfirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type ProfileFrom = Pick<User, "username" | "description">;
