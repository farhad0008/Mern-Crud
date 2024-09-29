// import { useState } from 'react'
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Users from "./component/Users";
import User from "./component/User";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="users" element={<Users />}>
          <Route path="new" element={<User />}></Route>
          <Route path=":id" element={<User />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
