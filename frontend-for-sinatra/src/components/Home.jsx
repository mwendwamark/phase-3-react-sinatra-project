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
    fetch("http://localhost:9292/blogs", {
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
        <span>Real Estate</span> Blogs.
        <img className="real-estate-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjFJREFUaEPtmD1LXEEUhp/F2Ads1MLGYKGNZf6AwQ8QjAoSRSwS/RPp/QsqFiIiCmIs/AJra6sIop2ghZj8gCCGs6ywjHP3zOy5s+vKvc3Cnjtn3ud9Z3bu3hItfpVaXD8FQLMTtCbQCawDn4GOnGEegXPgO/CQ1dsCIOIvAPlMed0Cg8Af3yQWgC1gNqXyqt5rwFLeAHdAV4MAJIWevAGenYaWNH3agvpbJg2awJBQUP8CoMphixlvcglpS8BaL0NbXLMKsI4vAKwOWscnT8DwC1oeqgEWAEEOGWII6l/vr9AIcOyIGwVODILdockAxoBfQLsz4z9AameBEJpArV7XHhCBB8CHDJECMQEcBUBoArV6NMAksBcgTG75Wkmp1u2aQK0eBSCu7nvUfKl8J45XL6knYFqB0ARq9WCAGUD+fbVVAbjrfaiybFyIOWAnMLUkm1jEbzvPTFmb1QchLn6rE8KcwDywESj+xb0siAVgMzIJE8APYDVSfN4QdQPImwZZ8+4lh9dpoIvDGYeaLMndSg9NoFbP3MR/gY8eobGntitAWt4D3akBboDeAADNIR/ANdCXGmAcWPG883ETiAUQ9xeBw9QAL+bHCowF1LaTNr96kGkNrPWmA+QioEYTzSBzAgWA4kCRQJAD1jVsHV/rdH13ANqmTV33mh2TQGqBWv9ogN9Av9a1QfVLYMA3V60EpoBl4FODRGZNcwX8zHqhEPuI3GSW19MXAM2OpOUT+A8Aw5UxaFSuOAAAAABJRU5ErkJggg=="/>
      </h1>
      <Navbar className="home-nav-bar" />

      <p>
        Welcome to the Real Estate Blog! Browse through the available houses
        below and leave your comments.
      </p>

      <div className="house-list">
        {houses.map((house) => (
          <div key={house.id} className="house-item">
            <img src={house.image_url} alt="House" />
            <div className="house-info">
              <h2>{house.title}</h2>
              <p>Location: {house.location}</p>
              <p>Rent p/m: ${house.rent}</p>
              <p>Description: {house.description}</p>
            </div>
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
                Comment
              </button>
              
            </div>
          </div>
        ))}
      </div>

      <p>Explore the Real Estate Blog and find your dream home today!</p>
    </div>
  );
}

export default Home;
