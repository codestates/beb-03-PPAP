import React from "react";
import Breadcrumb from "./components/Breadcrumb";

const Passport = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Passport</h1>
        <Breadcrumb />
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="card info-card sales-card min-h-screen p-3">
            <p>글씨</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Passport;
