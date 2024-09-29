//import React from 'react'
import { Outlet } from 'react-router-dom';

function Users() {
  return (
    <div>
        <h1>Users List</h1>
        <Outlet/>
    </div>
  )
}

export default Users