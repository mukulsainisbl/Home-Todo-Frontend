import { Route, Routes } from "react-router-dom";
import Todos from "../pages/Todos";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CreateTodo from "../pages/CreateTodo";
import PrivateRoute from "./PrivateRoute";

const Allroutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-todo" element={<CreateTodo />} />
    </Routes>
  );
};

export default Allroutes;
