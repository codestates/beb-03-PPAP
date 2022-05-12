import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import { useEffect } from "react";
import VisaIssuranceList from './components/VisaIssuanceList'
const Visa = () => {
  const pageName = 'Visa application list';
  useEffect(() => {
  }, []);

  return (
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Visa</h1>
      <Breadcrumb pageName={pageName}/>
    </div>

    <VisaIssuranceList linkPath={""}/>
   
  </main>
  );
};

export default Visa;
