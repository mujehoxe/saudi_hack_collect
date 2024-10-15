import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = forwardRef((props: IProps, ref: any) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`px-5 py-4 
      text-base md:text-lg
      placeholder:text-base md:placeholder:text-lg
       outline-none rounded-full text-black w-full ${props.className}`}
    />
  );
});
export default Input;
