import { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Context/ContextProvider";

const Login = () => {
  const { Login } = useContext(Auth);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new attempt

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        loginData
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/todos");
      }
      Login(res.data.token);
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>Email:</label>
      <input
        value={loginData.email}
        name="email"
        type="email"
        placeholder="Enter Email"
        onChange={handleLoginChange}
      />

      <label>Password:</label>
      <input
        value={loginData.password}
        name="password"
        type="password"
        placeholder="Enter Password"
        onChange={handleLoginChange}
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
};

export default Login;
