import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./pages/components/Footer";
import Header from "./pages/components/Header";
import Sidebar from "./pages/components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Passport from "./pages/Passport";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/passport" element={<Passport />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
