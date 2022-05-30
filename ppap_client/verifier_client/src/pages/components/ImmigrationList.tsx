import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setImmigration } from '../../redux/immigrationReducer';


const ImmigrationList = ({linkPath}:any) => {
 
  const dispatch = useDispatch();

  //리듀스에 저장되어있는 userInfo가지고오기
  const userInfo = useSelector((state:any) => state.userReducer).data;
  //const passportData = useSelector((state:any) => state.passportReducer).data;
  const [immigrationList, setImmigrationList] = useState([]);

  useEffect(() => {
    console.log("AAAA");
    axios.get(process.env.REACT_APP_SERVER_ADMIN_URL+"/admin/getVp",{
      headers: {
        authorization: userInfo.jwtToken
    }
    }).then((payload) => {
      setImmigrationList(payload.data.data);
      dispatch(setImmigration(payload.data.data));
        console.log(payload.data.data);
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
                Immigration Application list <span>| Today</span>
                </h5>

                <table className="table table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Country Code</th>
                      <th scope="col">DID</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   {immigrationList&&immigrationList.map((data:any,index:any)=>{
                      return (
                        <tr>
                          <th scope="row">
                            <Link to={linkPath + "detail/"+data.immigration_id}>#{data.immigration_id}</Link>
                          </th>
                          <td>{data.country_code}</td>
                          <td>{data.did}
                          </td>
                           <td><span className="badge bg-warning w-4/4">Pending</span></td>
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

export default ImmigrationList;
