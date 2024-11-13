import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Todos.css";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    setError(false); // Reset error before each fetch attempt
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}todo/`, {
        headers: {
          Authorization: localStorage.getItem("token"), // Add the token from localStorage
        },
      });
      setTodos(res.data.todos);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/todo/delete/${todoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token from localStorage
            },
          }
        );

        if (res.status === 200) {
          // Remove the deleted todo from the state
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== todoId)
          );
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todos-container">
      <button
        className="create-todo-button"
        onClick={() => navigate("/create-todo")}
      >
        Create Todo
      </button>
      <h2>Todo List</h2>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: "red" }}>Failed to fetch todos. Please try again.</p>
      )}

      <ul className="todos-list">
        {todos.length > 0
          ? todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div id="info">
                  <p>Date: {formatDate(todo.createdAt)}</p>{" "}
                  <p>Created by: {todo.userName}</p>
                </div>

                <button
                  onClick={() => handleDelete(todo._id)}
                  className="delete-todo-button"
                >
                  Delete
                </button>
              </li>
            ))
          : !loading && <p>No todos found.</p>}
      </ul>
    </div>
  );
};

export default Todos;
