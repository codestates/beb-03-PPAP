import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPassport } from "../../redux/passportReducer";


const PassportIssuanceList = ({linkPath}:any) => {

  const dispatch = useDispatch();

  //리듀스에 저장되어있는 userInfo가지고오기
  const userInfo = useSelector((state:any) => state.userReducer).data;
  //const passportData = useSelector((state:any) => state.passportReducer).data;
  const [passportList, setPassportList] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_ADMIN_URL+"/admin/passportRequests",{
      headers: {
        authorization: userInfo.jwtToken.data
    }
    }).then((payload) => {
        setPassportList(payload.data.passportRequests);
        dispatch(setPassport(payload.data.passportRequests));
        console.log(payload.data.passportRequests);
    });
  }, []);

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
                List of applications for passport issuance <span>| Today</span>
                </h5>

                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Country Code</th>
                      <th scope="col">Name</th>
                      <th scope="col">Issuance Application Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   {passportList.map((data:any,index:any)=>{
                      return (
                        <tr>
                          <th scope="row">
                            <Link to={linkPath + "detail/"+data.passport_id}>#{data.passport_id}</Link>
                          </th>
                          <td>{data.countryCode}</td>
                          <td>
                            <a href="#" className="text-primary">
                              {data.name}
                            </a>
                          </td>
                          <td>{data.creation_date}</td>
                          {data.successyn==='1'? 
                            <td><span className="badge bg-success">Approved</span></td> 
                            :
                            <td><span className="badge bg-warning">Pending</span></td>
                            // <span className="badge bg-danger">Rejected</span>
                          }
                        </tr>
                      );
                   })}
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

export default PassportIssuanceList;
