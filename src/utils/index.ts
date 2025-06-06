export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const isValidUr = (url: string) => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
  return regex.test(url);
};
