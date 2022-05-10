import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./pages/components/Footer";
import Header from "./pages/components/Header";
import Sidebar from "./pages/components/Sidebar";
import Passport from "./pages/Passport";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Mains from "./pages/Mains";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


function App() {
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
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLogin?<Sidebar />:null}
        <Routes>
        <Route path="/" element={<Mains />} />
          //{isLogin? <Route path="/" element={<Dashboard />} />:<Route path="/" element={<Login />} />}
        <Route path="/passport" element={<Passport />} />
        </Routes>
        <Footer />
      </BrowserRouter>

  </div>
  );
}

export default App;
