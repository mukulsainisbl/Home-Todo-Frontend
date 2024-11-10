import { createContext, useState } from "react";

// Create a context for authentication
export const Auth = createContext();

const ContextProvider = ({ children }) => {
  const [authDetail, setAuthDetail] = useState({
    isLoggedIn: false,
    token: null,
  });

  // Login function to set auth details
  const Login = (token) => {
    setAuthDetail({
      isLoggedIn: true,
      token: token,
    });
  };

  // Logout function to reset auth details
  const Logout = () => {
    setAuthDetail({
      isLoggedIn: false,
      token: null,
    });
  };

  return (
    // Provide the context to children components
    <Auth.Provider value={{ authDetail, Login, Logout }}>
      {children}
    </Auth.Provider>
  );
};

export default ContextProvider;
