import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className='admin'>
        <p className='admin-heading'>Welcome to admin panel</p>
        <div className="button">
            <Link  style={{ textDecoration: 'none' }} to='/createemp'><p>Create an employee</p></Link>
        </div>
        <div className="button">
        <Link  style={{ textDecoration: 'none' }} to='/emplist'> <p>Employee list</p></Link>
        </div>
    </div>
  )
}

export default Admin