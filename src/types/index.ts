export type User = {
  name: string;
  lastName: string;
  username: string;
  email: string;
};

export type RegisterCredential = Pick<
  User,
  "name" | "lastName" | "username" | "email"
> & {
  password: string;
  passwordConfirmation: string;
};
