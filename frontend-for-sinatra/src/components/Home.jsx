import { useState, useEffect } from "react";
import "./App.css";

function Home() {
  const [houses, setHouses] = useState([]);
  useEffect(function () {
    fetch("http://localhost:9292/estates")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data);
      });
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="logo">Real Estate Blog</h1>
        <ul>
          {houses.map((house) => (
            <li key={house.id}>
              <img src={house.image_url} alt="House" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
