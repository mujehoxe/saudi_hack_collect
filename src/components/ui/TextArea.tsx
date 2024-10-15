import { TextareaHTMLAttributes, forwardRef } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const TextArea = forwardRef((props: IProps, ref: any) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={`px-6 py-5 outline-none rounded-3xl text-black w-full ${props.className}`}
    />
  );
});
export default TextArea;
