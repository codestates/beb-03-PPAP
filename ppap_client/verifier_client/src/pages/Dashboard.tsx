import "./Dashboard.css";
import Breadcrumb from "./components/Breadcrumb";
import PassportIssuranceList from './components/PassportIssuanceList'
import VisaIssuanceList from './components/VisaIssuanceList'
import StampIssuanceList from './components/StampIssuanceList'

function Dashboard() {
  const pageName = 'Dashboard';
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <Breadcrumb pageName={pageName}/>
      </div>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <PassportIssuranceList linkPath="passport/"/>
              <VisaIssuanceList linkPath="visa/"/>
              <StampIssuanceList linkPath="stamp/"/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
