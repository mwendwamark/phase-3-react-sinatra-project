import React from "react";
import Navbar from "./Navbar";

function Form() {
  return (
  <>
  <Navbar/>
  <h1 className="logo"><span>Real</span>  Estate</h1>
  <div className="form-container">
    <form>
        <h2>Feel free to add blog</h2>
        <input type="text" className="input-name"/>

    </form>
  </div>
  </>
  );
}

export default Form;
