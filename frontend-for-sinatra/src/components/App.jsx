import React from "react";
import { BrowserRouter  ,Routes, Route } from "react-router-dom";

import Home from "./Home";
import Form from "./Form";
import Navbar from "./Navbar";

function App() {
  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
