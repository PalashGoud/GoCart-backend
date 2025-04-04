import React, { useState, useEffect } from "react";
import logo from "../assets/GoCArt.jpg"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  
  return (
    <header className="flex h-[10vh] justify-between items-center bg-[#222331] text-white p-4   shadow-md">
      <div className="flex w-[60%] justify-between items-center">
        <img className="h-[12vh] w-[14vh]" src={logo}></img>
        <h1 className="text-2xl text-white font-bold">Go-Cart Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-6">
        <i className="text-xl cursor-pointer hover:text-black" />
        <i className="text-xl cursor-pointer hover:text-red-500" />
      </div>

      
    </header>
  );
};

export default Header;
