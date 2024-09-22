// import React, { useState } from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [getData, setGetData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(()=>{
    console.log("response return data",getData)
  },[getData])
  function onChange(e) {
    let val = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: val });
  }

  async function handlSubmit(e) {
    e.preventDefault();
    
    setFormData({
      name: "",
      email: "",
    });
    try {
       await axios.post(
        "http://localhost:3000/users",
        formData
      );
      setGetData([...getData,formData])
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchData() {
    try {
      const responseGet = await axios.get("http://localhost:3000/users");
      console.log(responseGet.data);
      setGetData(responseGet.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  },[]);
  return (
    <>
    <center>
      <div>
        <form onSubmit={handlSubmit}>
          <table>
            <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Enter Name.."
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="Enter Email.."
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input type="submit" value="Submit" />
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
      </center>

      <table border={1}>
        <thead>
            <tr>
                <th>Name:</th>
                <th>Email:</th>
            </tr>
        </thead>
        <tbody>
            {
            getData.map((val)=>(
                <tr key={val._id}>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                </tr>
            ))          
}
        </tbody>
      </table>
    </>
  );
}

export default Home;
