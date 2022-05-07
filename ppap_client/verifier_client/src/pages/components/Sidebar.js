import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-item">
          <Link class="nav-link " to="/">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-gem"></i>
            <span>Passport</span>
            <i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav"
            class="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="icons-bootstrap.html">
                <i class="bi bi-circle"></i>
                <span>Bootstrap Icons</span>
              </a>
            </li>
            <li>
              <a href="icons-remix.html">
                <i class="bi bi-circle"></i>
                <span>Remix Icons</span>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-heading">Pages</li>

        <li class="nav-item">
          <Link class="nav-link collapsed" to="/passport">
            <i class="bi bi-file-earmark"></i>
            <span>Passport</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
