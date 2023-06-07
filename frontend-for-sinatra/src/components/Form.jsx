import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Form() {
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    email: "",
    ratings: "",
    comments: "",
    image_url: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:9292/owners")
      .then((response) => response.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9292/owners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs([...blogs, data]);
        setFormData({
          description: "",
          name: "",
          email: "",
          ratings: "",
          comments: "",
          image_url: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleReset = () => {
    setFormData({
      description: "",
      name: "",
      email: "",
      ratings: "",
      comments: "",
      image_url: "",
    });
  };

  return (
    <>
      <h1 className="logo">
        <span>Real Estate</span> Blog.
      </h1>
      <Navbar />

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-container-input">
          <h2 className="heading-2">Login</h2>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>
            Clear
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
