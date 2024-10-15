interface IProps {
  message?: string;
}
const InputErrorMessage = ({ message }: IProps) => {
  return message ? (
    <span className="text-red-500 ms-4 block text-lg font-semibold">
      {message}
    </span>
  ) : null;
};
export default InputErrorMessage;
