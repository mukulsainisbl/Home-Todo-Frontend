import { useState } from "react";
import "../pages/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    secondName: "",
    role: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    const { value, name } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, signUpData);
      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/todos");
      }
    } catch (error) {
      setError("Signup failed. Please check your details and try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>First Name :</label>
      <input
        value={signUpData.firstName}
        name="firstName"
        type="text"
        placeholder="Enter first name"
        onChange={handleSignUp}
      />

      <label>Second Name :</label>
      <input
        value={signUpData.secondName}
        name="secondName"
        type="text"
        placeholder="Enter second name"
        onChange={handleSignUp}
      />

      <label>Role :</label>
      <select value={signUpData.role} name="role" onChange={handleSignUp}>
        <option value="">Choose role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="reader">Reader</option>
      </select>

      <label>Email :</label>
      <input
        value={signUpData.email}
        name="email"
        type="email"
        placeholder="Enter email"
        onChange={handleSignUp}
      />

      <label>Password :</label>
      <input
        value={signUpData.password}
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={handleSignUp}
      />

      {error && <p className="error-message">{error}</p>}
      
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default Signup;
