import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:9292/owners")
      .then((response) => response.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:9292/estates")
      .then((response) => response.json())
      .then((data) => setEstates(data))
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

  return (
    <div className="blogs-container">
      <h1 className="blogs-heading">Blogs</h1>
      {blogs.map((blog) => (
        <div className="blog-item" key={blog.id}>
          <h2 className="blog-author">Author: {blog.owner_id}</h2>
          <h3 className="blog-estate">Estate: {blog.house_id}</h3>
          <p className="blog-ratings">Ratings: {blog.ratings}</p>
          <p className="blog-comments">Comments: {blog.comments}</p>
          <div className="blog-likes">
            <button onClick={() => handleLike(blog.id)}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <span>{blog.likes} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";

// function Blogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [estates, setEstates] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:9292/blogs")
//       .then((response) => response.json())
//       .then((data) => setBlogs(data))
//       .catch((error) => console.error(error));

//     fetch("http://localhost:9292/owners")
//       .then((response) => response.json())
//       .then((data) => setOwners(data))
//       .catch((error) => console.error(error));

//     fetch("http://localhost:9292/estates")
//       .then((response) => response.json())
//       .then((data) => setEstates(data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleLike = (blogId) => {
//     // Find the blog in the current state
//     const blogToUpdate = blogs.find((blog) => blog.id === blogId);

//     // Increment the likes in the frontend immediately
//     const updatedBlogs = blogs.map((blog) => {
//       if (blog.id === blogId) {
//         return {
//           ...blog,
//           likes: blog.likes + 1,
//         };
//       }
//       return blog;
//     });
//     setBlogs(updatedBlogs);

//     // Make a PUT request to the backend API to update the likes of the blog
//     fetch(`http://localhost:9292/blogs/${blogId}/like`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         likes: blogToUpdate.likes + 1,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Update the blogs state with the updated likes from the backend
//         const updatedBlogs = blogs.map((blog) => {
//           if (blog.id === blogId) {
//             return {
//               ...blog,
//               likes: data.likes,
//             };
//           }
//           return blog;
//         });
//         setBlogs(updatedBlogs);
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="blogs-container">
//       <h1 className="blogs-heading">Blogs</h1>
//       {blogs.map((blog) => (
//         <div className="blog-item" key={blog.id}>
//           <h2 className="blog-author">Author: {blog.owner_id}</h2>
//           <h3 className="blog-estate">Estate: {blog.house_id}</h3>
//           <p className="blog-ratings">Ratings: {blog.ratings}</p>
//           <p className="blog-comments">Comments: {blog.comments}</p>
//           <div className="blog-likes">
//             <button onClick={() => handleLike(blog.id)}>
//               <FontAwesomeIcon icon={faHeart} />
//             </button>
//             <span>{blog.likes} Likes</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Blogs;
