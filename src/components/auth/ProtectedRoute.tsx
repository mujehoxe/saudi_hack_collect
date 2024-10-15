import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectTo: string;
  children: React.ReactNode;
}
const ProtectedRoute = ({ isAllowed, redirectTo, children }: IProps) => {
  if (!isAllowed) return <Navigate to={redirectTo} />;

  return children;
};
export default ProtectedRoute;
