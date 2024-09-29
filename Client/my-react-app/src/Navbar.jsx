import {Link, Outlet} from 'react-router-dom' 

function Navbar() {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='Home'>Form</Link>
        <Link to='users'>User List</Link>
        <Outlet/>
    </div>
  )
}

export default Navbar