export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const isValidUr = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
