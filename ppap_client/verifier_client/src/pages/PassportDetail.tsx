import React, { useState, useEffect} from 'react';
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PassportDetail = () => {
  const idParam:any = useParams().id;
  const passportData = useSelector((state:any) => state.passportReducer).data;
  const [passportDataInfo, setPassportDataInfo]= useState(Object);
  const pageName = 'Passport application details';

  useEffect(() => {
    passportData.filter((data:any)=>{
      if(data.passport_id===parseInt(idParam)){
        setPassportDataInfo(data);
        console.log(data);
      }
    })
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Passport</h1>
        <Breadcrumb pageName={pageName} />
      </div>

      <section className="section passport detail">
        <div className="container mx-auto my-5 p-5">
            <div className="pagetitle">
              <h1>Passport Application Detail ID: {idParam}</h1>
            </div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-blue-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={passportDataInfo.photoURI}
                    alt=""
                  ></img>
                </div>
               
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">
                        Pending
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              
            </div>

            <div className="w-full md:w-9/12 bg-white p-3 border-t-4 border-blue-400">
                <div className="md:w-12/12 bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-blue-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide my-3">About</span>
                        
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">DID</div>
                              <div className="px-4 py-2">{passportDataInfo.did}</div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 text-sm">
                           
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-3 font-semibold">Name</div>
                                <div className="px-4 py-3">{passportDataInfo.name}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-3 font-semibold">Gender</div>
                                <div className="px-4 py-3">{passportDataInfo.sex==='F'?'FEMALE':'MALE'}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-3 font-semibold">Contact No.</div>
                                <div className="px-4 py-3">{passportDataInfo.phoneNum}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-3 font-semibold">Birthday</div>
                                <div className="px-4 py-3">{passportDataInfo.birth}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-3 font-semibold">Issuance Application Date</div>
                                <div className="px-4 py-3">{passportDataInfo.creation_date}</div>
                            </div>
                            <div className="grid grid-cols-2">
                            </div>
                            <button
                              className="w-1/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                              Approve</button>
                            <button
                              className="w-1/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                              Reject</button>  
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

export default PassportDetail;
