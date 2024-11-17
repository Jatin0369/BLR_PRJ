import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const username = Cookies.get("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("username");
    navigate("/"); // Redirect to login page
  };
  return (
    username ? (
    <div className='navbar'>
        <div className="one-cont">
        <Link  style={{ textDecoration: 'none' }} to='/admin'> <p>Home</p></Link>
        <Link  style={{ textDecoration: 'none' }} to='/emplist'><p>Employee list</p></Link>
        </div>
        <div className="two-cont">
            <p>{username}</p>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>
    ):null
  )
}

export default Navbar