import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [getData, setGetData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [id, setId] = useState(null);

  function onChange(e) {
    let val = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: val });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) {
      await insert();
    } else {
      await update();
      setId(null)
    }
    fetchData();
    setFormData({
      name: "",
      email: "",
    });
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
  }, []);

  async function insert() {
    try {
      await axios.post("http://localhost:3000/users", formData);
    } catch (error) {
      console.error(error);
    }
  }

  async function update() {
    try {
      const responseDelete = await axios.put(
        `http://localhost:3000/users/${id}`,
        formData
      );
      console.log("Updated data:", responseDelete);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(id) {
    const responseDelete = await axios.delete(
      `http://localhost:3000/users/${id}`
    );
    console.log("Deleted data:", responseDelete);
    fetchData();
  }
  function editData(obj) {
    setFormData({ name: obj.name, email: obj.email });
    setId(obj._id);
  }

  return (
    <>
      <center>
        <div>
          <form onSubmit={handleSubmit}>
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
                    <input
                      type="submit"
                      value={!id ? "Insert" : "Update"}
                      id="insert"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <br/>

      <table border={1}>
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
            <th>Action:</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((val) => (
            <tr key={val._id}>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>
                <button onClick={() => deleteData(val._id)}>Delete</button>
                <button onClick={() => editData(val)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </>
  );
}
export default Home;
