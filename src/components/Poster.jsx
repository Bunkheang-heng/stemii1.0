import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Poster.css"; 

const Poster = () => {
  return (
    <div className="poster-card">
      <div className="poster-container">
        <h1>Unlock the curiosity of STEM</h1>
        <div>
          <p>Join Us now to enhance your coding Skill in today's world</p>
        </div>
        <div>
          <button className="bg-yellow-500 w-40 h-10 rounded-xl font-bold hover:bg-yellow-400">
            <Link to="https://web.telegram.org/" className="text-white" style={{ textDecoration: 'none' }}>Join us now</Link>
          </button>

          <button className="Learnmore">
            <Link to="/aboutus" className="text-black" style={{ textDecoration: 'none' }}>Learn more</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Poster;
