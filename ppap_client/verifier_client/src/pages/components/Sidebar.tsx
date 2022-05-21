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

        <li className="nav-heading">LIST</li>
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
                <span>Passport issuance list</span>
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
                <span>Visa issuance list</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="sidebar-nav" id="sidebar-nav3">
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav3"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Immigration stamp</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav3"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link className="nav-link " to="/stamp">
                <i className="bi bi-circle"></i>
                <span>Immigration stamp list</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="sidebar-nav" id="sidebar-nav3">
        <li className="nav-heading">VERIFICATION</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav4"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem"></i>
            <span>Immigration Control</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav4"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link className="nav-link " to="/immigration">
                <i className="bi bi-circle"></i>
                <span>Immigraion</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
