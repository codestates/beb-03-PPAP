import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


function Main() {
  const userInfo = useSelector((state:any) => state.userReducer).data;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log("여기는언제?")
    const userInfo = getUserInfo();
    if(userInfo!=null){
      setIsLogin(true)
    }else{
      setIsLogin(false);
    }
  }, []); //[]비어있으면 최초 실행 , 안에 값이 들어있으면 해당 값이 변경될때마다 실행 


  const getUserInfo = () =>{
   
    return userInfo;
  }

  return(
    <div>
        {isLogin ? <Dashboard />:<Login />}
    </div>
     );
}

export default Main;
