import React, { useState, useEffect} from 'react';
import Breadcrumb from "./components/Breadcrumb";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImmigrationInfo from './components/ImmigrationInfo';
import ImmigrationList from './components/ImmigrationList';

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
          </div>
        </div>
        <ImmigrationList linkPath={""}/>
          {/* {isCheck===true?<ImmigrationInfo />:null} */}
      </section>
    </main>
  );
};

export default Immigration;
