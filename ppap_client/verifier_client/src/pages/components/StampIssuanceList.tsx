import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setStamp } from "../../redux/stampReducer";

const StampIssuanceList = ({linkPath}:any) => {

    const dispatch = useDispatch();

    //리듀스에 저장되어있는 userInfo가지고오기
    const userInfo = useSelector((state:any) => state.userReducer).data;
    //const passportData = useSelector((state:any) => state.passportReducer).data;
    const [stampist, setStampList] = useState([]);
  
    useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_ADMIN_URL+"/admin/getStamp?entOrdep=0",{
        headers: {
          authorization: userInfo.jwtToken
      }
      }).then((payload) => {
          setStampList(payload.data.output);
          dispatch(setStamp(payload.data.output));
          console.log(payload.data.output);
      });
    }, []);

  return (
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-14">
          <div className="row">
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
                  <h5 className="card-title">
                    Stamp issuance list <span>| Today</span>
                  </h5>

                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Stamp</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Country Code</th>
                        <th scope="col">Stamp Issuance Date</th>
                        <th scope="col">Immigration</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {stampist.map((data:any,index:any)=>{
                      return (
                        <tr>
                          <td scope="row">
                            <Link
                              to={linkPath + "detail/" + data.stamp_id}
                              className="font-bold"
                            >
                              #{data.stamp_id}
                            </Link>
                          </td>
                          <td scope="row">
                            <a href="#">
                              <img src={`${data.stamp_uri}`} alt="" />
                            </a>
                          </td>

                          <td>
                            <a href="#" className="text-primary">
                              {data.user_name}
                            </a>
                          </td>
                          <td>{data.country_code}</td>
                          <td>{data.creation_date}</td>
                          <td>
                            {data.ent_or_dep === "ent"
                              ? "Entrance"
                              : "Departure"}
                          </td>
                          <td>
                            <span className="badge bg-success w-4/4">
                              Approved
                            </span>
                          </td>
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

export default StampIssuanceList;
