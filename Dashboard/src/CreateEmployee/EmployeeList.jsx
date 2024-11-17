import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const rowsPerPage = 3; //y 3 rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/api/emp/fetchEmp`
        );
        setEmployees(response.data.employees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees. Please try again later.");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/api/emp/delEmployee/${employeeId}`
      );
      alert(response.data.message);
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      alert("Error deleting employee");
      console.error(error);
    }
  };

  const formatDate = (mongoDBDate) => {
    const date = new Date(mongoDBDate);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = date.getDate().toString().padStart(2, '0'); // two digits
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const clearSorting = () => {
    setSortConfig(null);
  };

  const sortedEmployees = useMemo(() => {
    if (!sortConfig) return employees;

    return [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [employees, sortConfig]);

  // Search Filter Logic
  const filteredEmployees = useMemo(() => {
    return sortedEmployees.filter((employee) => {
      const lowercasedQuery = searchQuery.toLowerCase();
      return (
        employee.id.toLowerCase().includes(lowercasedQuery) ||
        employee.name.toLowerCase().includes(lowercasedQuery) ||
        employee.email.toLowerCase().includes(lowercasedQuery) ||
        formatDate(employee.createDate).toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [sortedEmployees, searchQuery]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="emp-list">
      <div className="emp-heading">Employee List</div>
      <div className="toolbar">
        <div className="clear-sorting">
          <button onClick={clearSorting} className="clear-sorting-btn">
            Clear Sorting
          </button>
        </div>

        <p>Total Count: {filteredEmployees.length}</p>
        <Link style={{ textDecoration: "none" }} to="/createemp">
          <p>Create Employee</p>
        </Link>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by ID, Name, Email, or Date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="emp-table">
        <thead>
          <tr>
            <th>
              Unique ID{" "}
              <button onClick={() => handleSort("id")}>
                {sortConfig?.key === "id" && sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"}
              </button>
            </th>
            <th>Image</th>
            <th>
              Name{" "}
              <button onClick={() => handleSort("name")}>
                {sortConfig?.key === "name" &&
                sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"}
              </button>
            </th>
            <th>
              Email{" "}
              <button onClick={() => handleSort("email")}>
                {sortConfig?.key === "email" &&
                sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"}
              </button>
            </th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.id}</td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/${employee.image}`}
                  height="100px"
                  width="100px"
                  alt="employee"
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{formatDate(employee.createDate)}</td>
              <td>
                <button
                  className="search-btn"
                  onClick={() =>
                    navigate("/createemp", { state: { employee } })
                  }
                >
                  Update
                </button>
                <button
                  className="search-btn"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default EmployeeList;
