import React, { useState, useEffect} from 'react';
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const VisaDetail = () => {
  //리듀스에 저장되어있는 userInfo가지고오기
  const userInfo = useSelector((state:any) => state.userReducer).data;

  const idParam:any = useParams().id;

  const visaData = useSelector((state:any) => state.visaReducer).data;
  const [visaDataInfo, setVisaDataInfo]= useState(Object);
  const [modalData, setModalData] = useState("");
  const [successYn, setSuccessYn] = useState(-1);

  const pageName = 'Visa issuance details';
  useEffect(() => {
    visaData.filter((data:any)=>{
      if(data.visa_survey_id===parseInt(idParam)){
        setVisaDataInfo(data);
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

  const issuanceOkClick = () =>{
    const modal:any = document.getElementById("modal");
   
    const body = {visa_survey_id : visaDataInfo.visa_survey_id,
                  success_yn : successYn }

    console.log(body);
    axios
    .post(process.env.REACT_APP_SERVER_ADMIN_URL + "/admin/makeVisa", body,
    {
      headers: {
        authorization: userInfo.jwtToken
      }
    }
    )
    .then((response)=> {
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
    
    modal.style.display='none';
  }

  const issuanceCloseClick = () =>{
    const modal:any = document.getElementById("modal");
    modal.style.display='none';
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Visa</h1>
        <Breadcrumb pageName={pageName} />
      </div>

      <section className="section passport detail">
        <div className="container mx-auto my-5 p-5">
          <div className="pagetitle">
            <h1>Visa Issuance Detail ID: {idParam}</h1>
          </div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={visaDataInfo.photo_uri}
                    alt=""
                  ></img>
                </div>

                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {visaDataInfo.visa_success_yn==='1'?<td><span className="badge bg-success">Approved</span></td>  : (visaDataInfo.visa_success_yn==='0'?  <td><span className="badge bg-warning">Pending</span></td>:  <span className="badge bg-danger">Rejected</span>)}
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
                  <span className="tracking-wide my-3">Visa Info</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Visa Name</div>
                      <div className="px-4 py-3">{visaDataInfo.visa_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        Visa Expired Date
                      </div>
                      <div className="px-4 py-3">
                        {visaDataInfo.visa_expired_date}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        Visa Country
                      </div>
                      <div className="px-4 py-3">
                        {visaDataInfo.country_code}
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
                      <div className="px-4 py-2">{visaDataInfo.did}</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Name</div>
                      <div className="px-4 py-3">{visaDataInfo.user_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Gender</div>
                      <div className="px-4 py-3">
                        {visaDataInfo.sex === "F" ? "FEMALE" : "MALE"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Age</div>
                      <div className="px-4 py-3">{visaDataInfo.age}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Contact No.</div>
                      <div className="px-4 py-3">{visaDataInfo.phone_num}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">Birthday</div>
                      <div className="px-4 py-3">{visaDataInfo.birth}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-3 font-semibold">
                        Issuance Issuance Date
                      </div>
                      <div className="px-4 py-3">
                        {visaDataInfo.creation_date}
                      </div>
                    </div>
                    <div className="grid grid-cols-2"></div>
                    <button className="w-1/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    onClick={() => {
                      modalClick(1);
                    }}
                    >
                      Approve
                    </button>
                    <button className="w-1/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    onClick={() => {
                      modalClick(2);
                    }}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Modal*/}
        <div
          className="hidden bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0"
          id="modal"
        >
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Do you Want {modalData}?
            </h1>
            <button
              className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
              onClick={issuanceCloseClick}
            >
              Cancle
            </button>
            <button
              className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={issuanceOkClick}
            >
              Ok
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VisaDetail;
