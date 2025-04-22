import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => {
  const token = Cookies.get("access_token");
  return !!token;
};

const PrivateRoute = ({ element }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
