import React, { useState, useContext } from 'react';
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userReducer";

const Login = () => {

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:포트번호/issuer/getPass").then((payload) => {
      console.log(payload.data);
    });
  }, []);

  const onSubmit = async () => {
   const userInfo = {username, password};
  //  axios.post("http://localhost:포트번호/issuer/getPass").then((payload) => {
  //   console.log(payload.data);
  // });
    console.log("야 찎혀!")
   dispatch(setUser(userInfo));
   window.location.replace('/')
   //navigate('/');
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
            <div className="mt-10 pt-4 border-t-2 border-gray-500 border-dotted text-center">
              <p className="text-base text-gray-400">or sign up with</p>
              <Link
                to="/signup"
                className="block bg-gray-900 hover:bg-transparent border-gray-400 border-2 text-white font-bold w-72 py-3 m-auto mt-6 rounded focus:outline-none focus:shadow-outline leading-5"
              >
                Sign Up
              </Link>
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
