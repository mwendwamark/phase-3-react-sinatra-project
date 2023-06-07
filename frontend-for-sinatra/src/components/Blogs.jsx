import React, { useState, useEffect } from "react";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faHeart ,faUser} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";


function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  }, []);

  const handleLike = (blogId) => {
    // Find the blog in the current state
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);

    // Increment the likes in the frontend immediately
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        return {
          ...blog,
          likes: blog.likes + 1,
        };
      }
      return blog;
    });
    setBlogs(updatedBlogs);

    // Make a PATCH request to the backend API to update the likes of the blog
    fetch(`http://localhost:9292/blogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: blogToUpdate.likes + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the blogs state with the updated likes from the backend
        const updatedBlogs = blogs.map((blog) => {
          if (blog.id === blogId) {
            return {
              ...blog,
              likes: data.likes,
            };
          }
          return blog;
        });
        setBlogs(updatedBlogs);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (blogId) => {
    // Confirm the deletion with an alert
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmDelete) {
      // Make a DELETE request to the backend API to delete the blog
      fetch(`http://localhost:9292/blogs/${blogId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // Remove the blog from the frontend state
          const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
          setBlogs(updatedBlogs);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <h1 className="logo"><span>Real Estste</span>Blog.</h1>
      <Navbar></Navbar>
      <h1 className="blogs-heading">Blogs</h1>
      <h3 className="blog-h3">Welcome to our Blog page</h3>
      <p className="paragraph-p"> View what others say:</p>
      <div className="blogs-container">
        
        {blogs.map((blog) => (
          <div className="blog-item" key={blog.id}>
            <p className="blog-author"><FontAwesomeIcon icon={faUser}/> <span>Author :</span> <em>{blog.owner_id}</em> </p>
            <p className="blog-estate"> <span>Estate:</span> <em>{blog.house_id}</em> </p>
            <p className="blog-ratings"> <span>Ratings out of 10:</span> <em>{blog.ratings}</em> </p>
            <p className="blog-comments"><span>Comments:</span> <em>{blog.comments}</em> </p>
            <div className="blog-likes">
              <button className="like-btn" onClick={() => handleLike(blog.id)}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <span>{blog.likes} Likes</span>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blogs;
