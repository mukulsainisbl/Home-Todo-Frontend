import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Context/ContextProvider";
const Navbar = () => {
  const { authDetail, Logout } = useContext(Auth);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "HOME" },
    { to: "/todos", label: "TODOS" },
    // Only show "SIGN UP" if not authenticated
    ...(authDetail.token ? [] : [{ to: "/signup", label: "SIGN UP" }]),
  ];

  function handleLogout() {
    Logout();
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "skyblue",
        fontFamily: "cursive",
        padding: "15px",
      }}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{ textDecoration: "none", color: "red", fontSize: "25px" }}
        >
          {link.label}
        </Link>
      ))}

      {authDetail.token ? (
        <button onClick={handleLogout} style={{ fontSize: "20px", cursor: "pointer" , borderRadius:"10px" ,borderColor:"none", backgroundColor:"pink" }}>
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} style={{ fontSize: "20px", cursor: "pointer", borderRadius:"10px" ,borderColor:"none", backgroundColor:"greenyellow"}}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
