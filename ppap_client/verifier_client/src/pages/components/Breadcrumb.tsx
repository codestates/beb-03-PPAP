import React from "react";

const Breadcrumb = ({pageName}:any) => {
  return (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="{/}">Home</a>
        </li>
        <li className="breadcrumb-item active">{pageName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
