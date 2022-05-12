import React from "react";
import { Link } from 'react-router-dom';
const VisaIssuanceList = ({linkPath}:any) => {
  return (
    <section className="section dashboard">
    <div className="row">
      <div className="col-lg-14">
        <div className="row">
          <div className="col-12">
            <div className="card recent-sales overflow-auto">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <h5 className="card-title">
                List of applications for visa issuance <span>| Today</span>
                </h5>

                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Country Code</th>
                      <th scope="col">Visa Name</th>
                      <th scope="col">Visa Porpose</th>
                      <th scope="col">Name</th>
                      <th scope="col">Visa Application Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Link to = {linkPath+"detail/1"}>#1</Link>
                      </th>
                      <td>KOR</td>
                      <td>2022 VISA</td>
                      <td>관광</td>
                      <td>김태희</td>
                      <td>2022-05-11 12:13:21</td>
                      <td>
                        <span className="badge bg-success">Approved</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Link to = {linkPath+"detail/2"}>#2</Link>
                      </th>
                      <td>KOR</td>
                      <td>2022 VISA</td>
                      <td>취업</td>
                      <td>김태희</td>
                      <td>2022-05-11 12:13:21</td>
                      <td>
                        <span className="badge bg-warning">Pending</span>
                      </td>
                    </tr>
                    <tr>
                    <th scope="row">
                        <Link to = {linkPath+"detail/3"}>#3</Link>
                      </th>
                      <td>KOR</td>
                      <td>2022 VISA</td>
                      <td>취업</td>
                      <td>김민수</td>
                      <td>2022-05-11 12:13:21</td>
                      <td>
                        <span className="badge bg-danger">Rejected</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body pb-0">
             

              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
  );
};

export default VisaIssuanceList;
