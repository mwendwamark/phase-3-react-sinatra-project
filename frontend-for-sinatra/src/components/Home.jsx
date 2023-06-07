import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState({
    image_url: "",
    description: "",
    location: "",
    rent: 0,
  });

  useEffect(() => {
    fetch("http://localhost:9292/estates")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data);
      });
  }, []);

  const handleAddComment = (houseId, commentInput) => {
    const commentData = {
      houseId: houseId,
      comment: commentInput,
    };

    fetch("http://localhost:9292/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the backend if needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any error that occurred during the API call
      });
  };

  const [showComments, setShowComments] = useState({});

  const handleShowComments = (houseId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [houseId]: !prevShowComments[houseId],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewHouse((prevNewHouse) => ({
      ...prevNewHouse,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send a POST request to the backend with the new house data
    fetch("http://localhost:9292/estates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHouse),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the backend if needed
        // Refresh the list of houses
        fetch("http://localhost:9292/estates")
          .then((response) => response.json())
          .then((data) => {
            setHouses(data);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any error that occurred during the API call
      });
  };

  return (
    <div className="container">
      <h1 className="logo">
        <span>Real Estate</span> Blogs.
        <img
          className="real-estate-icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjFJREFUaEPtmD1LXEEUhp/F2Ads1MLGYKGNZf6AwQ8QjAoSRSwS/RPp/QsqFiIiCmIs/AJra6sIop2ghZj8gCCGs6ywjHP3zOy5s+vKvc3Cnjtn3ud9Z3bu3hItfpVaXD8FQLMTtCbQCawDn4GOnGEegXPgO/CQ1dsCIOIvAPlMed0Cg8Af3yQWgC1gNqXyqt5rwFLeAHdAV4MAJIWevAGenYaWNH3agvpbJg2awJBQUP8CoMphixlvcglpS8BaL0NbXLMKsI4vAKwOWscnT8DwC1oeqgEWAEEOGWII6l/vr9AIcOyIGwVODILdockAxoBfQLsz4z9AameBEJpArV7XHhCBB8CHDJECMQEcBUBoArV6NMAksBcgTG75Wkmp1u2aQK0eBSCu7nvUfKl8J45XL6knYFqB0ARq9WCAGUD+fbVVAbjrfaiybFyIOWAnMLUkm1jEbzvPTFmb1QchLn6rE8KcwDywESj+xb0siAVgMzIJE8APYDVSfN4QdQPImwZZ8+4lh9dpoIvDGYeaLMndSg9NoFbP3MR/gY8eobGntitAWt4D3akBboDeAADNIR/ANdCXGmAcWPG883ETiAUQ9xeBw9QAL+bHCowF1LaTNr96kGkNrPWmA+QioEYTzSBzAgWA4kCRQJAD1jVsHV/rdH13ANqmTV33mh2TQGqBWv9ogN9Av9a1QfVLYMA3V60EpoBl4FODRGZNcwX8zHqhEPuI3GSW19MXAM2OpOUT+A8Aw5UxaFSuOAAAAABJRU5ErkJggg=="
          alt="Real Estate Icon"
        />
      </h1>
      <Navbar className="home-nav-bar" />

      <p className="home-page-overview">
        Welcome to the Real Estate Blog! Browse through the available houses
        below and leave your comments.
      </p>

      <div className="house-list">
        {houses.map((house) => (
          <div key={house.id} className="house-item">
            <img src={house.image_url} alt="House" />
            <div className="house-info">
              <h2>{house.title}</h2>
              <p className="information-p">
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:{" "}
                </span>
                {house.location}
              </p>
              <p className="information-p">
                <span>Rent p/m:</span> <em>${house.rent}</em>
              </p>
              <p className="information-p">
                <span>Description: </span> {house.description}
              </p>
              {/* <button
                onClick={() => handleShowComments(house.id)}
                className="show-comments-button"
              >
                {showComments[house.id] ? "Hide Comments" : "Show Comments"}
              </button> */}
              {showComments[house.id] && (
                <div className="comments-section">
                  {house.comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                  ))}
                  <div className="add-comment-section">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="comment-input"
                    />
                    <button
                      onClick={() =>
                        handleAddComment(house.id, "Sample Comment")
                      }
                      className="add-comment-button"
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="add-house-form">
        <h2>Add a New House</h2>
        <div className="form-group">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={newHouse.image_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newHouse.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newHouse.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rent">Rent p/m:</label>
          <input
            type="number"
            id="rent"
            name="rent"
            value={newHouse.rent}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="add-house-button">
          Add House
        </button>
      </form>

      <p>Explore the Real Estate Blog and find your dream home today!</p>
    </div>
  );
}

export default Home;
