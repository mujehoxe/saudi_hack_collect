import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}
const Button = ({
  className,
  children,
  isLoading = false,
  ...rest
}: IProps) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={cn(
        " flex items-center w-fit px-8 py-3 rounded-full ",
        " text-white font-medium text-base md:text-lg ",
        " bg-primary hover:bg-[#015595e8] duration-200",
        " focus:outline-white disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
