import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import StampIssuranceList from './components/StampIssuanceList'
const Stamp = () => {
  const pageName = 'Stamp issuance list';
  useEffect(() => {
  }, []);

  return (
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Stamp</h1>
      <Breadcrumb pageName={pageName}/>
    </div>

    <StampIssuranceList linkPath={""}/>
   
  </main>
  );
};

export default Stamp;
