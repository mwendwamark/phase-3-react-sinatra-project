import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Form() {
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    email: "",
    ratings: "",
    comments: "",
    imageUrl: "",
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
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
    fetch("http://localhost:9292/blogs", {
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
          imageUrl: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1 className="logo">
        <span>Real Estate</span> Blog.
      </h1>
      <Navbar />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Feel free to add a blog</h2>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Rating:</label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Comments:</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </form>
      </div>
    </>
  );
}

export default Form;
