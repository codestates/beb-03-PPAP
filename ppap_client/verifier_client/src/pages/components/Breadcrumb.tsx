import React from "react";

const Breadcrumb = () => {
  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="index.html">Home</a>
        </li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
