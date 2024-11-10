import { useContext } from "react";
import { AuthContext } from "../Context/authContextProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authDetail } = useContext(AuthContext);
 

  return authDetail.token != null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
