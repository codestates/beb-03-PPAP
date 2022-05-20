import React, { useState, useEffect} from 'react';
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImmigrationInfo from './components/ImmigrationInfo';

const Immigration = () => {
  //리듀스에 저장되어있는 userInfo가지고오기
  const userInfo = useSelector((state:any) => state.userReducer).data;

  const pageName = 'Immigration control';
  const [userVP, setUserVP] = useState('');
  const [isCheck, setCheck] = useState(false);
  
  const onChange = (event:any) => {
    setUserVP(event.target.value);
  }

  const checkClick = (event:any) => {
    setCheck(!isCheck);
  }
  useEffect(() => {
 
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Immigration</h1>
        <Breadcrumb pageName={pageName} />
      </div>

      <section className="section immigration detail">
        <div className="container mx-auto my-1 p-1 ">
          <div className="searchDid space-x-5 ">
            <label>Verifiable Presentation : </label>
            <input type="search" className="w-6/12 m-1 px-1" placeholder="Verifiable Presentation JWT Token" onChange={onChange}/>
            <button type="button" className="m-2 rounded px-4 px-4 py-2 font-semibold text-gray-100 bg-blue-500" onClick={checkClick}>Check</button>
          </div>
        </div>

          {isCheck===true?<ImmigrationInfo />:null}
      </section>
    </main>
  );
};

export default Immigration;
