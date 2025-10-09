/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import "./navigationBar.css";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav-bar">
        <div className="logo">ZETA</div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/" className="nav-Link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-Link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-Link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-Link">
              Blog
            </Link>
          </li>
        </ul>
        <div className="search-box">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-bar"
          />
          <FaSearch className="search-icon" />
        </div>
        {/* <button type='submit'></button> */}

        <div className="icon-container">
          <Link className="nav-link-icon" to="/wishlist">
            <FaRegHeart />
          </Link>
          <Link className="nav-link-icon" to="/cart">
            <FaShoppingCart />
          </Link>
          <Link className="nav-link-icon" to="/signup">
            <FaUser />
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;
