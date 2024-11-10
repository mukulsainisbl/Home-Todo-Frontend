import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateTodo.css"; // Assuming you have some styles for your component

const CreateTodo = () => {
  const [createTodoData, setCreateTodoData] = useState({
    title: "",
    description: "",
  });
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To store specific error messages

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateTodoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false); // Reset error state before making the request
    setErrorMessage(""); // Reset the error message before each submission

    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      // Send POST request to the backend to create a todo with the token in the Authorization header
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/create-todo`,
        createTodoData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      
      if (res.status === 201) {
        // Reset form data after successful creation
        setCreateTodoData({
          title: "",
          description: "",
        });
        
        // Redirect to the todo list page after successful creation
        navigate("/todos");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message || "Error creating todo. Please try again.");
      console.error("Error creating todo:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="create-todo-container">
      <h2>Create a New Todo</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={createTodoData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={createTodoData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Todo"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default CreateTodo;
