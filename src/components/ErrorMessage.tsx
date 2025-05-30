type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="bg-red-50 text-red-600 p-1 text-sm">{children}</p>;
};

export default ErrorMessage;
