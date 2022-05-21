import React, { useState, useEffect} from 'react';
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const StampDetail = () => {
  //리듀스에 저장되어있는 userInfo가지고오기
  const userInfo = useSelector((state:any) => state.userReducer).data;

  const idParam:any = useParams().id;

  const stampData = useSelector((state:any) => state.stampReducer).data;
  const [stampDataInfo, setStampDataInfo]= useState(Object);
  const [modalData, setModalData] = useState("");
  const [successYn, setSuccessYn] = useState(-1);

  const pageName = 'Visa issuance details';
  useEffect(() => {
    stampData.filter((data:any)=>{
      if(data.stamp_id===parseInt(idParam)){
        setStampDataInfo(data);
        console.log(data);
      }
    })
  }, []);
const modalClick = (successYn:any) =>{
    const modal:any = document.getElementById("modal");
    modal.style.display='flex';
    if(successYn===1){
      setModalData('Approve');
      setSuccessYn(1);
      
    }else if(successYn===2){
      setModalData('Reject');
      setSuccessYn(2);
    }else{

    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Stamp</h1>
        <Breadcrumb pageName={pageName} />
      </div>

      <section className="section passport detail">
        <div className="container mx-auto my-5 p-5">
          <div className="pagetitle">
            <h1>Stamp Issuance Detail ID: {idParam}</h1>
          </div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={stampDataInfo.stamp_uri}
                    alt=""
                  ></img>
                </div>

                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {stampDataInfo.ent_or_dep==='ent'?<td><span className="badge bg-success">Approved</span></td>  :  <td><span className="badge bg-warning">Pending</span></td>}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 bg-white p-3 border-t-4 border-blue-400">
              <div className="md:w-12/12 bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-blue-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide my-3">Stamp Info</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Immigration</div>
                      <div className="px-4 py-3">{stampDataInfo.ent_or_dep==='ent'?'Entrance':'Departure'}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        Stamp Expired Date
                      </div>
                      <div className="px-4 py-3">
                        {stampDataInfo.stamp_expired_date}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        Country
                      </div>
                      <div className="px-4 py-3">
                        {stampDataInfo.country_code}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-blue-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide my-3">User Info</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        PASSPORT DID
                      </div>
                      <div className="px-4 py-2">{stampDataInfo.did}</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Name</div>
                      <div className="px-4 py-3">{stampDataInfo.user_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Gender</div>
                      <div className="px-4 py-3">
                        {stampDataInfo.sex === "F" ? "FEMALE" : "MALE"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Age</div>
                      <div className="px-4 py-3">{stampDataInfo.age}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Sex</div>
                      <div className="px-4 py-3">{stampDataInfo.sex}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Contact No.</div>
                      <div className="px-4 py-3">{stampDataInfo.phone_num}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Birthday</div>
                      <div className="px-4 py-3">{stampDataInfo.birth}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        {stampDataInfo.ent_or_dep==='ent'?'Entrance Date':'Departure Date'}
                      </div>
                      <div className="px-4 py-3">
                        {stampDataInfo.creation_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StampDetail;
