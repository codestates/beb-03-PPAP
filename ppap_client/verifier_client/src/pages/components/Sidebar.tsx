import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-heading">Issuer</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Passport</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link className="nav-link " to="/passport">
                <i className="bi bi-circle"></i>
                <span>Passport Application list</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="sidebar-nav" id="sidebar-nav2">
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav2"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Visa</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav2"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link className="nav-link" to="/visa">
                <i className="bi bi-circle"></i>
                <span>Visa Application List</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="sidebar-nav" id="sidebar-nav3">
        <li className="nav-heading">Verifier</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav3"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Immigration Inspection</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav3"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link className="nav-link " to="/passport">
                <i className="bi bi-circle"></i>
                <span>Immigration</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link " to="/passport">
                <i className="bi bi-circle"></i>
                <span>Inspection</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
