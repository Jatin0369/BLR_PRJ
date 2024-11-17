import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Admin from "./Admin/Admin";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import EmployeeList from "./CreateEmployee/EmployeeList";
import Navbar from "./Navbar/Navbar";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  {" "}
                  <Admin />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/createemp"
              element={
                <PrivateRoute>
                  <CreateEmployee />
                </PrivateRoute>
              }
            />
            <Route
              path="/emplist"
              element={
                <PrivateRoute>
                  <EmployeeList />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
