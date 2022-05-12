import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import PassportIssuranceList from './components/PassportIssuanceList'
const Passport = () => {
  const pageName = 'Passport application list';
  useEffect(() => {
  }, []);

  return (
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Passport</h1>
      <Breadcrumb pageName={pageName}/>
    </div>

    <PassportIssuranceList linkPath={""}/>
   
  </main>
  );
};

export default Passport;
