import React, { useState } from "react";
import Navbar from "./Navbar";

function Form() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    tags: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for submitting the form data
    console.log(formData);
    // Reset form fields
    setFormData({
      title: "",
      author: "",
      content: "",
      tags: "",
      imageUrl: "",
    });
  };

  return (
    <>
      <h1 className="logo">
        <span>Real Estate</span>Blogs.
      </h1>
      <Navbar />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Feel free to add blog</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-name"
              required
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Tags:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
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
