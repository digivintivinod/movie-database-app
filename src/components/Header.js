import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header1">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header_icon"
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
          />
        </Link>
        <Link to="/">
          <span>Popular</span>
        </Link>
        <Link to="/">
          <span>Top Rated</span>
        </Link>
        <Link to="/">
          <span>Upcoming</span>
        </Link>
        <Link to="/geners">
          <span>Genres</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
