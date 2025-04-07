import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaChartBar,
  FaMoneyBillWave,
  FaUsers,
  FaHistory,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white w-full shadow-md z-50">
      <ul className="flex justify-around py-2 border-t border-gray-700">
        <li
          onClick={() => navigate("/")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaHome className="text-2xl" />
          <span className="text-sm mt-1">Dashboard</span>
        </li>
        
        <li
          onClick={() => navigate("/users")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">Users</span>
        </li>

        <li
          onClick={() => navigate("/vendors")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUniversity className="text-2xl" />
          <span className="text-sm mt-1">Vendors</span>
        </li>
        <li
          onClick={() => navigate("/vendorslist")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUserCircle className="text-2xl" />
          <span className="text-sm mt-1">Vendors ProductList</span>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
