

import React, { useState, useEffect } from "react";
import "./CreateEmployee.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CreateEmployee() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const employeeToEdit = location.state ? location.state.employee : null;

  const [name, setName] = useState(employeeToEdit?.name || "");
  const [email, setEmail] = useState(employeeToEdit?.email || "");
  const [mobile, setMobile] = useState(employeeToEdit?.mobile || "");
  const [designation, setDesignation] = useState(employeeToEdit?.designation || "");
  const [gender, setGender] = useState(employeeToEdit?.gender || "");
  const [course, setCourse] = useState(employeeToEdit?.course || "");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCheckboxChange = (value) => {
    setCourse(value === course ? "" : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    if (image) {
      formData.append("image", image);
    }

    try {
      let response;
      if (employeeToEdit) {
     
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/api/emp/updateEmp/${employeeToEdit._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
     
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/api/emp/newEmp`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      alert(response.data.message);
      if(employeeToEdit){
        navigate("/employeelist");
      }
      else{
      setName("");
      setEmail("");
      setMobile("");
      setDesignation("");
      setGender("");
      setCourse("");
      setImage(null);
  
    
      const fileInput = document.querySelector("input[type='file']");
      if (fileInput) {
        fileInput.value = ""; // Reset file input
      }
      }
    } catch (error) {
      if (error.response) {
       
        alert(error.response.data.error)
      } else {
        alert({ message: "Server Error" });
      }
      console.error(error);
    }
  };

  return (
    <div className="employee">
      <p className="heading">{employeeToEdit ? "Edit Employee" : "Create Employee"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile No </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Designation </label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender </label>
          <label htmlFor="m">Male</label>
          <input
            type="radio"
            id="m"
            name="gender"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
            value="male"
          />
          <label htmlFor="f">Female</label>
          <input
            type="radio"
            id="f"
            name="gender"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
            value="female"
          />
        </div>
        <div className="form-group">
          <label>Course </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={course === "BCA"}
              onChange={() => handleCheckboxChange("BCA")}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={course === "MCA"}
              onChange={() => handleCheckboxChange("MCA")}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={course === "BSC"}
              onChange={() => handleCheckboxChange("BSC")}
            />
            BSC
          </label>
        </div>
        <div className="form-group">
          <label>Image Upload </label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="form-group-btn">
          <button type="submit" className="submit-btn">
            {employeeToEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployee;
