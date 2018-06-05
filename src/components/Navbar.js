import React from 'react';
import './Components.css';

const Navbar = props =>

  <nav className="navbar m-0 text-center text-white">
    <div className="navbar-brand text-center ">Navbar</div>
    <form className="form-inline">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </nav>;

export default Navbar;
