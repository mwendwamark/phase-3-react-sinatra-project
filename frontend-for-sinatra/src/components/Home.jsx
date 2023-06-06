import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";

function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/estates")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data);
      });
  }, []);

  function handleAdd(houseId, commentInput) {
    // Add your logic here for handling the button click and sending the comment to the backend
    const commentData = {
      houseId: houseId,
      comment: commentInput,
    };

    // Make an API call to send the comment data to the backend
    fetch("http://localhost:9292/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error:", error);
      });
  }

  return (
    <div className="container">
      <h1 className="logo">
        <span>Real</span> Estate Blog
      </h1>
      <Navbar />

      <div className="house-list">
        {houses.map((house) => (
          <div key={house.id} className="house-item">
            <img src={house.image_url} alt="House" />
            <div className="house-buttons">
              <input
                type="text"
                value={house.commentInput || ""}
                onChange={(e) =>
                  setHouses((prevHouses) =>
                    prevHouses.map((prevHouse) =>
                      prevHouse.id === house.id
                        ? { ...prevHouse, commentInput: e.target.value }
                        : prevHouse
                    )
                  )
                }
                placeholder="Enter your comment"
              />
              <button
                className="btn-comment"
                onClick={() => handleAdd(house.id, house.commentInput)}
              >
                Add Comment
              </button>
              <button className="btn-details">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
