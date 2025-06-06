export type User = {
  _id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  description: string;
  image: string;
  links: string;
};

export type UserResponse = Pick<
  User,
  "name" | "lastName" | "username" | "description" | "image" | "links"
>;

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

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
  order: number;
};

export type DevTreeLink = Pick<
  SocialNetwork,
  "name" | "url" | "enabled" | "order"
>;
