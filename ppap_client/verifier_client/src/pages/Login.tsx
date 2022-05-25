import React, { useState, useContext } from 'react';
import axios, {AxiosResponse} from 'axios';
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { setUser } from "../redux/userReducer";
;


const Login = () => {

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  useEffect(() => {
  }, []);

  const onSubmit = async () => {
    //로그인 시도
    const body = { id: username, password: password };
    console.log(process.env.REACT_APP_SERVER_ADMIN_URL );
    axios
      .post(process.env.REACT_APP_SERVER_ADMIN_URL + "/admin/adminlogin", body)
      .then((response)=> response.data)
      .then((data) => {
        const jwtToken = data.data;
        const profileUrl = data.profile_url;
        const userInfo = { username, jwtToken, profileUrl};
        dispatch(setUser(userInfo));
        window.location.replace("/");
        navigate("/");
      });
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Sign In</h1>
      </div>
      <section className="section Sign in">
      <div className="flex flex-col  max-w-2xl mx-auto">
      <div className="mt-8  text-gray-700 text-white border-2 border-gray-500 px-5 pt-10 rounded-lg">
        <div className="w-full">
          <form className="mb-4 mx-auto">
            <div className="mb-4">
              <input
                className="shadow appearance-none border border rounded h-12 w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="ID"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none border border rounded w-full h-12 py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="pw"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full text-center">
              <button
                className="bg-transparent hover:bg-gray-800 border-gray-500 border-2 text-black font-bold py-3  w-72 rounded focus:outline-none focus:shadow-outline leading-5"
                type="button"
                onClick={onSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </section>
    </main>
  );
};

export default Login;
