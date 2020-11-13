import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/person/new" exact>
          CREATE PERSON
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
