import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { faMapMarkerAlt, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewHouse((prevNewHouse) => ({
      ...prevNewHouse,
      [name]: value,
    }));
  };

  const handleAddHouse = () => {
    const confirmed = window.confirm("Are you sure you want to add the image?");
    if (!confirmed) {
      return; // Cancel adding the image
    }

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
        setNewHouse({
          image_url: "",
          description: "",
          location: "",
          rent: 0,
        });
        setHouses((prevHouses) => [...prevHouses, data]);
        window.alert("Image added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="logo">
        <span>Real Estate</span> Blogs.
        {/* <FontAwsomeIcon icon={faHomeAlt} /> */}
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

              {/* Rest of the code */}
            </div>
          </div>
        ))}
      </div>

      <div className="add-house-form">
        <h2 className="">Feel free to add a house</h2>

        <form>
          <label htmlFor="image_url">Image URL:</label>
          <input
            className="input-house-field"
            type="text"
            id="image_url"
            name="image_url"
            value={newHouse.image_url}
            onChange={handleInputChange}
            required
            placeholder="https://estate_image-url.example"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            className="input-description-field"
            type="text"
            id="description"
            name="description"
            value={newHouse.description}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            className="input-location-field"
            type="text"
            id="location"
            name="location"
            value={newHouse.location}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="rent">Rent p/m:</label>
          <input
            className="input-rent-field"
            type="text"
            id="rent"
            name="rent"
            value={newHouse.rent}
            onChange={handleInputChange}
            required
          />

          <button
            type="button"
            className="add-house-button"
            onClick={handleAddHouse}
          >
            Add House
          </button>
        </form>
      </div>

      <p className="explore-blog-text">
        Explore the Real Estate Blog and find your dream home today!
      </p>
    </div>
  );
}

export default Home;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Navbar from "./Navbar";
// import { faMapMarkerAlt, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function Home() {
//   const [houses, setHouses] = useState([]);
//   const [newHouse, setNewHouse] = useState({
//     image_url: "",
//     description: "",
//     location: "",
//     rent: 0,
//   });

//   useEffect(() => {
//     fetch("http://localhost:9292/estates")
//       .then((response) => response.json())
//       .then((data) => {
//         setHouses(data);
//       });
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewHouse((prevNewHouse) => ({
//       ...prevNewHouse,
//       [name]: value,
//     }));
//   };

//   const handleAddHouse = () => {
//     // Send a POST request to the backend with the new house data
//     fetch("http://localhost:9292/estates", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newHouse),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setHouses((prevHouses) => [...prevHouses, data]);
//         setNewHouse({
//           image_url: "",
//           description: "",
//           location: "",
//           rent: 0,
//         });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div className="container">
//       <h1 className="logo">
//         <span>Real Estate</span> Blogs.
//         {/* <FontAwsomeIcon icon={faHomeAlt} /> */}
//       </h1>
//       <Navbar className="home-nav-bar" />

//       <p className="home-page-overview">
//         Welcome to the Real Estate Blog! Browse through the available houses
//         below and leave your comments.
//       </p>

//       <div className="house-list">
//         {houses.map((house) => (
//           <div key={house.id} className="house-item">
//             <img src={house.image_url} alt="House" />
//             <div className="house-info">
//               <h2>{house.title}</h2>
//               <p className="information-p">
//                 <span>
//                   <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:{" "}
//                 </span>
//                 {house.location}
//               </p>
//               <p className="information-p">
//                 <span>Rent p/m:</span> <em>${house.rent}</em>
//               </p>
//               <p className="information-p">
//                 <span>Description: </span> {house.description}
//               </p>

//               {/* Rest of the code */}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="add-house-form">
//         <h2 className="">Feel free to add a house</h2>

//         <form>
//           <label htmlFor="image_url">Image URL:</label>
//           <input
//             className="input-house-field"
//             type="text"
//             id="image_url"
//             name="image_url"
//             value={newHouse.image_url}
//             onChange={handleInputChange}
//             required
//             placeholder="https://estate_image-url.example"
//           />

//           <label htmlFor="description">Description:</label>
//           <textarea
//             className="input-description-field"
//             type="text"
//             id="description"
//             name="description"
//             value={newHouse.description}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="location">Location:</label>
//           <input
//             className="input-location-field"
//             type="text"
//             id="location"
//             name="location"
//             value={newHouse.location}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="rent">Rent p/m:</label>
//           <input
//             className="input-rent-field"
//             type="text"
//             id="rent"
//             name="rent"
//             value={newHouse.rent}
//             onChange={handleInputChange}
//             required
//           />{newHouse.image_url && (
//         <div className="house-item">
//           <img src={newHouse.image_url} alt="New House" />
//           <div className="house-info">
//             <h2>New House</h2>
//             <p className="information-p">
//               <span>
//                 <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:{" "}
//               </span>
//               {newHouse.location}
//             </p>
//             <p className="information-p">
//               <span>Rent p/m:</span> <em>${newHouse.rent}</em>
//             </p>
//             <p className="information-p">
//               <span>Description: </span> {newHouse.description}
//             </p>
//           </div>
//         </div>
//       )}

//           <button
//             type="button"
//             className="add-house-button"
//             onClick={handleAddHouse}
//           >
//             Add House
//           </button>
//         </form>
//       </div>

//       <p className="explore-blog-text">
//         Explore the Real Estate Blog and find your dream home today!
//       </p>
//     </div>
//   );
// }

// export default Home;
