import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";


const ImmigrationInfo = ({linkPath}:any) => {

  return (
    <section className="section immigrationInfo">

      {/* passport info*/}

      <h5 className="card-title">Passport Info</h5>
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-blue-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src="https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80"
                alt=""
              ></img>
            </div>

            <ul className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-1">
                <span>Status</span>
                <span className="ml-auto py-1 px-1">
                  <span className="badge bg-success">Approved</span>
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
              <span className="tracking-wide my-3">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid  text-sm">
                <div className="grid grid-cols-1">
                  <div className="px-4 py-2 font-semibold">DID</div>
                  <div className="px-4 py-2 break-words">
                    did:ethr:ganache:0x03b3764cdb1905c2315b9bcecf008429721b915f69e7412219b76b14d15465f85a
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Name</div>
                  <div className="px-4 py-3 ">SAKURA</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Gender</div>
                  <div className="px-4 py-3">FEMALE</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Contact No.</div>
                  <div className="px-4 py-3">01033333333</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Birthday</div>
                  <div className="px-4 py-3">20051208</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">
                    Passport Issuance Date
                  </div>
                  <div className="px-4 py-3">2022-05-12 05:51:23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* visa info*/}

      <h5 className="card-title">Visa Info</h5>
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-blue-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src="https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80"
                alt=""
              ></img>
            </div>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-4 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-0">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="badge bg-success">Approved</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-9/12 bg-white p-3 border-t-4 border-blue-400">
          <div className="md:w-12/12 bg-white p-1 shadow-sm rounded-sm">
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
                  <div className="px-4 py-3">2022 VISA</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">
                    Visa Expired Date
                  </div>
                  <div className="px-4 py-3">90</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Visa Country</div>
                  <div className="px-4 py-3">KOR</div>
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
                <div className="grid grid-cols-0">
                <div className="px-4 py-2 font-semibold">Passport DID</div>
                  <div className="px-4 py-2 break-words">
                    did:ethr:ganache:0x03b3764cdb1905c2315b9bcecf008429721b915f69e7412219b76b14d15465f85a
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Name</div>
                  <div className="px-4 py-3">SAKURA</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Gender</div>
                  <div className="px-4 py-3">FEMALE</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Age</div>
                  <div className="px-4 py-3">17</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Contact No.</div>
                  <div className="px-4 py-3">01033333333</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">Birthday</div>
                  <div className="px-4 py-3">20051208</div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 font-semibold">
                    Visa Issuance Date
                  </div>
                  <div className="px-4 py-3">2022-05-12 05:51:23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stamp info*/}
      <h5 className="card-title">Stamp issuance list</h5>

      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="bg-white w-full p-4 border-t-4 border-blue-400">
          <div className="row">
            <div className="col-lg-14">
              <div className="row">
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="card-body pb-0">
                      
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
                          <tr>
                            <td scope="row">
                              <Link
                                to={linkPath + "detail/" + 1}
                                className="font-bold"
                              >
                                #1
                              </Link>
                            </td>
                            <td scope="row">
                              <a href="#">
                                <img className='h-15 w-20'
                                  src={`https://ipfs.infura.io/ipfs/QmeLrCEtsm28qqf2S7KSwo7QYFiNzwjfY9AJn8xLs8VQWF`}
                                  alt=""
                                />
                              </a>
                            </td>

                            <td>
                              <a href="#" className="text-primary">
                                SAKURA
                              </a>
                            </td>
                            <td>KOR</td>
                            <td>2022-05-12 05:51:23</td>
                            <td>Entrance</td>
                            <td>
                              <span className="badge bg-success w-4/4">
                                Approved
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* button */}

      <div className="grid grid-cols-2">
        <button className="w-2/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
          Entrance
        </button>
        <button className="w-2/3 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
          Departure
        </button>
      </div>
    </section>
  );
};

export default ImmigrationInfo;
