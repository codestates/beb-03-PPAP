import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setVisa } from "../../redux/visaReducer";

const VisaIssuanceList = ({linkPath}:any) => {

    const dispatch = useDispatch();

    //리듀스에 저장되어있는 userInfo가지고오기
    const userInfo = useSelector((state:any) => state.userReducer).data;
    //const passportData = useSelector((state:any) => state.passportReducer).data;
    const [visaList, setVisaList] = useState([]);
  
    useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_ADMIN_URL+"/admin/visaRequests",{
        headers: {
          authorization: userInfo.jwtToken
      }
      }).then((payload) => {
          setVisaList(payload.data.visaRequests);
          dispatch(setVisa(payload.data.visaRequests));
          console.log(payload.data.visaRequests);
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
                Visa issuance list <span>| Today</span>
                </h5>

                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Country Code</th>
                      <th scope="col">Visa Name</th>
                      <th scope="col">Visa Purpose</th>
                      <th scope="col">Name</th>
                      <th scope="col">Visa Application Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {visaList&&visaList.map((data:any,index:any)=>{
                      return (
                        <tr>
                          <th scope="row">
                            <Link to={linkPath + `detail/${data.visa_survey_id}`}>#{data.visa_survey_id}</Link>
                          </th>
                          <td>{data.country_code}</td>
                          <td>{data.visa_name}</td>
                          <td>{data.visa_purpose}</td>
                          <td>{data.user_name}</td>
                          <td>{data.creation_date}</td>
                          {data.visa_success_yn==='1'?<td><span className="badge bg-success">Approved</span></td>  : ( data.visa_success_yn==='0'?  <td><span className="badge bg-warning">Pending</span></td>:  <td><span className="badge bg-danger">Rejected</span></td>)}
                        </tr>
                      );
                  })}
                  </tbody>
                </table>
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
