// TopBar.js
import React from "react";

const TopBar = () => {
  const topBarStyle = {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    display: 'none' // Default to hidden
  };

  const ulStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around'
  };

  const aStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px'
  };

  return (
    <div style={topBarStyle} className="top-bar">
      <nav>
        <ul style={ulStyle}>
          <li><a href="#home" style={aStyle}>Home</a></li>
          <li><a href="#about" style={aStyle}>About</a></li>
          <li><a href="#services" style={aStyle}>Services</a></li>
          <li><a href="#contact" style={aStyle}>Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
