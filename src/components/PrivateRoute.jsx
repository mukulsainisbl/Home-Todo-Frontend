import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../Context/ContextProvider";

const PrivateRoute = ({ children }) => {
  
  const { authDetail } = useContext(Auth);
 

  return authDetail.token != null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
