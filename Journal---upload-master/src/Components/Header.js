import React from "react";
import "./Header.css";
import logo from "../Assets/logo.svg";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <img src={logo}></img>
        <h1>
          <span style={{ color: "blue" }}>International</span> Journal of{" "}
          <span style={{ color: "blue" }}>English for </span>
          Academic <span style={{ color: "blue" }}>Excellence</span>
        </h1>
      </div>
    </>
  );
};

export default Header;
