import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./pages/components/Footer";
import Header from "./pages/components/Header";
import Sidebar from "./pages/components/Sidebar";
import Passport from "./pages/Passport";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {

  const [userInfo, setUserInfo] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    
  }, []); //[]비어있으면 최초 실행 , 안에 값이 들어있으면 해당 값이 변경될때마다 실행 

  return(
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLogin?<Sidebar />:null}
        <Routes>
          {isLogin? <Route path="/main" element={<Dashboard />} />:<Route path="/" element={<Login />} />}
          <Route path="/passport" element={<Passport />} />
        </Routes>
        <Footer />
      </BrowserRouter>

  </div>
  );
}

export default App;
